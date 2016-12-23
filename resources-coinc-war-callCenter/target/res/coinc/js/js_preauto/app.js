/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */
(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["inputmask.dependencyLib"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("./inputmask.dependencyLib.jquery"));
		} else {
			factory(window.dependencyLib || jQuery);
		}
	}
	(function($) {
		function Inputmask(alias, options) {
			//allow instanciating without new
			if (!(this instanceof Inputmask)) {
				return new Inputmask(alias, options);
			}

			if (typeof alias === "object") {
				options = alias;
			} else {
				options = options || {};
				options.alias = alias;
			}

			this.el = undefined;
			//init options
			this.opts = $.extend(true, {}, this.defaults, options);
			this.noMasksCache = options && options.definitions !== undefined;
			this.userOptions = options || {}; //user passed options
			resolveAlias(this.opts.alias, options, this.opts);
		}

		Inputmask.prototype = {
			//options default
			defaults: {
				placeholder: "_",
				optionalmarker: {
					start: "[",
					end: "]"
				},
				quantifiermarker: {
					start: "{",
					end: "}"
				},
				groupmarker: {
					start: "(",
					end: ")"
				},
				alternatormarker: "|",
				escapeChar: "\\",
				mask: null, //needs tobe null instead of undefined as the extend method does not consider props with the undefined value
				oncomplete: $.noop, //executes when the mask is complete
				onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
				oncleared: $.noop, //executes when the mask is cleared
				repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
				greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
				autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
				removeMaskOnSubmit: false, //remove the mask before submitting the form.
				clearMaskOnLostFocus: true,
				insertMode: true, //insert the input or overwrite the input
				clearIncomplete: false, //clear the incomplete input on blur
				aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
				alias: null,
				onKeyDown: $.noop, //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
				onBeforeMask: null, //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
				onBeforePaste: function(pastedValue, opts) {
					return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(pastedValue, opts) : pastedValue;
				}, //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
				onBeforeWrite: null, //executes before writing to the masked element. args => event, opts
				onUnMask: null, //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
				showMaskOnFocus: true, //show the mask-placeholder when the input has focus
				showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
				onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
				skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
				showTooltip: false, //show the activemask as tooltip
				numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
				rightAlign: false, //align to the right
				undoOnEscape: true, //pressing escape reverts the value to the value before focus
				//numeric basic properties
				radixPoint: "", //".", // | ","
				groupSeparator: "", //",", // | "."
				radixFocus: false, //position caret to radixpoint on initial click
				//numeric basic properties
				nojumps: false, //do not jump over fixed parts in the mask
				nojumpsThreshold: 0, //start nojumps as of
				keepStatic: null, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible - null see auto selection for multi masks
				positionCaretOnTab: false, //when enabled the caret position is set after the latest valid position on TAB
				tabThrough: false, //allows for tabbing through the different parts of the masked field
				supportsInputType: [], //allow extra inputtypes for masking, ex. number can be allowed for numeric alias without pre-/suffix and standard radixpoint, groupSeparator
				definitions: {
					"9": {
						validator: "[0-9]",
						cardinality: 1,
						definitionSymbol: "*"
					},
					"a": {
						validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
						cardinality: 1,
						definitionSymbol: "*"
					},
					"*": {
						validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
						cardinality: 1
					}
				},
				//specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
				ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
				isComplete: null, //override for isComplete - args => buffer, opts - return true || false
				canClearPosition: $.noop, //hook to alter the clear behavior in the stripValidPositions args => maskset, position, lastValidPosition, opts => return true|false
				postValidation: null //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, opts => return true/false
			},
			masksCache: {},
			mask: function(el) {
				var scopedOpts = $.extend(true, {}, this.opts);
				importAttributeOptions(el, scopedOpts, $.extend(true, {}, this.userOptions));
				var maskset = generateMaskSet(scopedOpts, this.noMasksCache);
				if (maskset !== undefined) {
					if (el.inputmask !== undefined) {
						el.inputmask.remove();
					}
					//store inputmask instance on the input with element reference
					el.inputmask = new Inputmask();
					el.inputmask.opts = scopedOpts;
					el.inputmask.noMasksCache = this.noMasksCache;
					el.inputmask.userOptions = $.extend(true, {}, this.userOptions);
					el.inputmask.el = el;
					el.inputmask.maskset = maskset;
					el.inputmask.isRTL = false;

					$.data(el, "_inputmask_opts", scopedOpts);

					maskScope({
						"action": "mask",
						"el": el
					}, maskset, el.inputmask.opts);
				}
				return el;
			},
			option: function(options) { //set extra options || retrieve value of a current option
				if (typeof options === "string") {
					return this.opts[options];
				} else if (typeof options === "object") {
					$.extend(this.opts, options);
					$.extend(this.userOptions, options); //user passed options
					return this;
				}
			},
			unmaskedvalue: function(value) {
				return maskScope({
					"action": "unmaskedvalue",
					"el": this.el,
					"value": value
				}, this.el && this.el.inputmask ? this.el.inputmask.maskset : generateMaskSet(this.opts, this.noMasksCache), this.opts);
			},
			remove: function() {
				if (this.el) {
					maskScope({
						"action": "remove",
						"el": this.el
					});
					this.el.inputmask = undefined; //delete ~ undefined
					return this.el;
				}
			},
			getemptymask: function() { //return the default (empty) mask value, usefull for setting the default value in validation
				if (this.el) {
					return maskScope({
						"action": "getemptymask",
						"el": this.el
					});
				}
			},
			hasMaskedValue: function() { //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
				return !this.opts.autoUnmask;
			},
			isComplete: function() {
				if (this.el) {
					return maskScope({
						"action": "isComplete",
						"buffer": this.el.inputmask._valueGet().split(""),
						"el": this.el
					});
				}
			},
			getmetadata: function() { //return mask metadata if exists
				if (this.el) {
					return maskScope({
						"action": "getmetadata",
						"el": this.el
					});
				}
			},
			isValid: function(value) {
				return maskScope({
					"action": "isValid",
					"value": value
				}, generateMaskSet(this.opts, this.noMasksCache), this.opts);
			},
			format: function(value, metadata) {
				return maskScope({
					"action": "format",
					"value": value,
					"metadata": metadata //true/false getmetadata
				}, generateMaskSet(this.opts, this.noMasksCache), this.opts);
			}
		};

		//apply defaults, definitions, aliases
		Inputmask.extendDefaults = function(options) {
			$.extend(Inputmask.prototype.defaults, options);
		};
		Inputmask.extendDefinitions = function(definition) {
			$.extend(Inputmask.prototype.defaults.definitions, definition);
		};
		Inputmask.extendAliases = function(alias) {
			$.extend(Inputmask.prototype.defaults.aliases, alias);
		};
		//static fn on inputmask
		Inputmask.format = function(value, options, metadata) {
			return Inputmask(options).format(value, metadata);
		};
		Inputmask.unmask = function(value, options) {
			return Inputmask(options).unmaskedvalue(value);
		};
		Inputmask.isValid = function(value, options) {
			return Inputmask(options).isValid(value);
		};
		Inputmask.escapeRegex = function(str) {
			var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
			return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
		};
		Inputmask.keyCode = {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91,
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91
		};

		//helper functions
		function isInputEventSupported(eventName) {
			var el = document.createElement("input"),
				evName = "on" + eventName,
				isSupported = (evName in el);
			if (!isSupported) {
				el.setAttribute(evName, "return;");
				isSupported = typeof el[evName] == "function";
			}
			el = null;
			return isSupported;
		}

		function isInputTypeSupported(inputType) {
			var isSupported = inputType === "text" || inputType === "tel" || inputType === "password";
			if (!isSupported) {
				var el = document.createElement("input");
				el.setAttribute("type", inputType);
				isSupported = el.type === "text"; //apply mask only if the type is not natively supported
				el = null;
			}
			return isSupported;
		}

		function resolveAlias(aliasStr, options, opts) {
			var aliasDefinition = opts.aliases[aliasStr];
			if (aliasDefinition) {
				if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
				$.extend(true, opts, aliasDefinition); //merge alias definition in the options
				$.extend(true, opts, options); //reapply extra given options
				return true;
			} else //alias not found - try as mask
			if (opts.mask === null) {
				opts.mask = aliasStr;
			}

			return false;
		}

		function importAttributeOptions(npt, opts, userOptions) {
			var attrOptions = npt.getAttribute("data-inputmask");

			function importOption(option) {
				var optionData = npt.getAttribute("data-inputmask-" + option.toLowerCase());
				if (optionData !== null) {
					optionData = typeof optionData == "boolean" ? optionData : optionData.toString();
					/*eslint-disable no-eval */
					if (typeof optionData === "string" && option.indexOf("on") === 0) {
						optionData = eval("(" + optionData + ")");
					}
					/*eslint-enable no-eval */
					if (option === "mask" && optionData.indexOf("[") === 0) {
						userOptions[option] = optionData.replace(/[\s[\]]/g, "").split(",");
						userOptions[option][0] = userOptions[option][0].replace("'", "");
						userOptions[option][userOptions[option].length - 1] = userOptions[option][userOptions[option].length - 1].replace("'", "");
					} else userOptions[option] = optionData;
				}
			}

			if (attrOptions && attrOptions !== "") {
				try {
					attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
					var dataoptions = $.parseJSON("{" + attrOptions + "}");
					$.extend(true, userOptions, dataoptions);
				} catch (ex) {

				} //need a more relax parseJSON
			}
			for (var option in opts) {
				importOption(option);
			}
			if (userOptions.alias) {
				resolveAlias(userOptions.alias, userOptions, opts);
				for (option in opts) {
					importOption(option);
				}
			}
			$.extend(true, opts, userOptions);
			return opts;
		}

		function generateMaskSet(opts, nocache) {
			var ms;

			function analyseMask(mask) {
				var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
					escaped = false,
					currentToken = new MaskToken(),
					match,
					m,
					openenings = [],
					maskTokens = [],
					openingToken,
					currentOpeningToken,
					alternator,
					lastMatch,
					groupToken;

				function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
					this.matches = [];
					this.isGroup = isGroup || false;
					this.isOptional = isOptional || false;
					this.isQuantifier = isQuantifier || false;
					this.isAlternator = isAlternator || false;
					this.quantifier = {
						min: 1,
						max: 1
					};
				}
				//test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
				function insertTestDefinition(mtoken, element, position) {
					var maskdef = opts.definitions[element];
					position = position !== undefined ? position : mtoken.matches.length;
					var prevMatch = mtoken.matches[position - 1];
					if (maskdef && !escaped) {
						maskdef.placeholder = $.isFunction(maskdef.placeholder) ? maskdef.placeholder.call(this, opts) : maskdef.placeholder;
						var prevalidators = maskdef.prevalidator,
							prevalidatorsL = prevalidators ? prevalidators.length : 0;
						//handle prevalidators
						for (var i = 1; i < maskdef.cardinality; i++) {
							var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [],
								validator = prevalidator.validator,
								cardinality = prevalidator.cardinality;
							mtoken.matches.splice(position++, 0, {
								fn: validator ? typeof validator === "string" ? new RegExp(validator) : new function() {
									this.test = validator;
								} : new RegExp("."),
								cardinality: cardinality ? cardinality : 1,
								optionality: mtoken.isOptional,
								newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
								casing: maskdef.casing,
								def: maskdef.definitionSymbol || element,
								placeholder: maskdef.placeholder,
								mask: element
							});
							prevMatch = mtoken.matches[position - 1];
						}
						mtoken.matches.splice(position++, 0, {
							fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator) : new function() {
								this.test = maskdef.validator;
							} : new RegExp("."),
							cardinality: maskdef.cardinality,
							optionality: mtoken.isOptional,
							newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
							casing: maskdef.casing,
							def: maskdef.definitionSymbol || element,
							placeholder: maskdef.placeholder,
							mask: element
						});
					} else {
						mtoken.matches.splice(position++, 0, {
							fn: null,
							cardinality: 0,
							optionality: mtoken.isOptional,
							newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
							casing: null,
							def: element,
							placeholder: undefined,
							mask: element
						});
						escaped = false;
					}
				}

				function verifyGroupMarker(lastMatch, isOpenGroup) {
					if (lastMatch.isGroup) { //this is not a group but a normal mask => convert
						lastMatch.isGroup = false;
						insertTestDefinition(lastMatch, opts.groupmarker.start, 0);
						if (isOpenGroup !== true) {
							insertTestDefinition(lastMatch, opts.groupmarker.end);
						}
					}
				}

				function maskCurrentToken(m, currentToken, lastMatch, extraCondition) {
					if (currentToken.matches.length > 0 && (extraCondition === undefined || extraCondition)) {
						lastMatch = currentToken.matches[currentToken.matches.length - 1];
						verifyGroupMarker(lastMatch);
					}
					insertTestDefinition(currentToken, m);
				}

				function defaultCase() {
					if (openenings.length > 0) {
						currentOpeningToken = openenings[openenings.length - 1];
						maskCurrentToken(m, currentOpeningToken, lastMatch, !currentOpeningToken.isAlternator);
						if (currentOpeningToken.isAlternator) { //handle alternator a | b case
							alternator = openenings.pop();
							for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
								alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
							}
							if (openenings.length > 0) {
								currentOpeningToken = openenings[openenings.length - 1];
								currentOpeningToken.matches.push(alternator);
							} else {
								currentToken.matches.push(alternator);
							}
						}
					} else {
						maskCurrentToken(m, currentToken, lastMatch);
					}
				}

				function reverseTokens(maskToken) {
					function reverseStatic(st) {
						if (st === opts.optionalmarker.start) st = opts.optionalmarker.end;
						else if (st === opts.optionalmarker.end) st = opts.optionalmarker.start;
						else if (st === opts.groupmarker.start) st = opts.groupmarker.end;
						else if (st === opts.groupmarker.end) st = opts.groupmarker.start;

						return st;
					}

					maskToken.matches = maskToken.matches.reverse();
					for (var match in maskToken.matches) {
						var intMatch = parseInt(match);
						if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) { //reposition quantifier
							var qt = maskToken.matches[match];
							maskToken.matches.splice(match, 1);
							maskToken.matches.splice(intMatch + 1, 0, qt);
						}
						if (maskToken.matches[match].matches !== undefined) {
							maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
						} else {
							maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
						}
					}

					return maskToken;
				}

				while (match = tokenizer.exec(mask)) {
					m = match[0];

					if (escaped) {
						defaultCase();
						continue;
					}
					switch (m.charAt(0)) {
						case opts.escapeChar:
							escaped = true;
							break;
						case opts.optionalmarker.end:
							// optional closing
						case opts.groupmarker.end:
							// Group closing
							openingToken = openenings.pop();
							if (openingToken !== undefined) {
								if (openenings.length > 0) {
									currentOpeningToken = openenings[openenings.length - 1];
									currentOpeningToken.matches.push(openingToken);
									if (currentOpeningToken.isAlternator) { //handle alternator (a) | (b) case
										alternator = openenings.pop();
										for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
											alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
										}
										if (openenings.length > 0) {
											currentOpeningToken = openenings[openenings.length - 1];
											currentOpeningToken.matches.push(alternator);
										} else {
											currentToken.matches.push(alternator);
										}
									}
								} else {
									currentToken.matches.push(openingToken);
								}
							} else defaultCase();
							break;
						case opts.optionalmarker.start:
							// optional opening
							openenings.push(new MaskToken(false, true));
							break;
						case opts.groupmarker.start:
							// Group opening
							openenings.push(new MaskToken(true));
							break;
						case opts.quantifiermarker.start:
							//Quantifier
							var quantifier = new MaskToken(false, false, true);

							m = m.replace(/[{}]/g, "");
							var mq = m.split(","),
								mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
								mq1 = mq.length === 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1]));
							if (mq1 === "*" || mq1 === "+") {
								mq0 = mq1 === "*" ? 0 : 1;
							}
							quantifier.quantifier = {
								min: mq0,
								max: mq1
							};
							if (openenings.length > 0) {
								var matches = openenings[openenings.length - 1].matches;
								match = matches.pop();
								if (!match.isGroup) {
									groupToken = new MaskToken(true);
									groupToken.matches.push(match);
									match = groupToken;
								}
								matches.push(match);
								matches.push(quantifier);
							} else {
								match = currentToken.matches.pop();
								if (!match.isGroup) {
									groupToken = new MaskToken(true);
									groupToken.matches.push(match);
									match = groupToken;
								}
								currentToken.matches.push(match);
								currentToken.matches.push(quantifier);
							}
							break;
						case opts.alternatormarker:
							if (openenings.length > 0) {
								currentOpeningToken = openenings[openenings.length - 1];
								lastMatch = currentOpeningToken.matches.pop();
							} else {
								lastMatch = currentToken.matches.pop();
							}
							if (lastMatch.isAlternator) {
								openenings.push(lastMatch);
							} else {
								alternator = new MaskToken(false, false, false, true);
								alternator.matches.push(lastMatch);
								openenings.push(alternator);
							}
							break;
						default:
							defaultCase();
					}
				}

				while (openenings.length > 0) {
					openingToken = openenings.pop();
					verifyGroupMarker(openingToken, true);
					currentToken.matches.push(openingToken);
				}
				if (currentToken.matches.length > 0) {
					lastMatch = currentToken.matches[currentToken.matches.length - 1];
					verifyGroupMarker(lastMatch);
					maskTokens.push(currentToken);
				}

				if (opts.numericInput) {
					reverseTokens(maskTokens[0]);
				}
				// console.log(JSON.stringify(maskTokens));
				return maskTokens;
			}

			function generateMask(mask, metadata) {
				if (mask === null || mask === "") {
					return undefined;
				} else {
					if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
						opts.placeholder = "";
					} //hide placeholder with single non-greedy mask
					if (opts.repeat > 0 || opts.repeat === "*" || opts.repeat === "+") {
						var repeatStart = opts.repeat === "*" ? 0 : (opts.repeat === "+" ? 1 : opts.repeat);
						mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
					}

					// console.log(mask);
					var masksetDefinition;
					if (Inputmask.prototype.masksCache[mask] === undefined || nocache === true) {
						masksetDefinition = {
							"mask": mask,
							"maskToken": analyseMask(mask),
							"validPositions": {},
							"_buffer": undefined,
							"buffer": undefined,
							"tests": {},
							"metadata": metadata
						};
						if (nocache !== true) {
							Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask] = masksetDefinition;
						}
					} else masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[mask]);

					return masksetDefinition;
				}
			}

			function preProcessMask(mask) {
				mask = mask.toString();
				// if (opts.numericInput) {
				// 	mask = mask.split('').reverse();
				// 	mask = mask.join('');
				// }
				return mask;
			}

			if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
				opts.mask = opts.mask.call(this, opts);
			}
			if ($.isArray(opts.mask)) {
				if (opts.mask.length > 1) {
					opts.keepStatic = opts.keepStatic === null ? true : opts.keepStatic; //enable by default when passing multiple masks when the option is not explicitly specified
					var altMask = "(";
					$.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
						if (altMask.length > 1) {
							altMask += ")|(";
						}
						if (msk.mask !== undefined && !$.isFunction(msk.mask)) {
							altMask += preProcessMask(msk.mask);
						} else {
							altMask += preProcessMask(msk);
						}
					});
					altMask += ")";
					return generateMask(altMask, opts.mask);
				} else opts.mask = opts.mask.pop();
			}

			if (opts.mask) {
				if (opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask)) {
					ms = generateMask(preProcessMask(opts.mask.mask), opts.mask);
				} else {
					ms = generateMask(preProcessMask(opts.mask), opts.mask);
				}
			}

			return ms;
		}

		var ua = navigator.userAgent,
			iphone = ua.match(new RegExp("iphone", "i")) !== null,
			// android = ua.match(new RegExp("android.*safari.*", "i")) !== null,
			androidchrome = ua.match(new RegExp("android.*chrome.*", "i")) !== null,
			androidfirefox = ua.match(new RegExp("android.*firefox.*", "i")) !== null,
			// kindle = /Kindle/i.test(ua) || /Silk/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua),
			PasteEventType = isInputEventSupported("paste") ? "paste" : isInputEventSupported("input") ? "input" : "propertychange";

		//if (androidchrome) {
		//		var browser = navigator.userAgent.match(new RegExp("chrome.*", "i")),
		//				version = parseInt(new RegExp(/[0-9]+/).exec(browser));
		//		androidchrome32 = (version == 32);
		//}

		//masking scope
		//actionObj definition see below
		function maskScope(actionObj, maskset, opts) {
			var isRTL = false,
				undoValue,
				// compositionValidPos,
				compositionCaretPos,
				compositionData,
				el, $el,
				skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
				skipInputEvent = false, //skip when triggered from within inputmask
				ignorable = false,
				maxLength,
				mouseEnter = true;

			//maskset helperfunctions
			function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
				minimalPos = minimalPos || 0;
				var maskTemplate = [],
					ndxIntlzr, pos = 0,
					test, testPos;
				do {
					if (baseOnInput === true && getMaskSet().validPositions[pos]) {
						var validPos = getMaskSet().validPositions[pos];
						test = validPos.match;
						ndxIntlzr = validPos.locator.slice();
						maskTemplate.push(includeInput === true ? validPos.input : getPlaceholder(pos, test));
					} else {
						//console.log("getmasktemplate " + pos + " " + JSON.stringify(ndxIntlzr));
						testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
						test = testPos.match;
						ndxIntlzr = testPos.locator.slice();
						maskTemplate.push(getPlaceholder(pos, test));
					}
					pos++;
				} while ((maxLength === undefined || pos - 1 < maxLength) && test.fn !== null || (test.fn === null && test.def !== "") || minimalPos >= pos);
				maskTemplate.pop(); //drop the last one which is empty
				return maskTemplate;
			}

			function getMaskSet() {
				return maskset;
			}

			function resetMaskSet(soft) {
				var maskset = getMaskSet();
				maskset.buffer = undefined;
				maskset.tests = {};
				if (soft !== true) {
					maskset._buffer = undefined;
					maskset.validPositions = {};
					maskset.p = 0;
				}
			}

			function getLastValidPosition(closestTo, strict) {
				var maskset = getMaskSet(),
					lastValidPosition = -1,
					valids = maskset.validPositions;
				if (closestTo === undefined) closestTo = -1;
				var before = lastValidPosition,
					after = lastValidPosition;
				for (var posNdx in valids) {
					var psNdx = parseInt(posNdx);
					if (valids[psNdx] && (strict || valids[psNdx].match.fn !== null)) {
						if (psNdx <= closestTo) before = psNdx;
						if (psNdx >= closestTo) after = psNdx;
					}
				}
				lastValidPosition = (before !== -1 && (closestTo - before) > 1) || after < closestTo ? before : after;
				return lastValidPosition;
			}

			function setValidPosition(pos, validTest, fromSetValid) {
				if (opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined) {
					//reposition & revalidate others
					var positionsClone = $.extend(true, {}, getMaskSet().validPositions),
						lvp = getLastValidPosition(),
						i;
					for (i = pos; i <= lvp; i++) { //clear selection
						delete getMaskSet().validPositions[i];
					}
					getMaskSet().validPositions[pos] = validTest;
					var valid = true,
						j, vps = getMaskSet().validPositions;
					for (i = (j = pos); i <= lvp; i++) {
						var t = positionsClone[i];
						if (t !== undefined) {
							var posMatch = j,
								prevPosMatch = -1;
							while (posMatch < getMaskLength() && ((t.match.fn == null && vps[i] && (vps[i].match.optionalQuantifier === true || vps[i].match.optionality === true)) || t.match.fn != null)) {
								//determine next position
								if (t.match.fn === null || (!opts.keepStatic && vps[i] && (vps[i + 1] !== undefined && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || vps[i].alternation !== undefined))) {
									posMatch++;
								} else posMatch = seekNext(j);

								//does it match
								if (positionCanMatchDefinition(posMatch, t.match.def)) {
									valid = isValid(posMatch, t.input, true, true) !== false;
									j = posMatch;
									break;
								} else {
									valid = t.match.fn == null;
									if (prevPosMatch === posMatch) break; //prevent endless loop
									prevPosMatch = posMatch;
								}
							}
						}
						if (!valid) break;
					}

					if (!valid) {
						getMaskSet().validPositions = $.extend(true, {}, positionsClone);
						return false;
					}
				} else getMaskSet().validPositions[pos] = validTest;

				return true;
			}

			function stripValidPositions(start, end, nocheck, strict) {
				var i, startPos = start;
				getMaskSet().p = start; //needed for alternated position after overtype selection

				for (i = startPos; i < end; i++) { //clear selection
					if (getMaskSet().validPositions[i] !== undefined) {
						if (nocheck === true || opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) !== false) {
							delete getMaskSet().validPositions[i];
						}
					}
				}

				resetMaskSet(true);
				/*eslint-disable semi-spacing */
				for (i = startPos + 1; i <= getLastValidPosition();) {
					/*eslint-disable semi-spacing */
					while (getMaskSet().validPositions[startPos] !== undefined) startPos++;
					var s = getMaskSet().validPositions[startPos];
					if (i < startPos) i = startPos + 1;
					// while (getMaskSet().validPositions[i] == undefined) i++;
					var t = getMaskSet().validPositions[i];
					if (t !== undefined && isMask(i) && s === undefined) {
						if (positionCanMatchDefinition(startPos, t.match.def) && isValid(startPos, t.input, true) !== false) {
							delete getMaskSet().validPositions[i];
							i++;
						}
						startPos++;
					} else i++;
				}
				//remove radixpoint if needed
				var lvp = getLastValidPosition(),
					ml = getMaskLength();
				if (strict !== true && nocheck !== true && getMaskSet().validPositions[lvp] !== undefined && getMaskSet().validPositions[lvp].input === opts.radixPoint) {
					delete getMaskSet().validPositions[lvp];
				}

				for (i = lvp + 1; i <= ml; i++) {
					if (getMaskSet().validPositions[i]) {
						delete getMaskSet().validPositions[i];
					}
				}

				resetMaskSet(true);
			}

			function getTestTemplate(pos, ndxIntlzr, tstPs) {
				var testPos = getMaskSet().validPositions[pos];
				if (testPos === undefined) {
					var testPositions = getTests(pos, ndxIntlzr, tstPs),
						lvp = getLastValidPosition(),
						lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0],
						lvTestAltArr = (lvTest.alternation !== undefined) ? lvTest.locator[lvTest.alternation].toString().split(",") : [];
					for (var ndx = 0; ndx < testPositions.length; ndx++) {
						testPos = testPositions[ndx];

						if (testPos.match &&
							(((opts.greedy && testPos.match.optionalQuantifier !== true) || (testPos.match.optionality === false || testPos.match.newBlockMarker === false) && testPos.match.optionalQuantifier !== true) &&
								((lvTest.alternation === undefined || lvTest.alternation !== testPos.alternation) ||
									(testPos.locator[lvTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))))) {
							break;
						}
					}
				}

				return testPos;
			}

			function getTest(pos) {
				if (getMaskSet().validPositions[pos]) {
					return getMaskSet().validPositions[pos].match;
				}
				return getTests(pos)[0].match;
			}

			function positionCanMatchDefinition(pos, def) {
				var valid = false,
					tests = getTests(pos);
				for (var tndx = 0; tndx < tests.length; tndx++) {
					if (tests[tndx].match && tests[tndx].match.def === def) {
						valid = true;
						break;
					}
				}
				return valid;
			}

			function getTests(pos, ndxIntlzr, tstPs, cacheable) {
				var maskTokens = getMaskSet().maskToken,
					testPos = ndxIntlzr ? tstPs : 0,
					ndxInitializer = ndxIntlzr || [0],
					matches = [],
					insertStop = false,
					latestMatch, isFirstMatch;

				function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitilizer contains a set of indexes to speedup searches in the mtokens
					function handleMatch(match, loopNdx, quantifierRecurse) {
						if (testPos > 10000) {
							throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
						}
						if (testPos === pos && match.matches === undefined) {
							matches.push({
								"match": match,
								"locator": loopNdx.reverse()
							});
							return true;
						} else if (match.matches !== undefined) {
							if (match.isGroup && quantifierRecurse !== match) { //when a group pass along to the quantifier
								match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx);
								if (match) return true;
							} else if (match.isOptional) {
								var optionalToken = match;
								match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
								if (match) {
									latestMatch = matches[matches.length - 1].match;
									isFirstMatch = $.inArray(latestMatch, optionalToken.matches) === 0;
									if (isFirstMatch) {
										insertStop = true; //insert a stop
										testPos = pos; //match the position after the group
									} else return true;
								}
							} else if (match.isAlternator) {
								var alternateToken = match,
									malternateMatches = [],
									maltMatches,
									currentMatches = matches.slice(),
									loopNdxCnt = loopNdx.length;
								var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
								if (altIndex === -1 || typeof altIndex === "string") {
									var currentPos = testPos,
										ndxInitializerClone = ndxInitializer.slice(),
										altIndexArr = [];
									if (typeof altIndex == "string") altIndexArr = altIndex.split(",");
									for (var amndx = 0; amndx < alternateToken.matches.length; amndx++) {
										matches = [];
										match = handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) || match;
										if (match !== true && match !== undefined && (altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length)) { //no match in the alternations (length mismatch) => look further
											var ntndx = maskToken.matches.indexOf(match) + 1;
											if (maskToken.matches.length > ntndx) {
												match = handleMatch(maskToken.matches[ntndx], [ntndx].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse);
												if (match) {
													altIndexArr.push(ntndx.toString());
													$.each(matches, function(ndx, lmnt) {
														lmnt.alternation = loopNdx.length - 1;
													});
												}
											}
										}
										maltMatches = matches.slice();
										testPos = currentPos;
										matches = [];
										//cloneback
										for (var i = 0; i < ndxInitializerClone.length; i++) {
											ndxInitializer[i] = ndxInitializerClone[i];
										}
										//fuzzy merge matches
										for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
											var altMatch = maltMatches[ndx1];
											altMatch.alternation = altMatch.alternation || loopNdxCnt;
											for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
												var altMatch2 = malternateMatches[ndx2];
												//verify equality
												if (altMatch.match.mask === altMatch2.match.mask && (typeof altIndex !== "string" || $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1)) {
													maltMatches.splice(ndx1, 1);
													ndx1--;
													altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation];
													altMatch2.alternation = altMatch.alternation; //we pass the alternation index => used in determineLastRequiredPosition
													break;
												}
											}
										}
										malternateMatches = malternateMatches.concat(maltMatches);
									}

									if (typeof altIndex == "string") { //filter matches
										malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
											if (isFinite(ndx)) {
												var mamatch,
													alternation = lmnt.alternation,
													altLocArr = lmnt.locator[alternation].toString().split(",");
												lmnt.locator[alternation] = undefined;
												lmnt.alternation = undefined;
												for (var alndx = 0; alndx < altLocArr.length; alndx++) {
													mamatch = $.inArray(altLocArr[alndx], altIndexArr) !== -1;
													if (mamatch) { //rebuild the locator with valid entries
														if (lmnt.locator[alternation] !== undefined) {
															lmnt.locator[alternation] += ",";
															lmnt.locator[alternation] += altLocArr[alndx];
														} else lmnt.locator[alternation] = parseInt(altLocArr[alndx]);

														lmnt.alternation = alternation;
													}
												}
												if (lmnt.locator[alternation] !== undefined) return lmnt;
											}
										});
									}

									matches = currentMatches.concat(malternateMatches);
									testPos = pos;
									insertStop = matches.length > 0; //insert a stopelemnt when there is an alternate
								} else {
									if (alternateToken.matches[altIndex]) { //if not in the initial alternation => look further
										match = handleMatch(alternateToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
									} else match = false;
								}
								if (match) return true;
							} else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
								var qt = match;
								for (var qndx = (ndxInitializer.length > 0) ? ndxInitializer.shift() : 0;
									(qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
									var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
									match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker
									if (match) {
										//get latest match
										latestMatch = matches[matches.length - 1].match;
										latestMatch.optionalQuantifier = qndx > (qt.quantifier.min - 1);
										isFirstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;

										if (isFirstMatch) { //search for next possible match
											if (qndx > (qt.quantifier.min - 1)) {
												insertStop = true;
												testPos = pos; //match the position after the group
												break; //stop quantifierloop
											} else return true;
										} else {
											return true;
										}
									}
								}
							} else {
								match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
								if (match) return true;
							}
						} else testPos++;
					}

					for (var tndx = (ndxInitializer.length > 0 ? ndxInitializer.shift() : 0); tndx < maskToken.matches.length; tndx++) {
						if (maskToken.matches[tndx].isQuantifier !== true) {
							var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
							if (match && testPos === pos) {
								return match;
							} else if (testPos > pos) {
								break;
							}
						}
					}
				}

				if (cacheable === true && getMaskSet().tests[pos]) {
					return getMaskSet().tests[pos];
				}
				if (ndxIntlzr === undefined) {
					var previousPos = pos - 1,
						test;
					while ((test = getMaskSet().validPositions[previousPos]) === undefined && previousPos > -1) {
						if (getMaskSet().tests[previousPos] && (test = getMaskSet().tests[previousPos][0]) !== undefined) {
							break;
						}
						previousPos--;

					}
					if (test !== undefined && previousPos > -1) {
						testPos = previousPos;
						ndxInitializer = test.locator.slice();
					}
				}
				for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
					var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
					if ((match && testPos === pos) || testPos > pos) {
						break;
					}
				}
				if (matches.length === 0 || insertStop) {
					matches.push({
						"match": {
							fn: null,
							cardinality: 0,
							optionality: true,
							casing: null,
							def: ""
						},
						"locator": []
					});
				}
				getMaskSet().tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props

				// console.log(pos + " - " + JSON.stringify(matches));
				return getMaskSet().tests[pos];
			}

			function getBufferTemplate() {
				if (getMaskSet()._buffer === undefined) {
					//generate template
					getMaskSet()._buffer = getMaskTemplate(false, 1);
				}
				return getMaskSet()._buffer;
			}

			function getBuffer() {
				if (getMaskSet().buffer === undefined) {
					getMaskSet().buffer = getMaskTemplate(true, getLastValidPosition(), true);
				}
				return getMaskSet().buffer;
			}

			function refreshFromBuffer(start, end, buffer) {
				var i;
				buffer = buffer || getBuffer().slice(); //pass or work on clone
				if (start === true) {
					resetMaskSet();
					start = 0;
					end = buffer.length;
				} else {
					for (i = start; i < end; i++) {
						delete getMaskSet().validPositions[i];
						delete getMaskSet().tests[i];
					}
				}
				for (i = start; i < end; i++) {
					resetMaskSet(true); //prevents clobber from the buffer
					if (buffer[i] !== opts.skipOptionalPartCharacter) {
						isValid(i, buffer[i], true, true);
					}
				}
			}

			function casing(elem, test) {
				switch (test.casing) {
					case "upper":
						elem = elem.toUpperCase();
						break;
					case "lower":
						elem = elem.toLowerCase();
						break;
				}

				return elem;
			}

			function checkAlternationMatch(altArr1, altArr2) {
				var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
					isMatch = false;
				for (var alndx = 0; alndx < altArr1.length; alndx++) {
					if ($.inArray(altArr1[alndx], altArrC) !== -1) {
						isMatch = true;
						break;
					}
				}
				return isMatch;
			}

			function isValid(pos, c, strict, fromSetValid) { //strict true ~ no correction or autofill
				strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

				function _isValid(position, c, strict, fromSetValid) {
					var rslt = false;
					$.each(getTests(position), function(ndx, tst) {
						var test = tst.match;
						var loopend = c ? 1 : 0,
							chrs = "";
						for (var i = test.cardinality; i > loopend; i--) {
							chrs += getBufferElement(position - (i - 1));
						}
						if (c) {
							chrs += c;
						}

						//return is false or a json object => { pos: ??, c: ??} or true
						rslt = test.fn != null ?
							test.fn.test(chrs, getMaskSet(), position, strict, opts) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? //non mask
							{
								c: test.def,
								pos: position
							} : false;

						if (rslt !== false) {
							var elem = rslt.c !== undefined ? rslt.c : c;
							elem = (elem === opts.skipOptionalPartCharacter && test.fn === null) ? test.def : elem;

							var validatedPos = position,
								possibleModifiedBuffer = getBuffer();

							if (rslt.remove !== undefined) { //remove position(s)
								if (!$.isArray(rslt.remove)) rslt.remove = [rslt.remove];
								$.each(rslt.remove.sort(function(a, b) {
									return b - a;
								}), function(ndx, lmnt) {
									stripValidPositions(lmnt, lmnt + 1, true);
								});
							}
							if (rslt.insert !== undefined) { //insert position(s)
								if (!$.isArray(rslt.insert)) rslt.insert = [rslt.insert];
								$.each(rslt.insert.sort(function(a, b) {
									return a - b;
								}), function(ndx, lmnt) {
									isValid(lmnt.pos, lmnt.c, true);
								});
							}

							if (rslt.refreshFromBuffer) {
								var refresh = rslt.refreshFromBuffer;
								strict = true;
								refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, possibleModifiedBuffer);
								if (rslt.pos === undefined && rslt.c === undefined) {
									rslt.pos = getLastValidPosition();
									return false; //breakout if refreshFromBuffer && nothing to insert
								}
								validatedPos = rslt.pos !== undefined ? rslt.pos : position;
								if (validatedPos !== position) {
									rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
									return false;
								}

							} else if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) { //their is a position offset
								validatedPos = rslt.pos;
								refreshFromBuffer(position, validatedPos);
								if (validatedPos !== position) {
									rslt = $.extend(rslt, isValid(validatedPos, elem, true)); //revalidate new position strict
									return false;
								}
							}

							if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
								return false; //breakout if nothing to insert
							}

							if (ndx > 0) {
								resetMaskSet(true);
							}

							if (!setValidPosition(validatedPos, $.extend({}, tst, {
									"input": casing(elem, test)
								}), fromSetValid)) {
								rslt = false;
							}
							return false; //break from $.each
						}
					});

					return rslt;
				}

				function alternate(pos, c, strict, fromSetValid) {
					var validPsClone = $.extend(true, {}, getMaskSet().validPositions),
						lastAlt,
						alternation,
						isValidRslt,
						altPos, i, validPos;
					//find last modified alternation
					for (var lAlt = getLastValidPosition(); lAlt >= 0; lAlt--) {
						altPos = getMaskSet().validPositions[lAlt];
						if (altPos && altPos.alternation !== undefined) {
							lastAlt = lAlt;
							alternation = getMaskSet().validPositions[lastAlt].alternation;
							if (getTestTemplate(lastAlt).locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
								break;
							}
						}
					}
					if (alternation !== undefined) {
						//find first decision making position
						lastAlt = parseInt(lastAlt);
						for (var decisionPos in getMaskSet().validPositions) {
							decisionPos = parseInt(decisionPos);
							altPos = getMaskSet().validPositions[decisionPos];
							if (decisionPos >= lastAlt && altPos.alternation !== undefined) {
								var altNdxs = getMaskSet().validPositions[lastAlt].locator[alternation].toString().split(","),
									decisionTaker = altPos.locator[alternation] || altNdxs[0]; //no match in the alternations (length mismatch)
								if (decisionTaker.length > 0) { //no decision taken ~ take first one as decider
									decisionTaker = decisionTaker.split(",")[0];
								}

								for (var mndx = 0; mndx < altNdxs.length; mndx++) {
									if (decisionTaker < altNdxs[mndx]) {
										var possibilityPos, possibilities;
										for (var dp = decisionPos; dp >= 0; dp--) {
											possibilityPos = getMaskSet().validPositions[dp];
											if (possibilityPos !== undefined) {
												possibilities = possibilityPos.locator[alternation]; //store to reset
												//possibilityPos.alternation = undefined;
												possibilityPos.locator[alternation] = parseInt(altNdxs[mndx]);
												break;
											}
										}
										if (decisionTaker !== possibilityPos.locator[alternation]) {
											var validInputs = [],
												staticInputsBeforePos = 0;
											for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
												validPos = getMaskSet().validPositions[i];
												if (validPos) {
													if (validPos.match.fn != null) {
														validInputs.push(validPos.input);
													} else if (i < pos) staticInputsBeforePos++;
												}
												delete getMaskSet().validPositions[i];
												delete getMaskSet().tests[i];
											}
											resetMaskSet(true); //clear getbuffer
											opts.keepStatic = !opts.keepStatic; //disable keepStatic on getMaskLength
											isValidRslt = true;
											while (validInputs.length > 0) {
												var input = validInputs.shift();
												if (input !== opts.skipOptionalPartCharacter) {
													if (!(isValidRslt = isValid(getLastValidPosition() + 1, input, false, true))) {
														break;
													}
												}
											}

											possibilityPos.alternation = alternation;
											possibilityPos.locator[alternation] = possibilities; //reset forceddecision ~ needed for proper delete
											if (isValidRslt) {
												var targetLvp = getLastValidPosition(pos) + 1;
												var staticInputsBeforePosAlternate = 0;
												for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) {
													validPos = getMaskSet().validPositions[i];
													if (validPos && validPos.match.fn == null && i < pos) {
														staticInputsBeforePosAlternate++;
													}
												}
												pos = pos + (staticInputsBeforePosAlternate - staticInputsBeforePos);
												isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid);
											}
											opts.keepStatic = !opts.keepStatic; //enable keepStatic on getMaskLength
											if (!isValidRslt) {
												resetMaskSet();
												getMaskSet().validPositions = $.extend(true, {}, validPsClone);
											} else return isValidRslt;
										}
									}
								}
								break;
							}
						}
					}
					return false;
				}

				//set alternator choice on previous skipped placeholder positions
				function trackbackAlternations(originalPos, newPos) {
					var vp = getMaskSet().validPositions[newPos],
						targetLocator = vp.locator,
						tll = targetLocator.length;

					for (var ps = originalPos; ps < newPos; ps++) {
						if (!isMask(ps)) {
							var tests = getTests(ps),
								bestMatch = tests[0],
								equality = -1;
							$.each(tests, function(ndx, tst) {
								for (var i = 0; i < tll; i++) {
									if (tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(",")) && equality < i) {
										equality = i;
										bestMatch = tst;
									}
								}
							});
							setValidPosition(ps, $.extend({}, bestMatch, {
								"input": bestMatch.match.def
							}), true);
						}
					}
				}
				//Check for a nonmask before the pos
				var buffer = getBuffer();

				//find previous valid
				for (var pndx = pos - 1; pndx > -1; pndx--) {
					if (getMaskSet().validPositions[pndx]) {
						break;
					}
				}
				////fill missing nonmask and valid placeholders
				pndx++;
				for (; pndx < pos; pndx++) {
					//console.log("missing " + pndx + " " + buffer[pndx] + " ismask " + isMask(pndx) + " plchldr " + getPlaceholder(pndx) + " nrt " + getTests(pndx).len);
					if (getMaskSet().validPositions[pndx] === undefined && (((!isMask(pndx) || buffer[pndx] !== getPlaceholder(pndx)) && getTests(pndx).length > 1) || (buffer[pndx] === opts.radixPoint || buffer[pndx] === "0" && $.inArray(opts.radixPoint, buffer) < pndx))) //special case for decimals ~ = placeholder but yet valid input
					{
						//console.log("inject " + pndx + " " + buffer[pndx]);
						_isValid(pndx, buffer[pndx], true);
					}
				}

				var maskPos = pos,
					result = false,
					positionsClone = $.extend(true, {}, getMaskSet().validPositions); //clone the currentPositions

				//if (fromSetValid && maskPos >= getMaskLength()) {
				//		resetMaskSet(true); //masklenght can be altered on the process => reset to get the actual length
				//}
				if (maskPos < getMaskLength()) {
					getBuffer(); //make sure the buffer
					result = _isValid(maskPos, c, strict, fromSetValid);
					if ((!strict || fromSetValid) && result === false) {
						var currentPosValid = getMaskSet().validPositions[maskPos];
						if (currentPosValid && currentPosValid.match.fn === null && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
							result = {
								"caret": seekNext(maskPos)
							};
						} else if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos)) { //does the input match on a further position?
							for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
								result = _isValid(nPos, c, strict, fromSetValid);
								if (result !== false) {
									trackbackAlternations(maskPos, nPos);
									maskPos = nPos;
									break;
								}
							}
						}
					}
				}
				if (result === false && opts.keepStatic && isComplete(buffer)) { //try fuzzy alternator logic
					result = alternate(pos, c, strict, fromSetValid);
				}
				if (result === true) {
					result = {
						"pos": maskPos
					};
				}
				if ($.isFunction(opts.postValidation) && result !== false && !strict) {
					resetMaskSet(true);
					var postValidResult = opts.postValidation(getBuffer(), opts);
					if (!postValidResult) {
						resetMaskSet(true);
						getMaskSet().validPositions = $.extend(true, {}, positionsClone); //revert validation changes
						result = false;
					} else if (postValidResult.refreshFromBuffer) {
						var refresh = postValidResult.refreshFromBuffer;
						refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, postValidResult.buffer);
						resetMaskSet(true);
						result = postValidResult;
					}
				}

				return result;
			}

			function isMask(pos) {
				var test = getTest(pos);
				if (test.fn != null) {
					return test.fn;
				} else if (pos > -1 && !opts.keepStatic && getMaskSet().validPositions[pos] === undefined) {
					var tests = getTests(pos),
						staticAlternations = true;
					for (var i = 0; i < tests.length; i++) {
						if (tests[i].match.def !== "" && ( /*tests[i].match.fn !== null || */ (tests[i].alternation === undefined || tests[i].locator[tests[i].alternation].length > 1))) {
							staticAlternations = false;
							break;
						}
					}
					return staticAlternations;
				}

				return false;
			}

			function getMaskLength() {
				var maskLength;
				maxLength = el !== undefined ? el.maxLength : undefined;
				if (maxLength === -1) maxLength = undefined; /* FF sets no defined max length to -1 */
				var pos, lvp = getLastValidPosition(),
					testPos = getMaskSet().validPositions[lvp],
					ndxIntlzr = testPos !== undefined ? testPos.locator.slice() : undefined;
				for (pos = lvp + 1; testPos === undefined || (testPos.match.fn !== null || (testPos.match.fn === null && testPos.match.def !== "")); pos++) {
					testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
					ndxIntlzr = testPos.locator.slice();
				}

				var lastTest = getTest(pos - 1);
				maskLength = (lastTest.def !== "") ? pos : pos - 1;
				return (maxLength === undefined || maskLength < maxLength) ? maskLength : maxLength;
			}

			function seekNext(pos, newBlock) {
				var maskL = getMaskLength();
				if (pos >= maskL) return maskL;
				var position = pos;
				while (++position < maskL && ((newBlock === true && (getTest(position).newBlockMarker !== true || !isMask(position))) || (newBlock !== true && !isMask(position) && (opts.nojumps !== true || opts.nojumpsThreshold > position)))) {}
				return position;
			}

			function seekPrevious(pos, newBlock) {
				var position = pos;
				if (position <= 0) return 0;

				while (--position > 0 && ((newBlock === true && getTest(position).newBlockMarker !== true) || (newBlock !== true && !isMask(position)))) {}

				return position;
			}

			function getBufferElement(position) {
				return getMaskSet().validPositions[position] === undefined ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
			}

			function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
				if (event && $.isFunction(opts.onBeforeWrite)) {
					var result = opts.onBeforeWrite.call(input, event, buffer, caretPos, opts);
					if (result) {
						if (result.refreshFromBuffer) {
							var refresh = result.refreshFromBuffer;
							refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
							resetMaskSet(true);
							buffer = getBuffer();
						}
						//only alter when intented !== undefined
						if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
					}
				}
				input.inputmask._valueSet(buffer.join(""));
				if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
					caret(input, caretPos);
				}
				if (triggerInputEvent === true) {
					skipInputEvent = true;
					$(input).trigger("input");
				}
			}

			function getPlaceholder(pos, test) {
				test = test || getTest(pos);
				if (test.placeholder !== undefined) {
					return test.placeholder;
				} else if (test.fn === null) {
					if (pos > -1 && !opts.keepStatic && getMaskSet().validPositions[pos] === undefined) {
						var tests = getTests(pos),
							hasAlternations = false,
							prevTest;
						for (var i = 0; i < tests.length; i++) {
							if (prevTest && tests[i].match.def !== "" && (tests[i].match.def !== prevTest.match.def && (tests[i].alternation === undefined || tests[i].alternation === prevTest.alternation))) {
								hasAlternations = true;
								break;
							}

							if (tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true) {
								prevTest = tests[i];
							}
						}

						if (hasAlternations) {
							return opts.placeholder.charAt(pos % opts.placeholder.length);
						}
					}
					return test.def;
				} else {
					return opts.placeholder.charAt(pos % opts.placeholder.length);
				}
			}

			function checkVal(input, writeOut, strict, nptvl) {
				var inputValue = nptvl.slice(),
					charCodes = "",
					initialNdx = 0;

				function isTemplateMatch() {
					var isMatch = false;
					var charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join("").indexOf(charCodes);
					if (charCodeNdx !== -1 && !isMask(initialNdx)) {
						isMatch = true;
						var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx);
						for (var i = 0; i < bufferTemplateArr.length; i++) {
							if (bufferTemplateArr[i] !== " ") {
								isMatch = false;
								break;
							}
						}
					}

					return isMatch;
				}
				resetMaskSet();
				getMaskSet().p = seekNext(-1);
				// if (writeOut) input.inputmask._valueSet(""); //initial clear

				if (!strict) {
					if (opts.autoUnmask !== true) {
						var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""),
							matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
						if (matches && matches.length > 0) {
							inputValue.splice(0, matches.length * staticInput.length);
							initialNdx = seekNext(initialNdx);
						}
					} else {
						initialNdx = seekNext(initialNdx);
					}
				}


				$.each(inputValue, function(ndx, charCode) {
					var keypress = $.Event("keypress");
					keypress.which = charCode.charCodeAt(0);
					charCodes += charCode;
					var lvp = getLastValidPosition(undefined, true),
						lvTest = getMaskSet().validPositions[lvp],
						nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
					if (!isTemplateMatch() || strict || opts.autoUnmask) {
						var pos = strict ? ndx : (nextTest.match.fn == null && nextTest.match.optionality && (lvp + 1) < getMaskSet().p ? lvp + 1 : getMaskSet().p);
						keypressEvent.call(input, keypress, true, false, strict, pos);
						initialNdx = pos + 1;
						charCodes = "";
					} else {
						keypressEvent.call(input, keypress, true, false, true, lvp + 1);
					}
				});
				if (writeOut) {
					writeBuffer(input, getBuffer(), document.activeElement === input ? seekNext(getLastValidPosition(0)) : undefined, $.Event("checkval"));
				}
			}

			function unmaskedvalue(input) {
				if (input && input.inputmask === undefined) {
					return input.value;
				}

				var umValue = [],
					vps = getMaskSet().validPositions;
				for (var pndx in vps) {
					if (vps[pndx].match && vps[pndx].match.fn != null) {
						umValue.push(vps[pndx].input);
					}
				}
				var unmaskedValue = umValue.length === 0 ? null : (isRTL ? umValue.reverse() : umValue).join("");
				if (unmaskedValue !== null) {
					var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
					if ($.isFunction(opts.onUnMask)) {
						unmaskedValue = (opts.onUnMask.call(input, bufferValue, unmaskedValue, opts) || unmaskedValue);
					}
				}
				return unmaskedValue;
			}

			function caret(input, begin, end) {
				function translatePosition(pos) {
					if (isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "")) {
						var bffrLght = getBuffer().join("").length; //join is needed because sometimes we get an empty buffer element which must not be counted for the caret position (numeric alias)
						pos = bffrLght - pos;
					}
					return pos;
				}
				var range;
				if (typeof begin === "number") {
					begin = translatePosition(begin);
					end = translatePosition(end);
					end = (typeof end == "number") ? end : begin;
					// if (!$(input).is(":visible")) {
					// 	return;
					// }

					var scrollCalc = (input.ownerDocument.defaultView || window).getComputedStyle(input, null).fontSize.replace("px", "") * end;
					input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
					if (!androidchrome && opts.insertMode === false && begin === end) end++; //set visualization for insert/overwrite mode
					if (input.setSelectionRange) {
						input.selectionStart = begin;
						input.selectionEnd = end;
					} else if (window.getSelection) {
						range = document.createRange();
						if (input.firstChild === undefined) {
							var textNode = document.createTextNode("");
							input.appendChild(textNode);
						}
						range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
						range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
						range.collapse(true);
						var sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
						//input.focus();
					} else if (input.createTextRange) {
						range = input.createTextRange();
						range.collapse(true);
						range.moveEnd("character", end);
						range.moveStart("character", begin);
						range.select();

					}
				} else {
					if (input.setSelectionRange) {
						begin = input.selectionStart;
						end = input.selectionEnd;
					} else if (window.getSelection) {
						range = window.getSelection().getRangeAt(0);
						if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
							begin = range.startOffset;
							end = range.endOffset;
						}
					} else if (document.selection && document.selection.createRange) {
						range = document.selection.createRange();
						begin = 0 - range.duplicate().moveStart("character", -100000);
						end = begin + range.text.length;
					}
					/*eslint-disable consistent-return */
					return {
						"begin": translatePosition(begin),
						"end": translatePosition(end)
					};
					/*eslint-enable consistent-return */
				}
			}

			function determineLastRequiredPosition(returnDefinition) {
				var buffer = getBuffer(),
					bl = buffer.length,
					pos, lvp = getLastValidPosition(),
					positions = {},
					lvTest = getMaskSet().validPositions[lvp],
					ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
					testPos;
				for (pos = lvp + 1; pos < buffer.length; pos++) {
					testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
					ndxIntlzr = testPos.locator.slice();
					positions[pos] = $.extend(true, {}, testPos);
				}

				var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
				for (pos = bl - 1; pos > lvp; pos--) {
					testPos = positions[pos];
					if ((testPos.match.optionality ||
							testPos.match.optionalQuantifier ||
							(lvTestAlt && ((lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.fn != null) ||
								(testPos.match.fn === null && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests(pos)[0].def !== "")))) && buffer[pos] === getPlaceholder(pos, testPos.match)) {
						bl--;
					} else break;
				}
				return returnDefinition ? {
					"l": bl,
					"def": positions[bl] ? positions[bl].match : undefined
				} : bl;
			}

			function clearOptionalTail(buffer) {
				var rl = determineLastRequiredPosition(),
					lmib = buffer.length - 1;
				for (; lmib > rl; lmib--) {
					if (isMask(lmib)) break; //fixme ismask is not good enough
				}
				buffer.splice(rl, lmib + 1 - rl);

				return buffer;
			}

			function isComplete(buffer) { //return true / false / undefined (repeat *)
				if ($.isFunction(opts.isComplete)) return opts.isComplete.call(el, buffer, opts);
				if (opts.repeat === "*") return undefined;
				var complete = false,
					lrp = determineLastRequiredPosition(true),
					aml = seekPrevious(lrp.l);

				if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
					complete = true;
					for (var i = 0; i <= aml; i++) {
						var test = getTestTemplate(i).match;
						if ((test.fn !== null && getMaskSet().validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true) || (test.fn === null && buffer[i] !== getPlaceholder(i, test))) {
							complete = false;
							break;
						}
					}
				}
				return complete;
			}

			function isSelection(begin, end) {
				return isRTL ? (begin - end) > 1 || ((begin - end) === 1 && opts.insertMode) :
					(end - begin) > 1 || ((end - begin) === 1 && opts.insertMode);
			}

			function wrapEvent(eventHandler) {
				return function(e) {
					// console.log("triggered " + e.type);
					var inComposition = false;
					if (this.inputmask === undefined) { //happens when cloning an object with jquery.clone
						var imOpts = $.data(this, "_inputmask_opts");
						if (imOpts)(new Inputmask(imOpts)).mask(this);
						else $(this).off(".inputmask");
					} else if (e.type !== "setvalue" && (this.disabled || (this.readOnly && !(e.type === "keydown" && (e.ctrlKey && e.keyCode === 67) || (opts.tabThrough === false && e.keyCode === Inputmask.keyCode.TAB))))) {
						e.preventDefault();
					} else {
						switch (e.type) {
							case "input":
								if (skipInputEvent === true || inComposition === true) {
									skipInputEvent = false;
									return e.preventDefault();
								}
								break;
							case "keydown":
								//Safari 5.1.x - modal dialog fires keypress twice workaround
								skipKeyPressEvent = false;
								inComposition = false;
								break;
							case "keypress":
								if (skipKeyPressEvent === true) {
									return e.preventDefault();
								}
								skipKeyPressEvent = true;

								break;
							case "compositionstart":
								inComposition = true;
								break;
							case "compositionupdate":
								skipInputEvent = true;
								break;
							case "compositionend":
								inComposition = false;
								break;
						}
						//console.log("executed " + e.type);
						return eventHandler.apply(this, arguments);
					}
				};
			}

			function patchValueProperty(npt) {
				var valueGet;
				var valueSet;

				function patchValhook(type) {
					if ($.valHooks && $.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true) {
						var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
							return elem.value;
						};
						var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
							elem.value = value;
							return elem;
						};

						$.valHooks[type] = {
							get: function(elem) {
								if (elem.inputmask) {
									if (elem.inputmask.opts.autoUnmask) {
										return elem.inputmask.unmaskedvalue();
									} else {
										var result = valhookGet(elem),
											maskset = elem.inputmask.maskset,
											bufferTemplate = maskset._buffer;
										bufferTemplate = bufferTemplate ? bufferTemplate.join("") : "";
										return result !== bufferTemplate ? result : "";
									}
								} else return valhookGet(elem);
							},
							set: function(elem, value) {
								var $elem = $(elem),
									result;
								result = valhookSet(elem, value);
								if (elem.inputmask) {
									$elem.trigger("setvalue.inputmask");
								}
								return result;
							},
							inputmaskpatch: true
						};
					}
				}

				function getter() {
					if (this.inputmask) {
						return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : (valueGet.call(this) !== getBufferTemplate().join("") ? valueGet.call(this) : "");
					} else return valueGet.call(this);
				}

				function setter(value) {
					valueSet.call(this, value);
					if (this.inputmask) {
						$(this).trigger("setvalue.inputmask");
					}
				}

				function installNativeValueSetFallback(npt) {
					$(npt).on("mouseenter.inputmask", wrapEvent(function(event) {
						var $input = $(this),
							input = this,
							value = input.inputmask._valueGet();
						if (value !== "" && value !== getBuffer().join("")) {
							$input.trigger("setvalue.inputmask");
						}
					}));
					// //!! the bound handlers are executed in the order they where bound
					// //reorder the events - the mouseenter event is internally mapped to the mouseover event
					// var events = $._data(npt).events;
					// var handlers = events.mouseover;
					// if (handlers) {
					// 	var ourHandler = handlers[handlers.length - 1];
					// 	for (var i = handlers.length - 1; i > 0; i--) {
					// 		handlers[i] = handlers[i - 1];
					// 	}
					// 	handlers[0] = ourHandler;
					// }
				}

				if (!npt.inputmask.__valueGet) {
					if (Object.getOwnPropertyDescriptor && npt.value === undefined) { // && npt.isContentEditable) {
						valueGet = function() {
							return this.textContent;
						};
						valueSet = function(value) {
							this.textContent = value;
						};

						Object.defineProperty(npt, "value", {
							get: getter,
							set: setter
						});
					} else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
						valueGet = npt.__lookupGetter__("value");
						valueSet = npt.__lookupSetter__("value");

						npt.__defineGetter__("value", getter);
						npt.__defineSetter__("value", setter);
					} else { //jquery.val
						valueGet = function() {
							return npt.value;
						};
						valueSet = function(value) {
							npt.value = value;
						};
						patchValhook(npt.type);
						installNativeValueSetFallback(npt);
					}
					npt.inputmask.__valueGet = valueGet; //store native property getter
					npt.inputmask._valueGet = function(overruleRTL) {
						return isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
					};
					npt.inputmask.__valueSet = valueSet; //store native property setter
					npt.inputmask._valueSet = function(value, overruleRTL) {
						valueSet.call(this.el, (overruleRTL !== true && isRTL && value !== null && value !== undefined) ? value.split("").reverse().join("") : value);
					};
				}
			}

			function handleRemove(input, k, pos, strict) {
				function generalize() {
					if (opts.keepStatic) {
						resetMaskSet(true);
						var validInputs = [],
							lastAlt, positionsClone = $.extend(true, {}, getMaskSet().validPositions);
						//find last alternation
						for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) {
							var validPos = getMaskSet().validPositions[lastAlt];
							if (validPos) {
								if (validPos.match.fn != null) {
									validInputs.push(validPos.input);
								}
								delete getMaskSet().validPositions[lastAlt];
								if (validPos.alternation !== undefined && validPos.locator[validPos.alternation] === getTestTemplate(lastAlt).locator[validPos.alternation]) {
									break;
								}
							}
						}

						if (lastAlt > -1) {
							while (validInputs.length > 0) {
								getMaskSet().p = seekNext(getLastValidPosition());
								var keypress = $.Event("keypress");
								keypress.which = validInputs.pop().charCodeAt(0);
								keypressEvent.call(input, keypress, true, false, false, getMaskSet().p);
							}
						} else getMaskSet().validPositions = $.extend(true, {}, positionsClone); //restore original positions

					}
				}

				if (opts.numericInput || isRTL) {
					if (k === Inputmask.keyCode.BACKSPACE) {
						k = Inputmask.keyCode.DELETE;
					} else if (k === Inputmask.keyCode.DELETE) {
						k = Inputmask.keyCode.BACKSPACE;
					}

					if (isRTL) {
						var pend = pos.end;
						pos.end = pos.begin;
						pos.begin = pend;
					}
				}

				if (k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode === false)) {
					pos.begin = seekPrevious(pos.begin);
					if (getMaskSet().validPositions[pos.begin] !== undefined && (getMaskSet().validPositions[pos.begin].input === opts.groupSeparator || getMaskSet().validPositions[pos.begin].input === opts.radixPoint)) {
						pos.begin--;
					}
				} else if (k === Inputmask.keyCode.DELETE && pos.begin === pos.end) {
					pos.end = isMask(pos.end) ? pos.end + 1 : seekNext(pos.end) + 1;
					if (getMaskSet().validPositions[pos.begin] !== undefined && (getMaskSet().validPositions[pos.begin].input === opts.groupSeparator || getMaskSet().validPositions[pos.begin].input === opts.radixPoint)) {
						pos.end++;
					}
				}

				stripValidPositions(pos.begin, pos.end, false, strict);
				if (strict !== true) {
					generalize(); //revert the alternation
				}
				var lvp = getLastValidPosition(pos.begin);
				if (lvp < pos.begin) {
					if (lvp === -1) resetMaskSet();
					getMaskSet().p = seekNext(lvp);
				} else if (strict !== true) {
					getMaskSet().p = pos.begin;
				}
			}

			function keydownEvent(e) {
				var input = this,
					$input = $(input),
					k = e.keyCode,
					pos = caret(input);

				//backspace, delete, and escape get special treatment
				if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || (iphone && k === 127) || (e.ctrlKey && k === 88 && !isInputEventSupported("cut"))) { //backspace/delete
					e.preventDefault(); //stop default action but allow propagation
					if (k === 88) undoValue = getBuffer().join("");
					handleRemove(input, k, pos);
					writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));
					if (input.inputmask._valueGet() === getBufferTemplate().join("")) {
						$input.trigger("cleared");
					} else if (isComplete(getBuffer()) === true) {
						$input.trigger("complete");
					}
					if (opts.showTooltip) { //update tooltip
						$input.prop("title", getMaskSet().mask);
					}
				} else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
					setTimeout(function() {
						var caretPos = seekNext(getLastValidPosition());
						if (!opts.insertMode && caretPos === getMaskLength() && !e.shiftKey) caretPos--;
						caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
					}, 0);
				} else if ((k === Inputmask.keyCode.HOME && !e.shiftKey) || k === Inputmask.keyCode.PAGE_UP) { //Home or page_up
					caret(input, 0, e.shiftKey ? pos.begin : 0);
				} else if (((opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE) || (k === 90 && e.ctrlKey)) && e.altKey !== true) { //escape && undo && #762
					checkVal(input, true, false, undoValue.split(""));
					$input.trigger("click");
				} else if (k === Inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
					opts.insertMode = !opts.insertMode;
					caret(input, !opts.insertMode && pos.begin === getMaskLength() ? pos.begin - 1 : pos.begin);
				} else if (opts.tabThrough === true && k === Inputmask.keyCode.TAB) {
					if (e.shiftKey === true) {
						if (getTest(pos.begin).fn === null) {
							pos.begin = seekNext(pos.begin);
						}
						pos.end = seekPrevious(pos.begin, true);
						pos.begin = seekPrevious(pos.end, true);
					} else {
						pos.begin = seekNext(pos.begin, true);
						pos.end = seekNext(pos.begin, true);
						if (pos.end < getMaskLength()) pos.end--;
					}
					if (pos.begin < getMaskLength()) {
						e.preventDefault();
						caret(input, pos.begin, pos.end);
					}
				} else if (opts.insertMode === false && !e.shiftKey) {
					if (k === Inputmask.keyCode.RIGHT) {
						setTimeout(function() {
							var caretPos = caret(input);
							caret(input, caretPos.begin);
						}, 0);
					} else if (k === Inputmask.keyCode.LEFT) {
						setTimeout(function() {
							var caretPos = caret(input);
							caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
						}, 0);
					}
				}
				opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts);
				ignorable = $.inArray(k, opts.ignorables) !== -1;
			}

			function keypressEvent(e, checkval, writeOut, strict, ndx) {
				var input = this,
					$input = $(input),
					k = e.which || e.charCode || e.keyCode;

				if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
					if (k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("")) {
						setTimeout(function() {
							$input.trigger("change");
							undoValue = getBuffer().join("");
						}, 0);
					}
					return true;
				} else {
					if (k) {
						//special treat the decimal separator
						if (k === 46 && e.shiftKey === false && opts.radixPoint === ",") k = 44;
						var pos = checkval ? {
								begin: ndx,
								end: ndx
							} : caret(input),
							forwardPosition, c = String.fromCharCode(k);

						//should we clear a possible selection??
						var isSlctn = isSelection(pos.begin, pos.end);
						if (isSlctn) {
							getMaskSet().undoPositions = $.extend(true, {}, getMaskSet().validPositions); //init undobuffer for recovery when not valid
							handleRemove(input, Inputmask.keyCode.DELETE, pos, true);
							pos.begin = getMaskSet().p;
							if (!opts.insertMode) { //preserve some space
								opts.insertMode = !opts.insertMode;
								setValidPosition(pos.begin, strict);
								opts.insertMode = !opts.insertMode;
							}
							isSlctn = !opts.multi;
						}

						getMaskSet().writeOutBuffer = true;
						var p = isRTL && !isSlctn ? pos.end : pos.begin;
						var valResult = isValid(p, c, strict);
						if (valResult !== false) {
							if (valResult !== true) {
								p = valResult.pos !== undefined ? valResult.pos : p; //set new position from isValid
								c = valResult.c !== undefined ? valResult.c : c; //set new char from isValid
							}
							resetMaskSet(true);
							if (valResult.caret !== undefined) {
								forwardPosition = valResult.caret;
							} else {
								var vps = getMaskSet().validPositions;
								if (!opts.keepStatic && (vps[p + 1] !== undefined && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || vps[p].alternation !== undefined)) {
									forwardPosition = p + 1;
								} else forwardPosition = seekNext(p);
							}
							getMaskSet().p = forwardPosition; //needed for checkval
						}

						if (writeOut !== false) {
							var self = this;
							setTimeout(function() {
								opts.onKeyValidation.call(self, valResult, opts);
							}, 0);
							if (getMaskSet().writeOutBuffer && valResult !== false) {
								var buffer = getBuffer();
								writeBuffer(input, buffer, checkval ? undefined : opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== true);
								if (checkval !== true) {
									setTimeout(function() { //timeout needed for IE
										if (isComplete(buffer) === true) $input.trigger("complete");
									}, 0);
								}
							} else if (isSlctn) {
								getMaskSet().buffer = undefined;
								getMaskSet().validPositions = getMaskSet().undoPositions;
							}
						} else if (isSlctn) {
							getMaskSet().buffer = undefined;
							getMaskSet().validPositions = getMaskSet().undoPositions;
						}

						if (opts.showTooltip) { //update tooltip
							$input.prop("title", getMaskSet().mask);
						}

						if (checkval && $.isFunction(opts.onBeforeWrite)) {
							var result = opts.onBeforeWrite.call(this, e, getBuffer(), forwardPosition, opts);
							if (result && result.refreshFromBuffer) {
								var refresh = result.refreshFromBuffer;
								refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer);
								resetMaskSet(true);
								if (result.caret) {
									getMaskSet().p = result.caret;
								}
							}
						}
						e.preventDefault();

						if (checkval) {
							return valResult;
						}
					}
				}
			}

			function pasteEvent(e) {
				var input = this,
					$input = $(input),
					inputValue = input.inputmask._valueGet(true),
					caretPos = caret(input);
				//paste event for IE8 and lower I guess ;-)
				if (e.type === "propertychange" && input.inputmask._valueGet().length <= getMaskLength()) {
					return true;
				} else if (e.type === "paste") {
					var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
						valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);

					if (valueBeforeCaret === getBufferTemplate().slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
					if (valueAfterCaret === getBufferTemplate().slice(caretPos.end).join("")) valueAfterCaret = "";

					if (window.clipboardData && window.clipboardData.getData) { // IE
						inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
					} else if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
						inputValue = valueBeforeCaret + e.originalEvent.clipboardData.getData("text/plain") + valueAfterCaret;
					}
				}

				var pasteValue = inputValue;
				if ($.isFunction(opts.onBeforePaste)) {
					pasteValue = opts.onBeforePaste.call(input, inputValue, opts);
					if (pasteValue === false) {
						e.preventDefault();
						return false;
					}
					if (!pasteValue) {
						pasteValue = inputValue;
					}
				}
				checkVal(input, false, false, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split(""));
				writeBuffer(input, getBuffer(), undefined, e, true);
				$input.trigger("click");
				if (isComplete(getBuffer()) === true) {
					$input.trigger("complete");
				}

				return false;
			}

			function inputFallBackEvent(e) { //fallback when keypress & compositionevents fail
				var input = this;
				checkVal(input, true, false, input.inputmask._valueGet().split(''));

				if (isComplete(getBuffer()) === true) {
					$(input).trigger("complete");
				}

				e.preventDefault();
			}

			function compositionStartEvent(e) {
				var input = this;
				undoValue = getBuffer().join("");
				if (compositionData === "" || e.originalEvent.data.indexOf(compositionData) !== 0) {
					compositionCaretPos = caret(input);
				}
			}

			function compositionUpdateEvent(e) {
				var input = this,
					caretPos = caret(input);
				if (e.originalEvent.data.indexOf(compositionData) === 0) {
					resetMaskSet();
					caretPos = compositionCaretPos;
				}
				var newData = e.originalEvent.data;
				caret(input, caretPos.begin, caretPos.end);
				for (var i = 0; i < newData.length; i++) {
					var keypress = $.Event("keypress");
					keypress.which = newData.charCodeAt(i);
					skipKeyPressEvent = false;
					ignorable = false;
					keypressEvent.call(input, keypress); //needs update
				}
				setTimeout(function() {
					var forwardPosition = getMaskSet().p;
					writeBuffer(input, getBuffer(), opts.numericInput ? seekPrevious(forwardPosition) : forwardPosition);
				}, 0);
				compositionData = e.originalEvent.data;
			}

			function compositionEndEvent(e) {
				//pickup by inputfallback
			}

			function setValueEvent(e) {
				var input = this,
					value = input.inputmask._valueGet();
				checkVal(input, true, false, ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(input, value, opts) || value) : value).split(""));
				undoValue = getBuffer().join("");
				if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("")) {
					input.inputmask._valueSet("");
				}
			}

			function focusEvent(e) {
				var input = this,
					nptValue = input.inputmask._valueGet();
				if (opts.showMaskOnFocus && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue === ""))) {
					if (input.inputmask._valueGet() !== getBuffer().join("")) {
						writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
					}
				} else if (mouseEnter === false) { //only executed on focus without mouseenter
					caret(input, seekNext(getLastValidPosition()));
				}
				if (opts.positionCaretOnTab === true) {
					setTimeout(function() {
						caret(input, seekNext(getLastValidPosition()));
					}, 0);
				}
				undoValue = getBuffer().join("");
			}

			function mouseleaveEvent(e) {
				var input = this;
				mouseEnter = false;
				if (opts.clearMaskOnLostFocus) {
					var buffer = getBuffer().slice(),
						nptValue = input.inputmask._valueGet();
					if (document.activeElement !== input && nptValue !== input.getAttribute("placeholder") && nptValue !== "") {
						if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
							buffer = [];
						} else { //clearout optional tail of the mask
							clearOptionalTail(buffer);
						}
						writeBuffer(input, buffer);
					}
				}
			}

			function clickEvent(e) {
				function doRadixFocus(clickPos) {
					if (opts.radixFocus && opts.radixPoint !== "") {
						var vps = getMaskSet().validPositions;
						if (vps[clickPos] === undefined || (vps[clickPos].input === getPlaceholder(clickPos))) {
							if (clickPos < seekNext(-1)) return true;
							var radixPos = $.inArray(opts.radixPoint, getBuffer());
							if (radixPos !== -1) {
								for (var vp in vps) {
									if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
										return false;
									}
								}
								return true;
							}
						}
					}
					return false;
				}
				var input = this;
				if (document.activeElement === input) {
					var selectedCaret = caret(input);
					if (selectedCaret.begin === selectedCaret.end) {
						if (doRadixFocus(selectedCaret.begin)) {
							caret(input, $.inArray(opts.radixPoint, getBuffer()));
						} else {
							var clickPosition = selectedCaret.begin,
								lvclickPosition = getLastValidPosition(clickPosition),
								lastPosition = seekNext(lvclickPosition);

							if (clickPosition < lastPosition) {
								caret(input, !isMask(clickPosition) && !isMask(clickPosition - 1) ? seekNext(clickPosition) : clickPosition);
							} else {
								caret(input, opts.numericInput ? 0 : lastPosition);
							}
						}
					}
				}
			}

			function dblclickEvent(e) {
				var input = this;
				setTimeout(function() {
					caret(input, 0, seekNext(getLastValidPosition()));
				}, 0);
			}

			function cutEvent(e) {
				skipInputEvent = true; //stop inputFallback
				var input = this,
					$input = $(input),
					pos = caret(input);

				//correct clipboardData
				if (isRTL) {
					var clipboardData = window.clipboardData || e.originalEvent.clipboardData,
						clipData = clipboardData.getData("text").split("").reverse().join("");
					clipboardData.setData("text", clipData);
				}
				handleRemove(input, Inputmask.keyCode.DELETE, pos);
				writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));

				if (input.inputmask._valueGet() === getBufferTemplate().join("")) {
					$input.trigger("cleared");
				}

				if (opts.showTooltip) { //update tooltip
					input.title = getMaskSet().mask;
				}
			}

			function blurEvent(e) {
				var $input = $(this),
					input = this;
				if (input.inputmask) {
					var nptValue = input.inputmask._valueGet(),
						buffer = getBuffer().slice();
					if (undoValue !== buffer.join("")) {
						setTimeout(function() { //change event should be triggered after the other buffer manipulations on blur
							$input.trigger("change");
							undoValue = buffer.join("");
						}, 0);
					}
					if (nptValue !== "") {
						if (opts.clearMaskOnLostFocus) {
							if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
								buffer = [];
							} else { //clearout optional tail of the mask
								clearOptionalTail(buffer);
							}
						}
						if (isComplete(buffer) === false) {
							setTimeout(function() {
								$input.trigger("incomplete");
							}, 0);
							if (opts.clearIncomplete) {
								resetMaskSet();
								if (opts.clearMaskOnLostFocus) {
									buffer = [];
								} else {
									buffer = getBufferTemplate().slice();
								}
							}
						}

						writeBuffer(input, buffer, undefined, e);
					}
				}
			}

			function mouseenterEvent(e) {
				var input = this;
				mouseEnter = true;
				if (document.activeElement !== input && opts.showMaskOnHover) {
					if (input.inputmask._valueGet() !== getBuffer().join("")) {
						writeBuffer(input, getBuffer());
					}
				}
			}

			function mask(elem) {
				el = elem;
				$el = $(el);

				//show tooltip
				if (opts.showTooltip) {
					el.title = getMaskSet().mask;
				}

				if (el.dir === "rtl" || opts.rightAlign) {
					el.style.textAlign = "right";
				}

				if (el.dir === "rtl" || opts.numericInput) {
					el.dir = "ltr";
					el.removeAttribute("dir");
					el.inputmask.isRTL = true;
					isRTL = true;
				}

				//unbind all events - to make sure that no other mask will interfere when re-masking
				$el.off(".inputmask");
				patchValueProperty(el);
				if ((el.tagName === "INPUT" && isInputTypeSupported(el.getAttribute("type"))) || el.isContentEditable) {
					//bind events
					$(el.form).on("submit", function() { //trigger change on submit if any
						if (undoValue !== getBuffer().join("")) {
							$el.trigger("change");
						}
						if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
							el.inputmask._valueSet(""); //clear masktemplete on submit and still has focus
						}
						if (opts.removeMaskOnSubmit) {
							el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);
							setTimeout(function() {
								writeBuffer(el, getBuffer());
							}, 0);
						}
					}).on("reset", function() {
						setTimeout(function() {
							$el.trigger("setvalue.inputmask");
						}, 0);
					});

					$el.on("mouseenter.inputmask", wrapEvent(mouseenterEvent))
						.on("blur.inputmask", wrapEvent(blurEvent))
						.on("focus.inputmask", wrapEvent(focusEvent))
						.on("mouseleave.inputmask", wrapEvent(mouseleaveEvent))
						.on("click.inputmask", wrapEvent(clickEvent))
						.on("dblclick.inputmask", wrapEvent(dblclickEvent))
						.on(PasteEventType + ".inputmask dragdrop.inputmask drop.inputmask", wrapEvent(pasteEvent))
						.on("cut.inputmask", wrapEvent(cutEvent))
						.on("complete.inputmask", wrapEvent(opts.oncomplete))
						.on("incomplete.inputmask", wrapEvent(opts.onincomplete))
						.on("cleared.inputmask", wrapEvent(opts.oncleared))
						.on("keydown.inputmask", wrapEvent(keydownEvent))
						.on("keypress.inputmask", wrapEvent(keypressEvent));


					if (!androidfirefox) {
						$el.on("compositionstart.inputmask", wrapEvent(compositionStartEvent))
							.on("compositionupdate.inputmask", wrapEvent(compositionUpdateEvent))
							.on("compositionend.inputmask", wrapEvent(compositionEndEvent));
					}

					if (PasteEventType === "paste") {
						$el.on("input.inputmask", wrapEvent(inputFallBackEvent));
					}
					//if (android || androidfirefox || androidchrome || kindle) {
					//		$el.off("input.inputmask");
					//		$el.on("input.inputmask", mobileInputEvent);
					//}
				}
				$el.on("setvalue.inputmask", wrapEvent(setValueEvent));

				//apply mask
				var initialValue = $.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call(el, el.inputmask._valueGet(), opts) || el.inputmask._valueGet()) : el.inputmask._valueGet();
				checkVal(el, true, false, initialValue.split(""));
				var buffer = getBuffer().slice();
				undoValue = buffer.join("");
				// Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
				var activeElement;
				try {
					activeElement = document.activeElement;
				} catch (e) {}
				if (isComplete(buffer) === false) {
					if (opts.clearIncomplete) {
						resetMaskSet();
					}
				}
				if (opts.clearMaskOnLostFocus) {
					if (buffer.join("") === getBufferTemplate().join("")) {
						buffer = [];
					} else {
						clearOptionalTail(buffer);
					}
				}
				writeBuffer(el, buffer);
				if (activeElement === el) { //position the caret when in focus
					caret(el, seekNext(getLastValidPosition()));
				}
			}

			//action object
			var valueBuffer;
			if (actionObj !== undefined) {
				switch (actionObj.action) {
					case "isComplete":
						el = actionObj.el;
						$el = $(el);
						maskset = el.inputmask.maskset;
						opts = el.inputmask.opts;
						return isComplete(actionObj.buffer);
					case "unmaskedvalue":
						el = actionObj.el;

						if (el !== undefined && el.inputmask !== undefined) {
							maskset = el.inputmask.maskset;
							opts = el.inputmask.opts;
							isRTL = el.inputmask.isRTL;
							valueBuffer = isRTL ? el.inputmask._valueGet().split("").reverse().join("") : el.inputmask._valueGet();
						} else valueBuffer = actionObj.value;

						if (opts.numericInput) {
							isRTL = true;
						}

						valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call($el, valueBuffer, opts) || valueBuffer) : valueBuffer).split("");
						checkVal(undefined, false, false, isRTL ? valueBuffer.reverse() : valueBuffer);
						if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(this, undefined, getBuffer(), 0, opts);

						return unmaskedvalue(el);
					case "mask":
						undoValue = getBuffer().join("");
						mask(actionObj.el);
						break;
					case "format":
						if (opts.numericInput) {
							isRTL = true;
						}
						valueBuffer = ($.isFunction(opts.onBeforeMask) ? (opts.onBeforeMask.call($el, actionObj.value, opts) || actionObj.value) : actionObj.value).split("");
						checkVal(undefined, false, false, isRTL ? valueBuffer.reverse() : valueBuffer);
						if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(this, undefined, getBuffer(), 0, opts);

						if (actionObj.metadata) {
							return {
								value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
								metadata: $el.inputmask("getmetadata")
							};
						}

						return isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
					case "isValid":
						if (opts.numericInput) {
							isRTL = true;
						}
						valueBuffer = actionObj.value.split("");
						checkVal(undefined, false, true, isRTL ? valueBuffer.reverse() : valueBuffer);
						var buffer = getBuffer();
						var rl = determineLastRequiredPosition(),
							lmib = buffer.length - 1;
						for (; lmib > rl; lmib--) {
							if (isMask(lmib)) break;
						}
						buffer.splice(rl, lmib + 1 - rl);

						return isComplete(buffer) && actionObj.value === buffer.join("");
					case "getemptymask":
						el = actionObj.el;
						$el = $(el);
						maskset = el.inputmask.maskset;
						opts = el.inputmask.opts;
						return getBufferTemplate();
					case "remove":
						el = actionObj.el;
						$el = $(el);
						maskset = el.inputmask.maskset;
						opts = el.inputmask.opts;
						//writeout the unmaskedvalue
						el.inputmask._valueSet(unmaskedvalue(el));
						//unbind all events
						$el.off(".inputmask");
						//restore the value property
						var valueProperty;
						if (Object.getOwnPropertyDescriptor) {
							valueProperty = Object.getOwnPropertyDescriptor(el, "value");
						}
						if (valueProperty && valueProperty.get) {
							if (el.inputmask.__valueGet) {
								Object.defineProperty(el, "value", {
									get: el.inputmask.__valueGet,
									set: el.inputmask.__valueSet
								});
							}
						} else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
							if (el.inputmask.__valueGet) {
								el.__defineGetter__("value", el.inputmask.__valueGet);
								el.__defineSetter__("value", el.inputmask.__valueSet);
							}
						}
						//clear data
						el.inputmask = undefined;
						break;
					case "getmetadata":
						el = actionObj.el;
						$el = $(el);
						maskset = el.inputmask.maskset;
						opts = el.inputmask.opts;
						if ($.isArray(maskset.metadata)) {
							//find last alternation
							var alternation, lvp = getLastValidPosition();
							for (var firstAlt = lvp; firstAlt >= 0; firstAlt--) {
								if (getMaskSet().validPositions[firstAlt] && getMaskSet().validPositions[firstAlt].alternation !== undefined) {
									alternation = getMaskSet().validPositions[firstAlt].alternation;
									break;
								}
							}
							if (alternation !== undefined) {
								return maskset.metadata[getMaskSet().validPositions[lvp].locator[alternation]];
							} else return maskset.metadata[0];
						}

						return maskset.metadata;
				}
			}
		}

		//make inputmask available
		window.Inputmask = Inputmask;
		return Inputmask;
	}));

