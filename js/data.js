var chamber = document.currentScript.getAttribute('chamber');

var url = chamber=='house'?'https://api.propublica.org/congress/v1/113/house/members.json':'https://api.propublica.org/congress/v1/113/senate/members.json';

var init = {
  headers: {
    'X-API-Key' : 'WbeUO7MgnKpkg4alDO0EhN0Bu4XbSCTxc84JkbVQ'
  }
};

fetch(url,{
  headers: {
    'X-API-Key' : 'WbeUO7MgnKpkg4alDO0EhN0Bu4XbSCTxc84JkbVQ'
  }
})
.then(response => response.json())
.then(jsonData => {
  data = jsonData;
  console.log(data);
});




/*
fetch( "/users").then(function(response) {
  console.log('Request succeeded: ' + response.statusText);
}).catch(function(error) {
  console.log( "Request failed: " + error.message );
});
*/
