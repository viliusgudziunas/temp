var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var terms = document.getElementById("terms");
var definition = document.getElementById("modal-body");
var btn = document.getElementById("closeButton");
var smallWords = ["of", "the", "by", "is", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "are", "be", "to", "for", "that", "and", "an", "in", "does", "do", "did", "didn't", "not", "can", "can't", "if", "it", "or", "so"];

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
        if (selection != "Small Word") {
            htmlString = findExact(selection, data);
            array = findArray(selection, data);
        };

        if (array === undefined || array.length == 0 || selection == "Small Word") {
            definition.innerHTML = "<h4 class='definition'>No definition available</h4>";
            setTimeout(openModal, 1500);
        } else if (htmlString == "<h4 class='definition'>No definition available</h4>") {
            definition.innerHTML = "<h4 class='definition'>Which definition are you looking for?</h4>";
            for (i = 0; i < array.length; i++){
                definition.innerHTML += "<button class='accordion'>" + array[i].term + "</button><div class='panel'><p>" + array[i].definition + "</p></div>";
            }
            setTimeout(openModal, 1500);
        } else {
            definition.innerHTML = htmlString;
            setTimeout(openModal, 1500);
        };        
    };
};

function findExact(selection, data) {
    var htmlString = "<h4 class='definition'>No definition available</h4>"

    for (i = 0; i < data.length; i++) {
        if (selection == data[i].term.toLowerCase()) {
            htmlString = "<button class='accordion'>" + data[i].term + "</button><div class='panel' style='max-height: 100%'><p>" + data[i].definition + "</p></div>"
        };
    };
    return htmlString;
};

function findArray(selection, data) {
    var array = [];
    var selectionArray = selection.replace(/\n/g, " ").trim().split(" ").filter(function(item, i, ar) {
        return ar.indexOf(item) === i;
    });

    for (i = 0; i < selectionArray.length; i++) {
        if (checkSmallWords(selectionArray[i])) {
            var isSmallWord = true;
            selectionArray.splice(i, 1);
            while (isSmallWord && selectionArray[i + 1]) {
                if (checkSmallWords(selectionArray[i])) {
                    selectionArray.splice(i, 1);
                } else {
                    isSmallWord = false;
                };
            };
        };
    };

    for (i = 0; i < data.length; i++) {
        for (j = 0; j < selectionArray.length; j++) {
            if (data[i].term.toLowerCase().includes(selectionArray[j])) {
                var entry = {
                    term: data[i].term,
                    definition: data[i].definition
                };
                array.push(entry);
                break;
            };
        };
    };
    return array;
};

function getSelected() {
    if (window.getSelection) {
        if (checkSmallWords(window.getSelection().toString().toLowerCase())) {
            return "Small Word";
        } else {
            return window.getSelection().toString().toLowerCase();
        };
    } else if (document.selection && document.selection.type != "Control") {
        if (checkSmallWords(document.selection.createRange().text().toLowerCase())) {
            return "Small Word";
        } else {
            return document.selection.createRange().text().toLowerCase();
        };
    };
};

function checkSmallWords(input) {
    return smallWords.indexOf(input.trim()) != -1;
};

function openModal() {
    if (getSelected()) {
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