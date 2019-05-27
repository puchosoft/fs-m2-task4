// Construye la lista de opciones del 'Filter by State'
function setDropStates(states){
  var dropStates = document.getElementById("dropStates");

  // Agrega listener que atiende el cambio del dropdown
  dropStates.onchange = filtraYMuestraTabla;

  // Agrega una opcion al 'Filter by State' por cada estado de la lista
  states.forEach(state => {
    var option = document.createElement("option");
    option.value = state;
    option.innerText = state;
    dropStates.appendChild(option);
  })
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
  setTable(mFiltrados);
}

// Configura el comportamiento de los filtros de la tabla de miembros y la muestra
function initTable(){
  // Agrega listeners que atiendan los cambios de los checkboxes
  var query = document.querySelectorAll('input[name=party]');
  query.forEach(input => input.onchange = filtraYMuestraTabla);

  // Crea un array con todos los estados existentes en la base
  var states = miembros.map(miembro => miembro.state);

  // Reduce el array a los estados unicos y los ordena
  states = states.filter((state, i, array) => array.indexOf(state) === i);
  states.sort();

  // Genera las opciones del dropdown "Filter by State"
  setDropStates(states);

  filtraYMuestraTabla();
}

