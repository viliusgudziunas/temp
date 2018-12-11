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
        } else if (htmlString == "<h4 class='definition'>No definition available</h4>") {
            definition.innerHTML = "<h4 class='definition'>Which definition are you looking for?</h4>";
            for (i = 0; i < array.length; i++){
                definition.innerHTML += "<button class='accordion'>" + array[i].term + "</button><div class='panel'><p>" + array[i].definition + "</p></div>";
            }
            setTimeout(openModal, 1000);
        } else {
            definition.innerHTML = htmlString;
            setTimeout(openModal, 1000);
        };        
    };
};

function findExact(selection, data) {
    var htmlString = "<h4 class='definition'>No definition available</h4>";

    for (i = 0; i < data.length; i++) {
        if (selection == data[i].term) {
            htmlString = "<button class='accordion'>" + data[i].term + "</button><div class='panel'><p>" + data[i].definition + "</p></div>"
        };
    };
    return htmlString;
};

function findArray(selection, data) {
    var array = [];

    for (i = 0; i < data.length; i++) {
        if (data[i].term.includes(selection)) {
            var entry = {
                term: data[i].term,
                definition: data[i].definition
            }
            array.push(entry);
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
    
    var acc = document.getElementsByClassName("accordion");
    
    for (i = 0; i < acc.length; i++) {
        var acc = document.getElementsByClassName("accordion");
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            };
        });
    };
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