/* =========================================================
 * bootstrap-slider.js v2.0.0
 * http://www.eyecon.ro/bootstrap-slider
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {

	var Slider = function(element, options) {
		this.element = $(element);
		this.picker = $('<div class="slider">'+
							'<div class="slider-track">'+
								'<div class="slider-selection"></div>'+
								'<div class="slider-handle"></div>'+
								'<div class="slider-handle"></div>'+
							'</div>'+
							'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'+
						'</div>')
							.insertBefore(this.element)
							.append(this.element);
		this.id = this.element.data('slider-id')||options.id;
		if (this.id) {
			this.picker[0].id = this.id;
		}

		if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
			this.touchCapable = true;
		}

		var tooltip = this.element.data('slider-tooltip')||options.tooltip;

		this.tooltip = this.picker.find('.tooltip');
		this.tooltipInner = this.tooltip.find('div.tooltip-inner');

		this.orientation = this.element.data('slider-orientation')||options.orientation;
		switch(this.orientation) {
			case 'vertical':
				this.picker.addClass('slider-vertical');
				this.stylePos = 'top';
				this.mousePos = 'pageY';
				this.sizePos = 'offsetHeight';
				this.tooltip.addClass('right')[0].style.left = '100%';
				break;
			default:
				this.picker
					.addClass('slider-horizontal')
					.css('width', this.element.outerWidth());
				this.orientation = 'horizontal';
				this.stylePos = 'left';
				this.mousePos = 'pageX';
				this.sizePos = 'offsetWidth';
				this.tooltip.addClass('top')[0].style.top = -this.tooltip.outerHeight() - 14 + 'px';
				break;
		}

		this.min = this.element.data('slider-min')||options.min;
		this.max = this.element.data('slider-max')||options.max;
		this.step = this.element.data('slider-step')||options.step;
		this.value = this.element.data('slider-value')||options.value;
		if (this.value[1]) {
			this.range = true;
		}

		this.selection = this.element.data('slider-selection')||options.selection;
		this.selectionEl = this.picker.find('.slider-selection');
		if (this.selection === 'none') {
			this.selectionEl.addClass('hide');
		}
		this.selectionElStyle = this.selectionEl[0].style;


		this.handle1 = this.picker.find('.slider-handle:first');
		this.handle1Stype = this.handle1[0].style;
		this.handle2 = this.picker.find('.slider-handle:last');
		this.handle2Stype = this.handle2[0].style;

		var handle = this.element.data('slider-handle')||options.handle;
		switch(handle) {
			case 'round':
				this.handle1.addClass('round');
				this.handle2.addClass('round');
				break
			case 'triangle':
				this.handle1.addClass('triangle');
				this.handle2.addClass('triangle');
				break
		}

		if (this.range) {
			this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
			this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
		} else {
			this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
			this.handle2.addClass('hide');
			if (this.selection == 'after') {
				this.value[1] = this.max;
			} else {
				this.value[1] = this.min;
			}
		}
		this.diff = this.max - this.min;
		this.percentage = [
			(this.value[0]-this.min)*100/this.diff,
			(this.value[1]-this.min)*100/this.diff,
			this.step*100/this.diff
		];

		this.offset = this.picker.offset();
		this.size = this.picker[0][this.sizePos];

		this.formater = options.formater;

		this.layout();

		if (this.touchCapable) {
			// Touch: Bind touch events:
			this.picker.on({
				touchstart: $.proxy(this.mousedown, this)
			});
		} else {
			this.picker.on({
				mousedown: $.proxy(this.mousedown, this)
			});
		}

		if (tooltip === 'show') {
			this.picker.on({
				mouseenter: $.proxy(this.showTooltip, this),
				mouseleave: $.proxy(this.hideTooltip, this)
			});
		} else {
			this.tooltip.addClass('hide');
		}
	};

	Slider.prototype = {
		constructor: Slider,

		over: false,
		inDrag: false,
		
		showTooltip: function(){
			this.tooltip.addClass('in');
			//var left = Math.round(this.percent*this.width);
			//this.tooltip.css('left', left - this.tooltip.outerWidth()/2);
			this.over = true;
		},
		
		hideTooltip: function(){
			if (this.inDrag === false) {
				this.tooltip.removeClass('in');
			}
			this.over = false;
		},

		layout: function(){
			this.handle1Stype[this.stylePos] = this.percentage[0]+'%';
			this.handle2Stype[this.stylePos] = this.percentage[1]+'%';
			if (this.orientation == 'vertical') {
				this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			} else {
				this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			}
			if (this.range) {
				this.tooltipInner.text(
					this.formater(this.value[0]) + 
					' : ' + 
					this.formater(this.value[1])
				);
				this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0])/2)/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			} else {
				this.tooltipInner.text(
					this.formater(this.value[0])
				);
				this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0]/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			}
		},

		mousedown: function(ev) {

			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchstart') {
				ev = ev.originalEvent;
			}

			this.offset = this.picker.offset();
			this.size = this.picker[0][this.sizePos];

			var percentage = this.getPercentage(ev);

			if (this.range) {
				var diff1 = Math.abs(this.percentage[0] - percentage);
				var diff2 = Math.abs(this.percentage[1] - percentage);
				this.dragged = (diff1 < diff2) ? 0 : 1;
			} else {
				this.dragged = 0;
			}

			this.percentage[this.dragged] = percentage;
			this.layout();

			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).on({
					touchmove: $.proxy(this.mousemove, this),
					touchend: $.proxy(this.mouseup, this)
				});
			} else {
				$(document).on({
					mousemove: $.proxy(this.mousemove, this),
					mouseup: $.proxy(this.mouseup, this)
				});
			}

			this.inDrag = true;
			var val = this.calculateValue();
			this.element.trigger({
					type: 'slideStart',
					value: val
				}).trigger({
					type: 'slide',
					value: val
				});
			return false;
		},

		mousemove: function(ev) {
			
			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchmove') {
				ev = ev.originalEvent;
			}

			var percentage = this.getPercentage(ev);
			if (this.range) {
				if (this.dragged === 0 && this.percentage[1] < percentage) {
					this.percentage[0] = this.percentage[1];
					this.dragged = 1;
				} else if (this.dragged === 1 && this.percentage[0] > percentage) {
					this.percentage[1] = this.percentage[0];
					this.dragged = 0;
				}
			}
			this.percentage[this.dragged] = percentage;
			this.layout();
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slide',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		mouseup: function(ev) {
			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).off({
					touchmove: this.mousemove,
					touchend: this.mouseup
				});
			} else {
				$(document).off({
					mousemove: this.mousemove,
					mouseup: this.mouseup
				});
			}

			this.inDrag = false;
			if (this.over == false) {
				this.hideTooltip();
			}
			this.element;
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slideStop',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		calculateValue: function() {
			var val;
			if (this.range) {
				val = [
					(this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step),
					(this.min + Math.round((this.diff * this.percentage[1]/100)/this.step)*this.step)
				];
				this.value = val;
			} else {
				val = (this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step);
				this.value = [val, this.value[1]];
			}
			return val;
		},

		getPercentage: function(ev) {
			if (this.touchCapable) {
				ev = ev.touches[0];
			}
			var percentage = (ev[this.mousePos] - this.offset[this.stylePos])*100/this.size;
			percentage = Math.round(percentage/this.percentage[2])*this.percentage[2];
			return Math.max(0, Math.min(100, percentage));
		},

		getValue: function() {
			if (this.range) {
				return this.value;
			}
			return this.value[0];
		},

		setValue: function(val) {
			this.value = val;

			if (this.range) {
				this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
				this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
			} else {
				this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
				this.handle2.addClass('hide');
				if (this.selection == 'after') {
					this.value[1] = this.max;
				} else {
					this.value[1] = this.min;
				}
			}
			this.diff = this.max - this.min;
			this.percentage = [
				(this.value[0]-this.min)*100/this.diff,
				(this.value[1]-this.min)*100/this.diff,
				this.step*100/this.diff
			];
			this.layout();
		}
	};

	$.fn.slider = function ( option, val ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('slider'),
				options = typeof option === 'object' && option;
			if (!data)  {
				$this.data('slider', (data = new Slider(this, $.extend({}, $.fn.slider.defaults,options))));
			}
			if (typeof option == 'string') {
				data[option](val);
			}
		})
	};

	$.fn.slider.defaults = {
		min: 0,
		max: 10,
		step: 1,
		orientation: 'horizontal',
		value: 5,
		selection: 'before',
		tooltip: 'show',
		handle: 'round',
		formater: function(value) {
			return value;
		}
	};

	$.fn.slider.Constructor = Slider;

}( window.jQuery );
/*
Input Mask plugin extensions
http://github.com/RobinHerbots/jquery.inputmask
Copyright (c) 2010 -  Robin Herbots
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.0-dev
Optional extensions on the jquery.inputmask base
*/
(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["inputmask.dependencyLib", "inputmask"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("./inputmask.dependencyLib.jquery"), require("./inputmask"));
		} else {
			factory(jQuery, window.Inputmask);
		}
	}
	(function($, Inputmask) {
		//number aliases
		Inputmask.extendAliases({
			"numeric": {
				mask: function(opts) {
					function autoEscape(txt) {
						var escapedTxt = "";
						for (var i = 0; i < txt.length; i++) {
							escapedTxt += opts.definitions[txt.charAt(i)] ? "\\" + txt.charAt(i) : txt.charAt(i);
						}
						return escapedTxt;
					}
					if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
						opts.integerDigits = opts.repeat;
					}
					opts.repeat = 0;
					if (opts.groupSeparator === opts.radixPoint) { //treat equal separator and radixpoint
						if (opts.radixPoint === ".") {
							opts.groupSeparator = ",";
						} else if (opts.radixPoint === ",") {
							opts.groupSeparator = ".";
						} else opts.groupSeparator = "";
					}
					if (opts.groupSeparator === " ") { //prevent conflict with default skipOptionalPartCharacter
						opts.skipOptionalPartCharacter = undefined;
					}
					opts.autoGroup = opts.autoGroup && opts.groupSeparator !== "";
					if (opts.autoGroup) {
						if (typeof opts.groupSize == "string" && isFinite(opts.groupSize)) opts.groupSize = parseInt(opts.groupSize);
						if (isFinite(opts.integerDigits)) {
							var seps = Math.floor(opts.integerDigits / opts.groupSize);
							var mod = opts.integerDigits % opts.groupSize;
							opts.integerDigits = parseInt(opts.integerDigits) + (mod === 0 ? seps - 1 : seps);
							if (opts.integerDigits < 1) {
								opts.integerDigits = "*";
							}
						}
					}

					//enforce placeholder to single
					if (opts.placeholder.length > 1) {
						opts.placeholder = opts.placeholder.charAt(0);
					}
					//only allow radixfocus when placeholder = 0
					opts.radixFocus = opts.radixFocus && opts.placeholder !== "" && opts.integerOptional === true;

					opts.definitions[";"] = opts.definitions["~"]; //clone integer def for decimals
					opts.definitions[";"].definitionSymbol = "~";

					if (opts.numericInput === true) { //finance people input style
						opts.radixFocus = false;
						opts.digitsOptional = false;
						if (isNaN(opts.digits)) opts.digits = 2;
						opts.decimalProtect = false;
					}

					var mask = autoEscape(opts.prefix);
					mask += "[+]";
					if (opts.integerOptional === true) {
						mask += "~{1," + opts.integerDigits + "}";
					} else mask += "~{" + opts.integerDigits + "}";
					if (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
						if (opts.digitsOptional) {
							mask += "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]";
						} else mask += (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}";
					}
					if (opts.negationSymbol.back !== "") {
						mask += "[-]";
					}
					mask += autoEscape(opts.suffix);

					opts.greedy = false; //enforce greedy false

					return mask;
				},
				placeholder: "",
				greedy: false,
				digits: "*", //number of fractionalDigits
				digitsOptional: true,
				radixPoint: ".",
				radixFocus: true,
				groupSize: 3,
				groupSeparator: "",
				autoGroup: false,
				allowPlus: true,
				allowMinus: true,
				negationSymbol: {
					front: "-", //"("
					back: "" //")"
				},
				integerDigits: "+", //number of integerDigits
				integerOptional: true,
				prefix: "",
				suffix: "",
				rightAlign: false,
				decimalProtect: true, //do not allow assumption of decimals input without entering the radixpoint
				min: null, //minimum value
				max: null, //maximum value
				step: 1,
				insertMode: true,
				autoUnmask: false,
				unmaskAsNumber: false,
				postFormat: function(buffer, pos, reformatOnly, opts) { //this needs to be removed // this is crap
					// console.log(buffer);
					if (opts.numericInput === true) {
						buffer = buffer.reverse();
						if (isFinite(pos)) {
							pos = buffer.join("").length - pos - 1;
						}
					}
					var suffixStripped = false,
						i, l;
					if (buffer.length >= opts.suffix.length && buffer.join("").indexOf(opts.suffix) === (buffer.length - opts.suffix.length)) {
						buffer.length = buffer.length - opts.suffix.length; //strip suffix
						suffixStripped = true;
					}
					//position overflow corrections
					pos = pos >= buffer.length ? buffer.length - 1 : (pos < opts.prefix.length ? opts.prefix.length : pos);

					var needsRefresh = false,
						charAtPos = buffer[pos];
					if (opts.groupSeparator === "" || (opts.numericInput !== true &&
							($.inArray(opts.radixPoint, buffer) !== -1 && pos > $.inArray(opts.radixPoint, buffer)) ||
							new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]").test(charAtPos))) {
						if (suffixStripped) {
							for (i = 0, l = opts.suffix.length; i < l; i++) {
								buffer.push(opts.suffix.charAt(i));
							}
						}
						//console.log("return input " + buffer);
						return {
							pos: pos
						};
					}

					var cbuf = buffer.slice();
					if (charAtPos === opts.groupSeparator) {
						cbuf.splice(pos--, 1);
						charAtPos = cbuf[pos];
					}
					if (reformatOnly) {
						if (charAtPos !== opts.radixPoint) cbuf[pos] = "?";
					} else cbuf.splice(pos, 0, "?"); //set position indicator
					var bufVal = cbuf.join(""),
						bufValOrigin = bufVal;
					if (bufVal.length > 0 && opts.autoGroup || (reformatOnly && bufVal.indexOf(opts.groupSeparator) !== -1)) {
						var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
						needsRefresh = bufVal.indexOf(opts.groupSeparator) === 0;
						bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
						var radixSplit = bufVal.split(opts.radixPoint);
						bufVal = opts.radixPoint === "" ? bufVal : radixSplit[0];
						if (bufVal !== (opts.prefix + "?0") && bufVal.length >= (opts.groupSize + opts.prefix.length)) {
							//needsRefresh = true;
							var reg = new RegExp("([-\+]?[\\d\?]+)([\\d\?]{" + opts.groupSize + "})");
							while (reg.test(bufVal)) {
								bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2");
								bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
							}
						}
						if (opts.radixPoint !== "" && radixSplit.length > 1) {
							bufVal += opts.radixPoint + radixSplit[1];
						}
					}
					needsRefresh = bufValOrigin !== bufVal;
					buffer.length = bufVal.length; //align the length
					for (i = 0, l = bufVal.length; i < l; i++) {
						buffer[i] = bufVal.charAt(i);
					}
					var newPos = $.inArray("?", buffer);
					if (newPos === -1 && charAtPos === opts.radixPoint) newPos = $.inArray(opts.radixPoint, buffer);
					if (reformatOnly) buffer[newPos] = charAtPos;
					else buffer.splice(newPos, 1);

					if (!needsRefresh && suffixStripped) {
						for (i = 0, l = opts.suffix.length; i < l; i++) {
							buffer.push(opts.suffix.charAt(i));
						}
					}
					// console.log("formatted " + buffer + " refresh " + needsRefresh);
					newPos = (opts.numericInput && isFinite(pos)) ? buffer.join("").length - newPos - 1 : newPos;
					if (opts.numericInput) {
						buffer = buffer.reverse();
						if ($.inArray(opts.radixPoint, buffer) < newPos && (buffer.join("").length - opts.suffix.length) !== newPos) {
							newPos = newPos - 1;
						}
					}
					return {
						pos: newPos,
						"refreshFromBuffer": needsRefresh,
						"buffer": buffer
					};
				},
				onBeforeWrite: function(e, buffer, caretPos, opts) {
					if (e && (e.type === "blur" || e.type === "checkval")) {
						//handle minvalue
						var maskedValue = buffer.join(""),
							processValue = maskedValue.replace(opts.prefix, "");
						processValue = processValue.replace(opts.suffix, "");
						processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
						if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");

						if (isFinite(processValue)) {
							if (isFinite(opts.min) && parseFloat(processValue) < parseFloat(opts.min)) {
								return $.extend(true, {
									"refreshFromBuffer": true,
									"buffer": (opts.prefix + opts.min).split("")
								}, opts.postFormat((opts.prefix + opts.min).split(""), 0, true, opts));
							}
						}
						if (opts.numericInput !== true) {
							var tmpBufSplit = opts.radixPoint !== "" ? buffer.join("").split(opts.radixPoint) : [buffer.join("")],
								matchRslt = tmpBufSplit[0].match(opts.regex.integerPart(opts)),
								matchRsltDigits = tmpBufSplit.length === 2 ? tmpBufSplit[1].match(opts.regex.integerNPart(opts)) : undefined;
							if (matchRslt) {
								if ((matchRslt[0] === opts.negationSymbol.front + "0" || matchRslt[0] === opts.negationSymbol.front || matchRslt[0] === "+") && (matchRsltDigits === undefined || matchRsltDigits[0].match(/^0+$/))) {
									buffer.splice(matchRslt.index, 1);
								}
								var radixPosition = $.inArray(opts.radixPoint, buffer);
								if (radixPosition !== -1) {
									if (isFinite(opts.digits) && !opts.digitsOptional) {
										for (var i = 1; i <= opts.digits; i++) {
											if (buffer[radixPosition + i] === undefined || buffer[radixPosition + i] === opts.placeholder.charAt(0)) {
												buffer[radixPosition + i] = "0";
											}
										}
										return {
											"refreshFromBuffer": maskedValue !== buffer.join(""),
											"buffer": buffer
										};
									} else if (radixPosition === buffer.length - opts.suffix.length - 1) {
										buffer.splice(radixPosition, 1);
										return {
											"refreshFromBuffer": true,
											"buffer": buffer
										};
									}
								}
							}
						}
					}

					if (opts.autoGroup) {
						var rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : caretPos - 1, true, opts);
						rslt.caret = caretPos <= opts.prefix.length ? rslt.pos : rslt.pos + 1;
						return rslt;
					}
				},
				regex: {
					integerPart: function(opts) {
						return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "\+]?\\d+");
					},
					integerNPart: function(opts) {
						return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + "]+");
					}
				},
				signHandler: function(chrs, maskset, pos, strict, opts) {
					if (!strict && (opts.allowMinus && chrs === "-") || (opts.allowPlus && chrs === "+")) {
						var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));

						if (matchRslt && matchRslt[0].length > 0) {
							if (maskset.buffer[matchRslt.index] === (chrs === "-" ? "+" : opts.negationSymbol.front)) {
								if (chrs === "-") {
									if (opts.negationSymbol.back !== "") {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"remove": matchRslt.index,
											"caret": pos,
											"insert": {
												"pos": maskset.buffer.length - opts.suffix.length - 1,
												"c": opts.negationSymbol.back
											}
										};
									} else {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"remove": matchRslt.index,
											"caret": pos
										};
									}
								} else {
									if (opts.negationSymbol.back !== "") {
										return {
											"pos": matchRslt.index,
											"c": "+",
											"remove": [matchRslt.index, maskset.buffer.length - opts.suffix.length - 1],
											"caret": pos
										};
									} else {
										return {
											"pos": matchRslt.index,
											"c": "+",
											"remove": matchRslt.index,
											"caret": pos
										};
									}
								}
							} else if (maskset.buffer[matchRslt.index] === (chrs === "-" ? opts.negationSymbol.front : "+")) {
								if (chrs === "-" && opts.negationSymbol.back !== "") {
									return {
										"remove": [matchRslt.index, maskset.buffer.length - opts.suffix.length - 1],
										"caret": pos - 1
									};
								} else {
									return {
										"remove": matchRslt.index,
										"caret": pos - 1
									};
								}
							} else {
								if (chrs === "-") {
									if (opts.negationSymbol.back !== "") {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"caret": pos + 1,
											"insert": {
												"pos": maskset.buffer.length - opts.suffix.length,
												"c": opts.negationSymbol.back
											}
										};
									} else {
										return {
											"pos": matchRslt.index,
											"c": opts.negationSymbol.front,
											"caret": pos + 1
										};
									}
								} else {
									return {
										"pos": matchRslt.index,
										"c": chrs,
										"caret": pos + 1
									};
								}
							}
						}
					}
					return false;
				},
				radixHandler: function(chrs, maskset, pos, strict, opts) {
					if (!strict) {
						if ($.inArray(chrs, [",", "."]) !== -1) chrs = opts.radixPoint;
						if (chrs === opts.radixPoint && (opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0))) {
							var radixPos = $.inArray(opts.radixPoint, maskset.buffer),
								integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));

							if (radixPos !== -1 && maskset.validPositions[radixPos]) {
								if (maskset.validPositions[radixPos - 1]) {
									return {
										"caret": radixPos + 1
									};
								} else {
									return {
										"pos": integerValue.index,
										c: integerValue[0],
										"caret": radixPos + 1
									};
								}
							} else if (!integerValue || (integerValue["0"] === "0" && (integerValue.index + 1) !== pos)) {
								maskset.buffer[integerValue ? integerValue.index : pos] = "0";
								return {
									"pos": (integerValue ? integerValue.index : pos) + 1,
									c: opts.radixPoint
								};
							}
						}
					}
					return false;
				},
				leadingZeroHandler: function(chrs, maskset, pos, strict, opts) {
					if (opts.numericInput === true) {
						if (maskset.buffer[maskset.buffer.length - opts.prefix.length - 1] === "0") {
							return {
								"pos": pos,
								"remove": maskset.buffer.length - opts.prefix.length - 1
							};
						}
					} else {
						var matchRslt = maskset.buffer.join("").match(opts.regex.integerNPart(opts)),
							radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
						if (matchRslt && !strict && (radixPosition === -1 || pos <= radixPosition)) {
							if (matchRslt["0"].indexOf("0") === 0) {
								if (pos < opts.prefix.length) pos = matchRslt.index; //position
								var _radixPosition = $.inArray(opts.radixPoint, maskset._buffer);
								var digitsMatch = maskset._buffer && maskset.buffer.slice(radixPosition).join("") === maskset._buffer.slice(_radixPosition).join("") || parseInt(maskset.buffer.slice(radixPosition + 1).join("")) === 0;
								var integerMatch = maskset._buffer && maskset.buffer.slice(matchRslt.index, radixPosition).join("") === maskset._buffer.slice(opts.prefix.length, _radixPosition).join("") || maskset.buffer.slice(matchRslt.index, radixPosition).join("") === "0";

								if (radixPosition === -1 || digitsMatch && integerMatch) {
									maskset.buffer.splice(matchRslt.index, 1);
									pos = pos > matchRslt.index ? pos - 1 : matchRslt.index;
									return {
										"pos": pos,
										"remove": matchRslt.index
									};
								} else if (matchRslt.index + 1 === pos || chrs === "0") {
									maskset.buffer.splice(matchRslt.index, 1);
									pos = matchRslt.index;
									return {
										"pos": pos,
										"remove": matchRslt.index
									};
								}
							} else if (chrs === "0" && pos <= matchRslt.index && matchRslt["0"] !== opts.groupSeparator) {
								return false;
							}
						}
					}
					return true;
				},
				postValidation: function(buffer, opts) {
					//handle maxvalue
					var isValid = true,
						maskedValue = buffer.join(""),
						processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
					//handle negation symbol
					processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
					processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue;

					if (isFinite(processValue)) {
						if (opts.max !== null && isFinite(opts.max)) {
							isValid = parseFloat(processValue) <= parseFloat(opts.max);
						}
						if (isValid && opts.min !== null && isFinite(opts.min) && (processValue <= 0 || processValue.toString().length >= opts.min.toString().length)) {
							isValid = parseFloat(processValue) >= parseFloat(opts.min);
							if (!isValid) {
								isValid = $.extend(true, {
									"refreshFromBuffer": true,
									"buffer": (opts.prefix + opts.min).split("")
								}, opts.postFormat((opts.prefix + opts.min).split(""), 0, true, opts));
								isValid.refreshFromBuffer = true; //enforce refresh
							}
						}
					}

					return isValid;
				},
				definitions: {
					"~": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid) {
								isValid = opts.radixHandler(chrs, maskset, pos, strict, opts);
								if (!isValid) {
									isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
									if (isValid === true) {
										isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts);
										if (isValid === true) {
											//handle overwrite when fixed precision
											var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
											if (radixPosition !== -1 && opts.digitsOptional === false && opts.numericInput !== true && pos > radixPosition && !strict) {
												isValid = {
													"pos": pos,
													"remove": pos
												};
											} else {
												isValid = {
													pos: pos
												};
											}
										}
									}
								}
							}

							return isValid;
						},
						cardinality: 1,
						prevalidator: null
					},
					"+": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid && ((strict && opts.allowMinus && chrs === opts.negationSymbol.front) || (opts.allowMinus && chrs === "-") || (opts.allowPlus && chrs === "+"))) {
								if (chrs === "-") {
									if (opts.negationSymbol.back !== "") {
										isValid = {
											"pos": pos,
											"c": chrs === "-" ? opts.negationSymbol.front : "+",
											"caret": pos + 1,
											"insert": {
												"pos": maskset.buffer.length,
												"c": opts.negationSymbol.back
											}
										};
									} else {
										isValid = {
											"pos": pos,
											"c": chrs === "-" ? opts.negationSymbol.front : "+",
											"caret": pos + 1
										};
									}
								} else {
									isValid = true;
								}
							}
							return isValid;
						},
						cardinality: 1,
						prevalidator: null,
						placeholder: ""
					},
					"-": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back) {
								isValid = true;
							}
							return isValid;
						},
						cardinality: 1,
						prevalidator: null,
						placeholder: ""
					},
					":": {
						validator: function(chrs, maskset, pos, strict, opts) {
							var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
							if (!isValid) {
								var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + ",\\." + "]";
								isValid = new RegExp(radix).test(chrs);
								if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
									isValid = {
										"caret": pos + 1
									};
								}
							}
							return isValid ? {
								c: opts.radixPoint
							} : isValid;
						},
						cardinality: 1,
						prevalidator: null,
						placeholder: function(opts) {
							return opts.radixPoint;
						}
					}
				},
				onUnMask: function(maskedValue, unmaskedValue, opts) {
					var processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.unmaskAsNumber) {
						if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
						return Number(processValue);
					}
					return processValue;
				},
				isComplete: function(buffer, opts) {
					var maskedValue = buffer.join(""),
						bufClone = buffer.slice();
					//verify separator positions
					opts.postFormat(bufClone, 0, true, opts);
					if (bufClone.join("") !== maskedValue) return false;

					var processValue = maskedValue.replace(opts.prefix, "");
					processValue = processValue.replace(opts.suffix, "");
					processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
					if (opts.radixPoint === ",") processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
					return isFinite(processValue);
				},
				onBeforeMask: function(initialValue, opts) {
					if (opts.radixPoint !== "" && isFinite(initialValue)) {
						initialValue = initialValue.toString().replace(".", opts.radixPoint);
					} else {
						var kommaMatches = initialValue.match(/,/g);
						var dotMatches = initialValue.match(/\./g);
						if (dotMatches && kommaMatches) {
							if (dotMatches.length > kommaMatches.length) {
								initialValue = initialValue.replace(/\./g, "");
								initialValue = initialValue.replace(",", opts.radixPoint);
							} else if (kommaMatches.length > dotMatches.length) {
								initialValue = initialValue.replace(/,/g, "");
								initialValue = initialValue.replace(".", opts.radixPoint);
							} else { //equal
								initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "");
							}
						} else {
							initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
						}
					}

					if (opts.digits === 0) {
						if (initialValue.indexOf(".") !== -1) {
							initialValue = initialValue.substring(0, initialValue.indexOf("."));
						} else if (initialValue.indexOf(",") !== -1) {
							initialValue = initialValue.substring(0, initialValue.indexOf(","));
						}
					}

					if (opts.radixPoint !== "" && isFinite(opts.digits) && initialValue.indexOf(opts.radixPoint) !== -1) {
						var valueParts = initialValue.split(opts.radixPoint),
							decPart = valueParts[1].match(new RegExp("\\d*"))[0];
						if (parseInt(opts.digits) < decPart.toString().length) {
							var digitsFactor = Math.pow(10, parseInt(opts.digits));
							//make the initialValue a valid javascript number for the parsefloat
							initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
							initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
							initialValue = initialValue.toString().replace(".", opts.radixPoint);
						}
					}
					return initialValue.toString();
				},
				canClearPosition: function(maskset, position, lvp, strict, opts) {
					var positionInput = maskset.validPositions[position].input,
						canClear = ((positionInput !== opts.radixPoint || (maskset.validPositions[position].match.fn !== null && opts.decimalProtect === false)) || isFinite(positionInput)) ||
						position === lvp ||
						positionInput === opts.groupSeparator ||
						positionInput === opts.negationSymbol.front ||
						positionInput === opts.negationSymbol.back;

					if (canClear && isFinite(positionInput)) {
						var matchRslt,
							radixPos = $.inArray(opts.radixPoint, maskset.buffer);

						//inject radixpoint
						var radixInjection = false;
						if (maskset.validPositions[radixPos] === undefined) {
							maskset.validPositions[radixPos] = {
								input: opts.radixPoint
							};
							radixInjection = true;
						}

						if (!strict && maskset.buffer) {
							matchRslt = maskset.buffer.join("").substr(0, position).match(opts.regex.integerNPart(opts));
							var pos = position + 1,
								isNull = matchRslt == null || parseInt(matchRslt["0"].replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "")) === 0;
							if (isNull) {
								while (maskset.validPositions[pos] && (maskset.validPositions[pos].input === opts.groupSeparator || maskset.validPositions[pos].input === "0")) {
									delete maskset.validPositions[pos];
									pos++;
								}
							}
						}

						var buffer = [];
						//build new buffer from validPositions
						for (var vp in maskset.validPositions) {
							if (maskset.validPositions[vp].input !== undefined) buffer.push(maskset.validPositions[vp].input);
						}
						//remove radix Injection
						if (radixInjection) {
							delete maskset.validPositions[radixPos];
						}

						if (radixPos > 0) {
							var bufVal = buffer.join("");
							matchRslt = bufVal.match(opts.regex.integerNPart(opts));
							if (matchRslt && position <= radixPos) {
								if (matchRslt["0"].indexOf("0") === 0) {
									canClear = matchRslt.index !== position || opts.placeholder === "0";
								} else {
									var intPart = parseInt(matchRslt["0"].replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "")),
										radixPart = parseInt(bufVal.split(opts.radixPoint)[1]);
									if (intPart < 10 && maskset.validPositions[position] && (opts.placeholder !== "0" || radixPart > 0)) {
										maskset.validPositions[position].input = "0";
										maskset.p = opts.prefix.length + 1;
										canClear = false;
									}
								}
							}
						}
					}

					return canClear;
				},
				onKeyDown: function(e, buffer, caretPos, opts) {
					var $input = $(this);
					if (e.ctrlKey) {
						switch (e.keyCode) {
							case Inputmask.keyCode.UP:
								$input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
								$input.trigger("setvalue.inputmask");
								break;
							case Inputmask.keyCode.DOWN:
								$input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
								$input.trigger("setvalue.inputmask");
								break;
						}
					}
				}
			},
			"currency": {
				prefix: "$ ",
				groupSeparator: ",",
				alias: "numeric",
				placeholder: "0",
				autoGroup: true,
				digits: 2,
				digitsOptional: false,
				clearMaskOnLostFocus: false
			},
			"decimal": {
				alias: "numeric"
			},
			"integer": {
				alias: "numeric",
				digits: 0,
				radixPoint: ""
			},
			"percentage": {
				alias: "numeric",
				digits: 2,
				radixPoint: ".",
				placeholder: "0",
				autoGroup: false,
				min: 0,
				max: 100,
				suffix: " %",
				allowPlus: false,
				allowMinus: false
			}
		});
		return Inputmask;
	}));

