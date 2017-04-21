function sentinelMonetaryAmountWithMaxLeng9(dataValue) {
	var lenMax = 9;
	var counterDecimalSeparador = 0;
	var dataResult = "";
	var lenDataValue = dataValue.length;
	var c = 0;
	for ( var i = 0; i < lenDataValue; i++) {
		c = dataValue.charAt(i).charCodeAt(0);
		if (c != 48 && c != 49 && c != 50 && c != 51 && c != 52 && c != 53
				&& c != 54 && c != 55 && c != 56 && c != 57 && c != 44) {
			flagIsNumeric = 1;
		} else {
			if (c == 44) {
				counterDecimalSeparador = counterDecimalSeparador + 1;
				if (counterDecimalSeparador > 1) {
					flagIsNumeric = 1;
				} else {
					dataResult = dataResult + dataValue.charAt(i);
				}
			} else {
				dataResult = dataResult + dataValue.charAt(i);
			}
		}
		if (c == 44) {
			counterDecimalSeparador = counterDecimalSeparador + 1;
		}
	}
	// comprobamos que solo hay dos decimales despues del separador decimal
	var positionComa = dataResult.indexOf(',');
	var len = dataResult.length;
	if (positionComa > -1) {
		if (len > positionComa + 3) {
			dataResult = dataResult.substring(0, positionComa + 3);
		}
	}
	// si el primer caracter es la coma pongo por delante un 0
	if (dataResult.charAt(0).charCodeAt(0) == 44) {
		dataResult = "0" + dataResult;
	}
	if (len > lenMax) {
		dataResult = dataResult.substring(0, lenMax);
	}
	return dataResult;

}

function sentinelLengBetweenMinAndMax(dataValue, min, max) {
	var dataResult = "KO";
	if (dataValue == null) {
		dataResult = "KO";
	} else {
		if (dataValue == "") {
			if (min > 0) {
				dataResult = "KO";
			} else {
				if (dataValue.length >= min && dataValue.length <= max) {
					dataResult = "OK";
				} else {
					dataResult = "KO";
				}
			}
		} else {
			if (dataValue.length >= min && dataValue.length <= max) {
				dataResult = "OK";
			} else {
				dataResult = "KO";
			}
		}
	}
	return dataResult;
}
