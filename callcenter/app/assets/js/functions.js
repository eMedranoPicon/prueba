

// FUNCTIONS
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
    return parseInt(value);
}

function numberWithThousandsSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function setMinMaxInput($input, min, max) {
    var value;

    $input.on('input', function() {
        value = parseInt($(this).val());
        $(this).val(value);

        if (isNaN(value)) {
            $(this).val('');
        }
        else if (value > max)
        {
            $(this).val(max);
        }
        else if ( value < min)
        {
            $(this).val(min);
        }
    });
}
