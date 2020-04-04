// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var id = myNodelist[i].getAttribute("id")
    var span = document.createElement("SPAN");
    var span2 = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    var txt2 = document.createTextNode("\u270E");
    span.setAttribute('onclick', "remove('" + id + "')");
    span.className = "close";
    span2.className = "edit";
    span.appendChild(txt);
    span2.appendChild(txt2)
    myNodelist[i].appendChild(span);
    myNodelist[i].appendChild(span2);
}


// Click on a edit button to hide the current list item
var edit = document.getElementsByClassName("edit");
var i;
for (i = 0; i < edit.length; i++) {
    edit[i].onclick = function () {
        var div = this.parentElement;
        let input = div.getElementsByClassName("form");
        //let updBtn = div.parentNode;
        for (let i = 0; i < input.length; i++) {
            if (input[i].disabled == true) {
                input[i].disabled = false;
            } else {
                input[i].disabled = true;

            }
        }
        if (input[input.length - 1].disabled == false) {

            let span = document.createElement("SPAN");
            var txt = document.createTextNode("\uD83D\uDCBE");
            let id = div.getAttribute("id");
            span.setAttribute('onclick', "update('" + id + "')");
            span.className = "save";
            span.appendChild(txt);
            div.appendChild(span);
        } else {
            div.lastChild.remove();
        }
    }
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "flex") {
            content.style.display = "none";
        } else {
            content.style.display = "flex";
        }
    });
}

function validateInput(textbox) {
    //Validation.validate(document.getElementById(id));
    if (document.getElementById("ADDdateBegin").checkValidity() && document.getElementById("ADDdateEnd").checkValidity() && document.getElementById("ADDtitle").checkValidity() && document.getElementById("ADDstatut").checkValidity() && document.getElementById("ADDtags").checkValidity()) {
        console.log('ok')
    } else {
        console.log("nok")
    }


}