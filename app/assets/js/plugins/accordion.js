$.Accordion 				= function( options, element ) {

		this.$el			= $( element );
		// list items
		this.$items			= this.$el.children('ul').children('li');
		// total number of items
		this.itemsCount		= this.$items.length;

		// initialize accordion
		this._init( options );

};

$.Accordion.defaults 		= {
	// index of opened item. -1 means all are closed by default.
	open			: -1,
	// if set to true, only one item can be opened.
	// Once one item is opened, any other that is
	// opened will be closed first
	oneOpenedItem	: false,
	// speed of the open / close item animation
	speed			: 450,
	// easing of the open / close item animation
	easing			: 'easeInOutExpo',
	// speed of the scroll to action animation
	scrollSpeed		: 900,
	// easing of the scroll to action animation
	scrollEasing	: 'easeInOutExpo'
};

$.Accordion.prototype 		= {
  _init 				: function( options ) {

  		this.options 		= $.extend( true, {}, $.Accordion.defaults, options );

  		// validate options
  		this._validate();

  		// current is the index of the opened item
  		this.current		= this.options.open;

  		// hide the contents so we can fade it in afterwards
  		this.$items.find('div.st-content').hide();

  		// save original height and top of each item
  		this._saveDimValues();

  		// if we want a default opened item...
  		if( this.current != -1 )
  			this._toggleItem( this.$items.eq( this.current ) );

  		// initialize the events
  		this._initEvents();

  	},


  _toggleItem			: function( $item ) {

  	var $content = $item.find('div.st-content');

  	( $item.hasClass( 'st-open' ) )

  		? ( this.current = -1, $content.stop(true, true).fadeOut( this.options.speed ), $item.removeClass( 'st-open' ).stop().animate({
  			height	: $item.data( 'originalHeight' )
  		}, this.options.speed, this.options.easing ) )

  		: ( this.current = $item.index(), $content.stop(true, true).fadeIn( this.options.speed ), $item.addClass( 'st-open' ).stop().animate({
  			height	: $item.data( 'originalHeight' ) + $content.outerHeight( true )
  		}, this.options.speed, this.options.easing ), this._scroll( this ) )

  },


  _initEvents			: function() {

  	var instance	= this;

  	// open / close item
  	this.$items.find('.header-accordion').bind('click.accordion', function( event ) {

  		var $item			= $(this).parent();

  		// close any opened item if oneOpenedItem is true
  		if( instance.options.oneOpenedItem && instance._isOpened() && instance.current!== $item.index() ) {

  			instance._toggleItem( instance.$items.eq( instance.current ) );

  		}

  		// open / close item
  		instance._toggleItem( $item );

  		return false;

  	});

  	$(window).bind('smartresize.accordion', function( event ) {

  		// reset original item values
  		instance._saveDimValues();

  		// reset the content's height of any item that is currently opened
  		instance.$el.find('li.st-open').each( function() {

  			var $this	= $(this);
  			$this.css( 'height', $this.data( 'originalHeight' ) + $this.find('div.st-content').outerHeight( true ) );

  		});

  		// scroll to current
  		if( instance._isOpened() )
  		instance._scroll();

  	});

  }
};