/*
 * Input Mask plugin for jquery
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) 2010 -	Robin Herbots
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 0.0.0-dev
 */

(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jquery", "inputmask"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jquery"), require("./inputmask"));
		} else {
			factory(jQuery, window.Inputmask);
		}
	}
	(function($, Inputmask) {
		if ($.fn.inputmask === undefined) {
			//jquery plugin
			$.fn.inputmask = function(fn, options) {
				var nptmask, input;
				options = options || {};
				if (typeof fn === "string") {
					switch (fn) {
						case "mask":
							nptmask = new Inputmask(options);
							return this.each(function() {
								nptmask.mask(this);
							});
						case "unmaskedvalue":
							input = this.jquery && this.length > 0 ? this[0] : this;
							return input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();
						case "remove":
							return this.each(function() {
								if (this.inputmask) this.inputmask.remove();
							});
						case "getemptymask":
							input = this.jquery && this.length > 0 ? this[0] : this;
							return input.inputmask ? input.inputmask.getemptymask() : "";
						case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
							input = this.jquery && this.length > 0 ? this[0] : this;
							return input.inputmask ? input.inputmask.hasMaskedValue() : false;
						case "isComplete":
							input = this.jquery && this.length > 0 ? this[0] : this;
							return input.inputmask ? input.inputmask.isComplete() : true;
						case "getmetadata": //return mask metadata if exists
							input = this.jquery && this.length > 0 ? this[0] : this;
							return input.inputmask ? input.inputmask.getmetadata() : undefined;
						case "setvalue":
							input = this.jquery && this.length > 0 ? this[0] : this;
							$(input).val(options);
							if (input.inputmask !== undefined) {
								$(input).triggerHandler("setvalue.inputmask");
							}
							break;
						case "option":
							if (typeof options === "string") {
								input = this.jquery && this.length > 0 ? this[0] : this;
								if (input.inputmask !== undefined) {
									return input.inputmask.option(options);
								}
							} else {
								return this.each(function() {
									if (this.inputmask !== undefined) {
										return this.inputmask.option(options);
									}
								});
							}
							break;
						default:
							options.alias = fn;
							nptmask = new Inputmask(options);
							return this.each(function() {
								nptmask.mask(this);
							});
					}
				} else if (typeof fn == "object") {
					nptmask = new Inputmask(fn);
					if (fn.mask === undefined && fn.alias === undefined) {
						return this.each(function() {
							if (this.inputmask !== undefined) {
								return this.inputmask.option(fn);
							} else nptmask.mask(this);
						});
					} else {
						return this.each(function() {
							nptmask.mask(this);
						});
					}
				} else if (fn === undefined) {
					//look for data-inputmask atributes
					return this.each(function() {
						nptmask = new Inputmask(options);
						nptmask.mask(this);
					});
				}
			};
		}
		return $.fn.inputmask;
	}));


