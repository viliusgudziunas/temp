var titles = document.getElementById("titles");
var popup = document.getElementById("myPopup");

// titles.addEventListener("mouseup", function() {
//     var request = new XMLHttpRequest();
//     var data;

//     request.open("GET", "../static/main.json");
//     request.onload = function() {
//         data = JSON.parse(request.responseText);
//         renderHTML(data);
//     };
//     request.send();
// });

// function renderHTML(data) {
//     var selection = getSelected();
//     var htmlString = "<p>No definition available</p>";

//     for (i = 0; i < data.length; i++) {
//         if (selection == data[i].term) {
//             htmlString = "<p>" + data[i].definition + "</p>"
//         };
//     };
//     popup.innerHTML = htmlString;
//     popup.classList.toggle("show");
// };

function getSelected() {
    var selection;

    if (window.getSelection) {
        return window.getSelection();
    } else if (document.selection) {
        return document.selection.createRange();
    } else {
        selection = document.selection && document.selection.createRange();
        if (selection.text) {
            return selection.text;
        };
        return false;
    };
    return false;
};

// Create sniffer
$(document).ready(function() {
    var selection;

    $("#titles").mouseup(function(event) {
        selection = getSelected();
        selection = $.trim(selection);
        if (selection != "") {
            $("span.popup-tag").css("display", "block");
            $("span.popup-tag").css("top", event.clientY);
            $("span.popup-tag").css("left", event.clientX);
            $("span.popup-tag").text(selection);
        } else {
            $("span.popup-tag").css("display", "none");
        };
    });
});