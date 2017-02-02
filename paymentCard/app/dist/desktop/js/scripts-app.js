$(document).ready(function () {
    "use strict";
    $("input").focus(function() {
        var input = $(this);
        var id = input.attr("id");
        var label = $("label[for=\""+id+"\"]");
        label.addClass("active");
    });
    $("input").blur(function() {
        var input = $(this);
        var id = input.attr("id");
        var label = $("label[for=\""+id+"\"]");
        label.removeClass("active");
    });
});