function validate() {
		var minValue = $('.slider-money').data('slider-min');
	    var maxValue = $('.slider-money').data('slider-max');
	    var currentValue = ($('.value-money').val()).replace(/[.]/g, '');
	    
	    var minValueMonth = $('.slider-month').data('slider-min');
	    var maxValueMonth = $('.slider-month').data('slider-max');
	    var currentValueMonth = $('.value-month').val();
	    
	    
	    if(currentValue >= minValue && currentValue <= maxValue && currentValueMonth >= minValueMonth   && currentValueMonth <= maxValueMonth ) {
	    	//alert("Importe Valido y meses valido");
	    	$('.alert-money').hide();
	        $('.slider-money').slider('setValue', currentValue, true);
	        $('.slider-money').slider('refresh');
	        
	        $('.alert-month').hide();
	        $('.slider-month').slider('setValue', currentValueMonth, true);
	        $('.slider-month').slider('refresh');
	        
	        return true;	       
	      }else if ((currentValue >= minValue && currentValue <= maxValue && currentValueMonth < minValueMonth) || (currentValue >= minValue && currentValue <= maxValue && currentValueMonth > maxValueMonth) )
	       {
	    	  //alert("Importe Valido y meses no valido");
	    	  $('.alert-money').hide();
	    	  $('.slider-money').slider('setValue', currentValue, true);
	    	  $('.alert-month').show();
		        return false;
	     }
	      else if ( (currentValue < minValue  && currentValueMonth >= minValueMonth   && currentValueMonth <= maxValueMonth) || (currentValue > maxValue  && currentValueMonth >= minValueMonth  && currentValueMonth <= maxValueMonth) )
	    	  {
	    	  //alert(" Meses  valido e Importe no Valido");
	    	  $('.alert-month').hide();
	    	  $('.slider-month').slider('setValue', currentValueMonth, true);
	    	  $('.alert-money').show();
	    	  return false;
	    	  }
	    else {
	    	//alert("Ni meses ni importe valido");
	        $('.alert-money').show();
	        $('.alert-month').show();
	         return false;
	      }
	    };
	    

