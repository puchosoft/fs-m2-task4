// **************************************************************
// Agrega una cabecera a un contenedor <header> con id="cabecera"
// **************************************************************
var cabecera = document.getElementById("cabecera");

cabecera.innerHTML = '\
<div class="row align-items-center">\
  <div class="col-md-2">\
    <a href="index.html"><img src="img/tgif-logo.png" class="img-fluid rounded" alt="tgif-logo"></a>\
  </div>\
  <div class="col-md-8 text-center">\
    <h2>Transparent Government in Fact</h2>\
  </div>\
  <div class="col-md-2 text-right">\
    <span class="fa fa-envelope"></span>\
    <a href="mailto:info@tgif.net">info@tgif.net</a>\
  </div>\
</div>\
';

// ********************************************************
// Agrega una barra de links a un contenedor con id="barra"
// ********************************************************
var barra = document.getElementById("barra");
if(barra != null){
  barra.innerHTML = '\
  <nav class="navbar navbar-default border border-secondary rounded py-0">\
    <ul class="nav flex-row">\
      <li class="nav-item" id="home">\
        <a class="nav-link" href="index.html">Home</a>\
      </li>\
      <li  class="nav-item dropdown" id="congress">\
        <a class="nav-link dropdown-toggle" data-toggle="dropdown">Congress 113</a>\
        <div class="dropdown-menu">\
          <a class="dropdown-item" href="house-data.html">House</a>\
          <a class="dropdown-item" href="senate-data.html">Senate</a>\
        </div>\
      </li>\
      <li  class="nav-item dropdown" id="attendance">\
        <a class="nav-link dropdown-toggle" data-toggle="dropdown">Attendance</a>\
        <div class="dropdown-menu">\
          <a class="dropdown-item" href="house-attendance.html">House</a>\
          <a class="dropdown-item" href="senate-attendance.html">Senate</a>\
        </div>\
      </li>\
      <li  class="nav-item dropdown" id="party-loyalty">\
        <a class="nav-link dropdown-toggle" data-toggle="dropdown">Party Loyalty</a>\
        <div class="dropdown-menu">\
          <a class="dropdown-item" href="house-party-loyalty.html">House</a>\
          <a class="dropdown-item" href="senate-party-loyalty.html">Senate</a>\
        </div>\
      </li>\
    </ul>\
  </nav>\
  ';
  var linkActivo = document.getElementById(barra.dataset.activo);
  linkActivo.className += ' active';
}

// ***************************************************************************
// Agrega un contenedor con checkboxs y dropdown para filtrar con id="filtros"
// ***************************************************************************
var filtros = document.getElementById("filtros");
if(filtros != null){
  filtros.innerHTML = '\
  <div class="row align-items-center">\
    <div class="col-md-9">\
      Filter by Party:\
      <label class="mx-2" for="republican">\
        <input checked type="checkbox" id="republican" name="party" value="R" /> Republican</label>\
      <label class="mx-2" for="democrat">\
        <input checked type="checkbox" id="democrat" name="party" value="D" /> Democrat</label>\
      <label class="mx-2" for="independent">\
        <input checked type="checkbox" id="independent" name="party" value="I" />\ Independent</label>\
    </div>\
    <div class="col-md-2 text-right">\
      <span>Filter by State</span>\
    </div>\
    <div class="col-md-1">\
      <select class="form-control px-0" id="dropStates">\
        <option value="">All</option>\
      </select>\
    </div>\
  </div>\
  ';
}

// ***************************************************
// Agrega un pie a un contenedor <footer> con id="pie"
// ***************************************************

var pie = document.getElementById("pie");
pie.innerHTML = '\
<div class="footer-copyright text-center align-items-center border border-secondary rounded">\
  <h5 class="my-1">©2019 TGIF | All Rights Reserved</h5>\
</div>\
';