var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var terms = document.getElementById("terms");
var definition = document.getElementById("modal-body");
var btn = document.getElementById("closeButton");

terms.addEventListener("mouseup", function() {
    var request = new XMLHttpRequest();
    var data;

    request.open("GET", "../static/main.json");
    request.onload = function() {
        data = JSON.parse(request.responseText);
        renderHTML(data);
    };
    request.send();
});

function renderHTML(data) {
    var selection = getSelected();
    var htmlString;
    var array;

    if (selection != "") {
        htmlString = findExact(selection, data);
        array = findArray(selection, data);

        if (array === undefined || array.length == 0) {
            definition.innerHTML = htmlString;
            setTimeout(openModal, 1000);
        } else if (htmlString == "<p>No definition available</p>") {
            definition.innerHTML = "";
            for (i = 0; i < array.length; i++){
                definition.innerHTML += "<p>" + array[i] + "<br></p>";
            }
            setTimeout(openModal, 1000);
        } else {
            definition.innerHTML = htmlString;
            setTimeout(openModal, 1000);
        };        
    };
};

function findExact(selection, data) {
    var htmlString = "<p>No definition available</p>";

    for (i = 0; i < data.length; i++) {
        if (selection == data[i].term) {
            htmlString = "<p>" + data[i].definition + "</p>"
        };
    };
    return htmlString;
};

function findArray(selection, data) {
    var array = [];

    for (i = 0; i < data.length; i++) {
        if (data[i].term.includes(selection)) {
            array.push(data[i].term);
        };
    };
    return array;
};

function getSelected() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        return document.selection.createRange().text();
    };
};

function openModal() {
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
};

btn.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    };
};