// *********************************************************************
// Crea y agrega un <thead> y un <tbody> a una tabla con id="table-data"
// Los datos son obtenidos de un objeto externo "data"
// *********************************************************************
function setTable(miembros){
  var table = document.getElementById('table-data');
  table.innerHTML="";
  table.appendChild(getTHead());
  table.appendChild(getTBody(miembros));
}

// *************************************************
// Funcion que devuelve un objeto <thead> formateado
// *************************************************
function getTHead(){
  var thead = document.createElement("thead");
  var trHead = document.createElement("tr");
  var thText=["Name","Party","State","Years in Office","% Votes w/ Party"];

  for(var i = 0; i<thText.length; i++){
    var th = document.createElement("th");
    th.innerText = thText[i];
    trHead.appendChild(th);
  }
  thead.appendChild(trHead);
  return(thead);
}

// *************************************************
// Funcion que devuelve un objeto <tbody> formateado
// *************************************************
function getTBody(miembros){
  var tbody = document.createElement("tbody");

  for(var i=0; i < miembros.length; i++){
    var tr = document.createElement("tr");
    var fullName = miembros[i].first_name;
    fullName += (miembros[i].middle_name?" "+miembros[i].middle_name:"");
    fullName += " " + miembros[i].last_name;

    var a = document.createElement("a");
    a.href = miembros[i].url;
    a.innerText = fullName;

    var tdName = document.createElement("td");
    tdName.appendChild(a);

    var tdParty = document.createElement("td");
    tdParty.innerText = miembros[i].party;
    var tdState = document.createElement("td");
    tdState.innerText = miembros[i].state;
    var tdSeniority = document.createElement("td");
    tdSeniority.innerText = miembros[i].seniority;
    var tdVotes_with_party_pct = document.createElement("td");
    tdVotes_with_party_pct.innerText = miembros[i].votes_with_party_pct + "%";

    tr.appendChild(tdName);
    tr.appendChild(tdParty);
    tr.appendChild(tdState);
    tr.appendChild(tdSeniority);
    tr.appendChild(tdVotes_with_party_pct);

    tbody.appendChild(tr);
  }

  return(tbody);
}