function initForm() {
"use strict";
    
	//Init Redeem controllers
	Redeem.initControllers();
	
	//Permito máscaras en inputs con data-inputmask="..."
	if (!isIE(8, 'lte')) {
	    $(":input").inputmask();
	}

    // Sliders
    $(".slider-money, .slider-month").slider();

    $(".slider-money").on("slide", function(slideEvt) {
      $(".value-money").val(slideEvt.value);
    });
    $(".slider-money").on("slideStop", function(slideEvt) {
      $('.alert-money').hide();
    });

    $(".slider-month").on("slide", function(slideEvt) {
      $(".value-month").val(slideEvt.value);
    });
    $(".slider-month").on("slideStop", function(slideEvt) {
      $('.alert-month').hide();
    });
    
   $('.value-money').on({
    		keyup: function(e) {
        	if (e.keyCode == 13) {
        	      var minValue = $('.slider-money').data('slider-min');
        	      var maxValue = $('.slider-money').data('slider-max');
        	      var currentValue = (this.value).replace(/[.]/g, '');
        	      if(currentValue >= minValue && currentValue <= maxValue) {
        	        $('.alert-money').hide();
        	        $('.slider-money').slider('setValue', currentValue, true);
        	        $('.slider-money').slider('refresh');
        	      } else {
        	        $('.alert-money').show();
        	      }
        	 }
        }
    });
    
    	$('.value-month').on({
    	keyup: function(e) {
        	if (e.keyCode == 13) {
        	      var minValue = $('.slider-month').data('slider-min');
        	      var maxValue = $('.slider-month').data('slider-max');
        	      var currentValue = this.value;
        	      if(currentValue >= minValue && currentValue <= maxValue) {
        	        $('.alert-month').hide();
        	        $('.slider-month').slider('setValue', currentValue, true);
        	        $('.slider-month').slider('refresh');
        	      } else {
        	        $('.alert-month').show();
        	      }
        	}
        }
    });
	

  
	
    
//    //Editar el nombre del prestamo en la vista detalle
//    $('.edit-prestamo').on('click', function() {
//      //Elementos del DOM 
//      alert("hola maria esto esto NO es tuyo");
//      var $text = $(this).siblings('.info').find('p.name');
//      var $input = $(this).siblings('.info').find('input');
//      var $icon = $(this).find('i');
//
//      //Asignamos el valor a los elementos del DOM
//      if($text.is(':visible')) {
//        $input.val($text.text());
//        $icon.addClass('fa-check-circle fa-2x').removeClass('fa-edit');
//        $(this).siblings('.info').removeClass('mgt-5');
//      } else {
//        $text.text($input.val());
//        $icon.addClass('fa-edit').removeClass('fa-check-circle fa-2x');
//        $(this).siblings('.info').addClass('mgt-5').triger();
//      }
//
//      //Ocultamos o mostramos los elementos del DOM
//      $text.toggle();
//      $input.toggle();
//    });

	
    //Guardar el nombre del prestamo en el paso 3
	
	$("input[id$='savePrestamo']").on('click', function() {
      var value = $(this).siblings('input').val();
      if(value != ''){
    	  $('.final-prestamo h3').html(value)   
    	  $(this).parent().hide();
    	  $(this).parent().siblings().show();
      }else{
    	  $('#nombreError').removeClass('hidden');
      }
    });
}

