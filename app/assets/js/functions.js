

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
