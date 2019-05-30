// Construye la lista de opciones del 'Filter by State'
function setDropStates(){
  var dropStates = document.getElementById("dropStates");
  if(dropStates != null){

    // Crea un array con todos los estados existentes en la base
    var states = miembros.map(miembro => miembro.state);

    // Reduce el array a los estados unicos y los ordena
    states = states.filter((state, i, array) => array.indexOf(state) === i);
    states.sort();

    // Agrega una <option> al 'Filter by State' por cada estado de la lista
    states.forEach(state => {
      var option = document.createElement("option");
      option.value = state;
      option.innerText = state;
      dropStates.appendChild(option);
    });
  }
}

// Agrega listeners que atiendan los cambios de los filtros
function setListeners(){
  // Agrega listeners que atiendan los cambios de cada checkbox
  var query = document.querySelectorAll('input[name=party]');
  if(query != null){
    query.forEach(input => input.onchange = filtraYMuestraTabla);
  }

  // Agrega un listener que atiende el cambio del dropdown
  var dropStates = document.getElementById("dropStates");
  if(dropStates != null){
    dropStates.onchange = filtraYMuestraTabla;
  }
}

// Muestra una tabla a partir de un array con los miembros filtrados x 'Filter by Party' y 'Filter by State'
function filtraYMuestraTabla(){
  // Lee los checkboxes seleccionados del "Filter by Party"
  var query = document.querySelectorAll('input[name=party]:checked');

  // Crea un array con los valores de los checkboxes seleccionados
  var partidoSeleccionado = Array.from(query).map(element => element.value)

  // Funcion de filtrado de miembros segun partidos seleccionados
  var partyFilter = miembro => {
    if(partidoSeleccionado.indexOf(miembro.party) > -1){
      return miembro;
    }
  }

  // Reduce el array de miembros dejando los seleccionados por el partyFilter
  mFiltrados = miembros.filter(partyFilter);

  // Si no esta seleccionado "All", filtra por estado
  var state = document.getElementById("dropStates").value;
  if (state != ""){
    mFiltrados = mFiltrados.filter(m => m.state == state);
  }

  // Muestra la tabla de miembros filtrados
  // setTable(mFiltrados);

  tableData.miembros = mFiltrados;

}

// Configura el comportamiento de los filtros de la tabla de miembros y la muestra
function initTables(){

  // Genera las opciones del dropdown "Filter by State"
  setDropStates();

  // Agrega listeners que atiendan los cambios de los filtros
  setListeners();

  tableData = new Vue({
    el: '#table-data',
    data: {
      titulos : ["Name","Party","State","Years in Office","% Votes w/ Party"],
      miembros : []
    }
  });

  filtraYMuestraTabla();
}