//FUNCTIONS
function initValues(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	$('#step1_btn_hidden').click();
            break;
    }
}

function goStep4Partial(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	var htmlError = $('#partialAmortizationMessage').html();
        	if (!htmlError || htmlError.length == 0) {
        		initForm();
        		$('#errorOtpPrestamosParcial').addClass('hidden');
        		$('#step3_partial_btn_hidden').click();
        	} else {
        		$('#errorOtpPrestamosParcial').removeClass('hidden');
        	}
            break;
    }
}

function goStep3Total(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	var htmlError = $('#totalAmortizationMessage').html();
        	if (!htmlError || htmlError.length == 0) {
        		initForm();
        		$('#errorOtpPrestamosTotal').addClass('hidden');
        		$('#step2_total_btn_hidden').click();
        	} else {
        		$('#errorOtpPrestamosTotal').removeClass('hidden');
        	}
            break;
    }
}

function recalcularSimulacion(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	$('#boton_recalcular').click();
            break;
    }
}

function confirmSMSPartial(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
        	
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	$('#step3_partial_btn_hidden').click();
            break;
    }
}

function eraseCodeSms(e) {
	$('#input_code_partial').val('');
	$('#input_code_total').val('');
}

function slideUpDown(container) {
  if (container.hasClass("slideup")) {
    container.removeClass("slideup").addClass("slidedown");
  } else {
    container.removeClass("slidedown").addClass("slideup");
  }
}

