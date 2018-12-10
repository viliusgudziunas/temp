var btn = document.getElementById("btn");
var info = document.getElementById("info");

btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", "../static/main.json");
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
};
    ourRequest.send();
});

function renderHTML(data) {
    var htmlString = "";
    var selection = getSelectionText();
    
    for (i = 0; i < data.length; i++) {
        if (selection == data[i].term) {
            htmlString = "<p>" + data[i].definition + "</p>";
        };
    };
    info.insertAdjacentHTML("beforeend", htmlString);
};

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    };
    return text;
};

function findDefinition() {
    var list = document.getElementsByTagName("h3");
    for (i = 0; i < list.length; i++) {
        if (getSelectionText() == list[i].innerHTML) {
            return getSelectionText();
        };
    };
    return "No definition available";
};