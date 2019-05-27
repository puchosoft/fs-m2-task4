var chamber = document.currentScript.getAttribute('chamber');

// Define un URL segun el parametro 'chamber' pasado al script 'data.js'
var url = 'https://api.propublica.org/congress/v1/113/'+ chamber +'/members.json';

var APIKey = 'WbeUO7MgnKpkg4alDO0EhN0Bu4XbSCTxc84JkbVQ';
var myHeaders = new Headers();
myHeaders.append('X-API-Key',APIKey);
var init = { headers: myHeaders };

fetch(url, init)
.then(function(response){
  if(response.ok){
    response.json().then(function(jsonData){
      // Crea un array GLOBAL con los miembros de la camara
      miembros = jsonData.results[0].members;
      initTable();
    });
  }
})
.catch(function(error){
  console.log('Problema en peticion fetch: ' + error.message);
});