function reverseClass(element, classA, classB) {
  if ($(element).hasClass(classA)) {
    $(element).removeClass(classA).addClass(classB);
  } else {
    $(element).removeClass(classB).addClass(classA);
  }
}

function stringToInt(string) {
    var value = string.split('.').join('');
    if (value === '') value = '0';
    return parseInt(value);
}

function numberWithThousandsSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function intToDecimal(i) {
    if (i === undefined) {
        i = '00';
    }
    var s = i.toString();
    if (s.length > 2)
        s = s.substring(0, 2);
    else if (s.length < 2)
        s = s + '0';
    return s;
}



function whichTransitionEvent(el){
  var t;

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

function isIE(version, comparison) {
	var cc      = 'IE',
	    b       = document.createElement('B'),
	    docElem = document.documentElement,
	    isIE;

	if(version){
		cc += ' ' + version;
		if(comparison){ cc = comparison + ' ' + cc; }
	}

	b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('iecctest');
	docElem.removeChild(b);
	return isIE;
}

function recalcularPrestamo(e) {
	var status = e.status;
	
	switch (status) {
    case "begin": // Before the ajax request is sent.
    	
        break;

    case "complete": // After the ajax response is arrived.
    	
        break;

    case "success": // After update of HTML DOM based on ajax response..
    	
        break;
	}
}

var Redeem = (function() {

    var $root, $redeem_container, $step1, $step2_partial, $step3_partial, $step4_partial, $steps_slider,
        $step2_total, $step3_total;


    var root_name  = '.redeem-steps-container',
        steps_slider_name = '.steps-slider',
        step1_name = '.step1',
        step2_partial_name = '.step2-partial',
        step3_partial_name = '.step3-partial',
        step4_partial_name = '.step4-partial',
        step2_total_name   = '.step2-total',
        step3_total_name   = '.step3-total';



    // Step3 partial variables
    var headers = {
        monthly: 'Amortización parcial con reducción de cuotas',
        instalment: 'Amortización parcial con reducción de plazo'
    };


    var is_changing_monthly = true;   // If true, is changing the monthly cuota; in other case is changing the instalment


    // Functions
    function slideElement($element, $next_element) {
        var slider_left, left_to_apply, width;

        $next_element.removeClass('hidden');
        width = $steps_slider.outerWidth() + $next_element.outerWidth();
        $steps_slider.css('width', width + 'px');

        slider_left = $steps_slider.css('left').split('px')[0];
        left_to_apply = (slider_left - $element.outerWidth()) + 'px';

        $steps_slider.animate({
            left: left_to_apply
        }, 250);
    }
    
 // Functions
    function slideBackElement($element, $back_element) {
        var slider_left, left_to_apply, width;

//        $next_element.removeClass('hidden');
//        width = $steps_slider.outerWidth() + $next_element.outerWidth();
//        $steps_slider.css('width', width + 'px');
//
//        slider_left = $steps_slider.css('left').split('px')[0];
        left_to_apply = '+=' + $element.outerWidth() + 'px';

        $steps_slider.animate({
            left: left_to_apply
        }, 250);
    }


    function resetSteps() {
        var $steps = $steps_slider.children('div'),
            pending_init  = $redeem_container.find('#pending_init').val().split(','),
            returned_init = stringToInt( $redeem_container.find('#returned_init').val() ),
            left_to_apply;

        $steps.addClass('hidden').first().removeClass('hidden');
        $steps_slider.css('width', $steps.first().outerWidth()+'px');
        $steps_slider.css('left', 0);
        changeRedeemTexts(stringToInt(pending_init[0]), pending_init[1], returned_init);
        resetMonthlyCuota();
        resetInstalments();
    }


    function resetMonthlyCuota() {
        var next_cuota_init = $redeem_container.find('#next_cuota_init').val();
        changeMonthlyCuotaText(next_cuota_init);
    }


    function resetInstalments() {
        var cuotas_count_init = $redeem_container.find('#cuotas_count_init').val();
        changeInstalmentText(cuotas_count_init);
    }


    function toogleCheckbox($this_check, $checkA, $checkB, containerClass) {
        if ($this_check != null) {
			var $containerA = $checkA.closest(containerClass), $containerB = $checkB
					.closest(containerClass);
			//        $checkA.prop('checked', false);
			$checkA.removeAttr('checked');
			$containerA.removeClass('checked');
			//        $checkB.prop('checked', false);
			$checkB.removeAttr('checked');
			$containerB.removeClass('checked');
			$this_check.attr('checked');
			$this_check.prop('checked', true);
			$this_check.closest(containerClass).addClass('checked');
			$this_check.closest(containerClass).find('.check_objeto').click();
		}
    }


    // Changes the text and animates the progress bar in function of the float value
    function changeRedeemValues(value_float, new_cuota_value, new_months_value) {
        var $pending, pending_float, returned_float, returned_value, pending_value, pending_init, returned_init;

        pending_init  = $redeem_container.find('#pending_init').val().split(',');
        returned_init = $redeem_container.find('#returned_init').val().split(',');

        // pending money
        pending_float = parseFloat( stringToInt(pending_init[0]) + '.' + pending_init[1] );
        pending_value = pending_float - value_float;
        pending_value = pending_value.toString().split('.');

        // returned money
        returned_float = parseFloat( stringToInt(returned_init[0]) + '.' + returned_init[1] );
        returned_value = parseFloat( returned_float + value_float ).toFixed(2);

        changeRedeemTexts(pending_value[0], pending_value[1], returned_value);

        if (is_changing_monthly) {
            resetInstalments();
            changeMonthlyCuotaText(new_cuota_value);
        }
        else {
            resetMonthlyCuota();
            changeInstalmentText(new_months_value);
        }
    }


    // Change pending and returned redeem texts and updates the progress bar
    function changeRedeemTexts(pending_number_value, pending_decimal_value, returned_value) {
        var $pending          = $('.detail .pending .pending-value'),
            $pending_number   = $pending.find('.number'),
            $pending_decimal  = $pending.find('.decimal-medium'),
            $returned_number_integer  = $('.values-progress-bar .pull-right .value .number'),
            $returned_number_decimal  = $('.values-progress-bar .pull-right .value .symbol-small'),
            returned_total    = $('.values-progress-bar .pull-left .value .number').text(),
            $returned_bar     = $('#returned_bar .progress-bar'),
            new_progress;

        $pending_number.text( numberWithThousandsSeparator(parseInt(pending_number_value)) );
        $pending_decimal.text( ',' + intToDecimal(pending_decimal_value) );
        $returned_number_integer.text( numberWithThousandsSeparator(Math.floor( returned_value )) );
        var returned_value_array = returned_value.toString().split('.');
        if (returned_value_array.length == 1) {
        	$returned_number_decimal.text(',00\u20AC');
        } else {
        	var decimales = returned_value_array[1];
        	if (decimales.length == 1) {
        		$returned_number_decimal.text(',' + decimales + '0\u20AC');
        	} else {
        		$returned_number_decimal.text(',' + decimales + '\u20AC');
        	}
        }
//        $returned_number_decimal.text(',' + returned_value.toString().split());

        new_progress  = ( returned_value / stringToInt(returned_total) ) * 100;
        $returned_bar.attr('aria-valuenow', new_progress).css('width', new_progress + '%');
    }


    function changeMonthlyCuotaText(value) {
    	var value_split = value.replace('.', ',').split(',');
        var $next_cuota_integer     = $('.info-general .next-cuota');
        var $next_cuota_decimal     = $('.info-general .number-tiny');
        $next_cuota_integer.text(value_split[0]);
        $next_cuota_decimal.text(',' + value_split[1]);
    }


    function changeInstalmentText(new_months_value) {
        var $pending_months   = $('.pending-months'),
            total_months      = $('.values-progress-bar.months .pull-left .value').text(),
            $months_count     = $('.values-progress-bar.months .pull-right .value'),
            $month_bar        = $('#month_bar .progress-bar'),
            new_progress;

        $months_count.text(new_months_value);
        $pending_months.text( total_months - new_months_value );

        new_progress  = ( new_months_value / total_months ) * 100;
        $month_bar.attr('aria-valuenow', new_progress).css('width', new_progress + '%');
    }


    function initStep2Partial() {
        var init_value    = $step2_partial.find('.modify-partial .init-value').val(),
            $label_input  = $step2_partial.find('.label-input'),
            $input_redeem = $step2_partial.find('.modify-partial .input-partial-redeem'),
            $monthly_checkbox = $step2_partial.find('#monthly_checkbox'),
            $instalments_checkbox = $step2_partial.find('#instalments_checkbox'),
            value = init_value.split(','),
            value_float   = parseFloat( stringToInt(value[0]) + '.' + value[1] ),
            new_cuota_value  = $('#next_cuota_new').val(),
            new_months_value = $('#cuotas_count_new').val(),
			pending = $redeem_container.find('#pending_init').val(),
			total_amount = $redeem_container.find('#total_amount').val(),
			total_amount_init = total_amount.split(','),
			total_amount_float = parseFloat( stringToInt(total_amount_init[0]) + '.' + total_amount_init[1] ),
            pending_init  = pending.split(','),
            pending_float = parseFloat( stringToInt(pending_init[0]) + '.' + pending_init[1] );
        
        var cantidad_maxima = pending_float > total_amount_float ? total_amount_float : pending_float;

        $label_input.find('.value').text(value[0]);
        $label_input.find('.decimal').text(value[1]);
        if (value_float > cantidad_maxima) {
        	value_float = cantidad_maxima;
			$step2_partial.find('.modify-partial .init-value').val(pending);
			$step2_partial.find('.modify-partial .number-small').html(pending_init[0]);
			$step2_partial.find('.modify-partial .decimal').html(pending_init[1]);
        }
        $input_redeem.val(value_float.toString().replace('.', ','));
        
        $input_redeem.focus();
        is_changing_monthly = true;
        changeRedeemValues(value_float, new_cuota_value, new_months_value);
        //toogleCheckbox($monthly_checkbox, $monthly_checkbox, $instalments_checkbox, $('.check-container'));
        $step2_partial.find('select').addClass('hidden');
    }


    function initStep3Partial() {
        var value      = $step2_partial.find('.input-partial-redeem').val().split(','),
            $number    = $step3_partial.find('.number'),
            $decimal   = $step3_partial.find('.decimal'),
            $header    = $step3_partial.find('h4 .highlighted-two'),
            $principal = $step3_partial.find('.principal'),
            $secondary = $step3_partial.find('.secondary'),
            $terciary  = $step3_partial.find('.terciary');

        $number.text(value[0]);
        $decimal.text(',' + value[1]);

//        if (is_changing_monthly) {
//            $header.text(headers.monthly);
//            $principal.text('Cuota de 120€ (antes 208€)');
//            $secondary.text('Quedan 14 cuotas');
//        }
//        else {
//            $header.text(headers.instalment);
//            $principal.text('Quedan 5 cuotas / Fecha Fin 12-12-16');
//            $secondary.text('(antes 14 Cuotas / Fecha Fin 12-02-16)');
//            $terciary.text('Cuota 208€ / Mes')
//        }
    }


    function initStep4Partial() {
        var value      = $step2_partial.find('.input-partial-redeem').val().split(','),
            $redeem    = $step4_partial.find('.redeem-value');

            $redeem.text(value[0] + '€');
    }



    // JQUERY CONTROLLERS
    function initControllers() {

        $root = $(root_name);
        $redeem_container = $root;
        $steps_slider  = $root.find(steps_slider_name);
        $step1 = $root.find(step1_name);
        $step2_partial = $root.find(step2_partial_name);
        $step3_partial = $root.find(step3_partial_name);
        $step4_partial = $root.find(step4_partial_name);
        $step2_total   = $root.find(step2_total_name);
        $step3_total   = $root.find(step3_total_name);


        // open/close redeem steps panel
        $('#open_redeem').on('click', function() {
            var $parcial = $step1.find('#partial_checkbox'),
                $total   = $step1.find('#total_checkbox');

            if($redeem_container.hasClass('slideup')) {
                slideUpDown($redeem_container);
                $redeem_container.slideDown(450);
            }
            $(this).blur();
        });

        $redeem_container.find('.close-container i').on('click', function() {
            if($redeem_container.hasClass('slidedown')) {
                slideUpDown($redeem_container);
                $redeem_container.slideUp(450, function() {
                    resetSteps();
                })

            }
        });



        // Step 1
        $step1.find('.check-container').on('click', function() {
            var $check   = $(this).find('input'),
                $parcial = $step1.find('#partial_checkbox'),
                $total   = $step1.find('#total_checkbox');

            toogleCheckbox($check, $parcial, $total, '.col-xs-4');
        });

//        $step1.find('#step1_btn').click(function() {
//            var $next_step;
//            if($('#partial_checkbox').prop('checked')) {
//                $next_step = $step2_partial;
//                initStep2Partial();
//            }
//            else
//                $next_step = $step2_total;
//
//            slideElement($step1, $next_step);
//        });
        
        $step1.find('#step1_btn_hidden').click(function() {
            var $next_step;
            if($('#partial_checkbox').prop('checked')) {
                $next_step = $step2_partial;
                initStep2Partial();
            }
            else
                $next_step = $step2_total;

            slideElement($step1, $next_step);
        });


        // Step2 partial
        // //////////////////////////

        // Show input when label is clicked
        $step2_partial.find('.label-input').on('click', function() {
            $step2_partial.find('.input-partial-redeem').show().focus();
        });

        // Change redeem values
        $step2_partial.find('.input-partial-redeem')
        .on('propertychange input', function() {
            var value_float,
                pending_init  = $redeem_container.find('#pending_init').val().split(','),
                pending_float = parseFloat( stringToInt(pending_init[0]) + '.' + pending_init[1] ),
                total_amount = $redeem_container.find('#total_amount').val().split(','),
                total_amount_float = parseFloat( stringToInt(total_amount[0]) + '.' + total_amount[1] ),
                value         = $(this).val().split(','),
                new_cuota_value  = 120,
                new_months_value = 19;
            
            var cantidad_maxima = pending_float > total_amount_float ? total_amount_float : pending_float;

            if( value.length < 2 )
                value.push('00');
            value_float = parseFloat( stringToInt(value[0]) + '.' + value[1] );

            if (value_float > cantidad_maxima) {
                value_float = cantidad_maxima;
                $(this).val( value_float.toString().replace('.', ',') );
            }

//            changeRedeemValues(value_float, new_cuota_value, new_months_value);
        })
        .on('blur', function() {
        	 var $pending, $returned, value, value_float, pending_float, pending_value;
        	 
        	 var cantidad_minima = $redeem_container.find('#cantidad_minima_amortizar').val(),
             cantidad_minima_float = parseFloat(cantidad_minima);
			
			 value = $(this).val().split(',');
			 value_float = parseFloat( stringToInt(value[0]) + '.' + value[1] );
			 value_float = value_float < cantidad_minima_float ? cantidad_minima_float : value_float;
			 value = value_float.toString().split('.');
			 if (value.length == 1) {
				 value.push('00');
			 } else if (value[1].length == 1) {
				 value[1] = value[1] + '0';
			 }
			 
			 $(this).val(value[0] + ',' + value[1]);
			 $(this).change();
			 
			 $label_input = $(this).closest('.modify-partial').find('.label-input');
			 $label_input.find('.value').text(value[0]);
			 $label_input.find('.decimal').text(value[1]);
			 $(this).hide();
			 $label_input.show();
        })
        .on('focus', function() {
           var $labelInput, value;

           $labelInput = $(this).closest('.modify-partial').find('.label-input');
           value       = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
           $labelInput.hide();
           $(this).val(value);
        })
        .on('keyup', function(event) {
        	if (event.which == 13) {
        		$(this).blur();
//                changeEditButton($(this), true);
            }
        });
        
        $('#iconoEditarCantidad').click(function(){
        	$(this).closest('.modify-partial').find('.input-partial-redeem').show().focus();
        });
        
//        $step2_partial.find('.input-partial-redeem')
//        .on('propertychange input', function() {
//            var value_float,
//                pending_init  = $redeem_container.find('#pending_init').val().split(','),
//                pending_float = parseFloat( stringToInt(pending_init[0]) + '.' + pending_init[1] ),
//                value         = $(this).val().split(','),
//                new_cuota_value  = 120,
//                new_months_value = 19;
//
//            if( value.length < 2 )
//                value.push('00');
//            value_float = parseFloat( stringToInt(value[0]) + '.' + value[1] );
//
//            if (value_float > pending_float) {
//                value_float = pending_float;
//                $(this).val( value_float.toString().replace('.', ',') );
//            }
//
//            changeRedeemValues(value_float, new_cuota_value, new_months_value);
//        })
//        .on('blur', function() {
//           var $pending, $returned, value, value_float, pending_float, pending_value;
//
//           value = $(this).val().split(',');
//           $label_input = $(this).closest('.modify-partial').find('.label-input');
//           $label_input.find('.value').text(value[0]);
//           $label_input.find('.decimal').text(value[1]);
//           $(this).hide();
//           $label_input.show();
//        })
//        .on('focus', function() {
//           var $labelInput, value;
//
//           $labelInput = $(this).closest('.modify-partial').find('.label-input')
//           value       = $labelInput.find('.value').text() + ',' + $labelInput.find('.decimal').text();
//           $labelInput.hide();
//           $(this).val(value);
//        })


        // Toogle checkbox
        $step2_partial.find('.check-container').on('click', function() {
            var $check       = $(this).find('input'),
                $monthly     = $step2_partial.find('#monthly_checkbox'),
                $instalments = $step2_partial.find('#instalments_checkbox'),
                value        = $step2_partial.find('.input-partial-redeem').val().split(','),
                new_cuota_value  = 120,
                new_months_value = 19,
                value_float;

            if ($check[0] === $monthly[0]) is_changing_monthly = true;
            else                    is_changing_monthly = false;

            value_float = parseFloat( stringToInt(value[0]) + '.' + value[1] );
            //changeRedeemValues(value_float, new_cuota_value, new_months_value);

            toogleCheckbox($check, $monthly, $instalments, '.check-container');
        });


        // Change to step 3
        $step2_partial.find('#step2_partial_btn').on('click', function() {
            if($('#monthly_checkbox').prop('checked'))
                initStep3Partial(true);
            else
                initStep3Partial(false);

            slideElement($step2_partial, $step3_partial);
        });
        
        //Back to step1 from step2 partial
        $step2_partial.find('#step2_partial_btn_back').on('click', function() {
        	slideBackElement($step2_partial, $step1);
        });


        // Step 3 partial
        // ///////////////////

        // Change to step 4
        $step3_partial.find('#step3_partial_btn_hidden').on('click', function() {
            initStep4Partial();
            slideElement($step3_partial, $step4_partial);
        });

        //Back to step2 from step3 partial
        $step3_partial.find('#step3_partial_btn_back').on('click', function() {
            slideBackElement($step3_partial, $step2_partial);
        });


        // Step 2 total
        // //////////////////
        $step2_total.find('#step2_total_btn_hidden').on('click', function() {
            slideElement($step2_total, $step3_total);
        });
        
      //Back to step1 from step2 total
        $step2_total.find('#step2_total_btn_back').on('click', function() {
        	slideBackElement($step2_total, $step1);
        });
        
        $('#boton_recalcular').on('click', function() {
        	var value        = $('.input-partial-redeem').val().split(','),
            new_cuota_value  = $('#next_cuota_new').val(),
            new_months_value = $('#cuotas_count_new').val(),
            value_float;

        	new_cuota_value = new_cuota_value.replace(".", ",");
        	value_float = parseFloat( stringToInt(value[0]) + '.' + value[1] );
        
        	changeRedeemValues(value_float, new_cuota_value, new_months_value);
        });

    }

    return {
        initControllers: initControllers
    }


}());

$(document).ready(function () {
	initForm();
});

function initFormCallback(e) {
	var status = e.status; // Can be "begin", "complete" or "success".

    switch (status) {
        case "begin": // Before the ajax request is sent.
            break;

        case "complete": // After the ajax response is arrived.
        	
            break;

        case "success": // After update of HTML DOM based on ajax response..
        	$('#input_code_partial').val('');
        	$('#input_code_total').val('');
        	initForm();
            break;
    }
}