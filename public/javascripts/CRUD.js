function add() {
    if (document.getElementById("ADDdateBegin").checkValidity() && document.getElementById("ADDdateEnd").checkValidity() && document.getElementById("ADDtitle").checkValidity() && document.getElementById("ADDstatut").checkValidity() && document.getElementById("ADDtags").checkValidity()) {

        let data = JSON.stringify(
            {
                title: document.getElementById("ADDtitle").value,
                dateBegin: document.getElementById("ADDdateBegin").value,
                dateEnd: document.getElementById("ADDdateEnd").value,
                statut: document.getElementById("ADDstatut").value,
                tags: document.getElementById("ADDtags").value

            }
        )
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                console.log("post ok");
                window.location.href = "http://localhost:3000/";
            }
        };
        xhttp.open("POST", "http://localhost:3000/api/todo");
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send(data);
    }
    ;
}

function update(myid) {
    console.log("update");
    if (document.getElementById("title_" + myid).checkValidity() && document.getElementById("dateBegin_" + myid).checkValidity() && document.getElementById("dateEnd_" + myid).checkValidity() && document.getElementById("statut_" + myid).checkValidity() && document.getElementById("tags_" + myid).checkValidity()) {

        let data = JSON.stringify(
            {
                //id: myid,
                title: document.getElementById("title_" + myid).value,
                dateBegin: document.getElementById("dateBegin_" + myid).value,
                dateEnd: document.getElementById("dateEnd_" + myid).value,
                statut: document.getElementById("statut_" + myid).value,
                tags: document.getElementById("tags_" + myid).value

            }
        )
        console.log(data)
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("put ok");
                window.location.href = "http://localhost:3000/";
            }
        };
        xhttp.open("PUT", "http://localhost:3000/api/todo/" + myid);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send(data);

    }
    ;
}


function remove(myid) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("delete ok");
            window.location.href = "http://localhost:3000";
        }
    };
    xhttp.open("DELETE", "http://localhost:3000/api/todo/" + myid, true);
    xhttp.send()
}

function statut() {
    let xhttp = new XMLHttpRequest();
    let statut = [];
    let params = '';
    if (document.getElementById('non_precise').checked) {
        statut.push('Non precisée');
    }
    if (document.getElementById('tache_requise').checked) {
        statut.push('Tâche requise');
    }
    if (document.getElementById('en_cours').checked) {
        statut.push('En cours');
    }
    if (document.getElementById('achevee').checked) {
        statut.push('Achevée');
    }
    if (document.getElementById('annulee').checked) {
        statut.push('Annulée');
    }

    if (document.getElementById('searchTags').value.length > 0) {

        params += "tags=" + document.getElementById('searchTags').value;
    }

    if (statut.length > 0) {
        if (params.length > 0) {
            params += "&";
        }
        params += "statut=" + statut.join(",");
    }
    if (params.length > 0) {

        window.location.href = "http://localhost:3000/?" + params;
    } else {
        window.location.href = "http://localhost:3000/";
    }
}