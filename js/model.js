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

/***********************************************************************/
/* Esta funcion es el listener de los cambios de todos los filtros     */
/* Muestra una tabla a partir de un array con los miembros filtrados x */
/* 'Filter by Party' y 'Filter by State'                               */
/***********************************************************************/
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

  memberData.miembros = mFiltrados;
}

function getMiembrosByParty(party){
	return(miembros.filter(miembro => miembro.party == party));
}

function getPorcentAvgOfParty(party){
	var promedio = (party.length>0?(party.reduce((suma,miembro)=>(suma + miembro.votes_with_party_pct),0)/party.length).toFixed(2):(0).toFixed(2));
	return(promedio);
}

// Calcula los "votes_with_party" de un miembro
function vwp(m){
  return Math.round((m.total_votes - m.missed_votes) * m.votes_with_party_pct / 100);
}

// Ordena miembros de un array segun un "key" en un "order" indicado
function orderMembersByKey(array, key, order){
	array.sort((a,b) => ( order ? a[key]-b[key] : b[key]-a[key] ) );
}

//  Devuelve un array con la extraccion del pct% mayor/menor segun una "key"
function getMembersByPct(array, key, pct, bottom_top){
	// Obtienen lista de keys de referencia
  var reference = array.map(m => m[key]);
  // Ordena la lista de keys "bottom_top"
	reference.sort((a,b) => (bottom_top ? a-b : b-a));
  // Obtiene el key limite para comparar durante la extraccion
	var limit = reference[Math.round(array.length * pct/100)-1];
  // Extrae los elementos que cumplen con "limit"
	var extract = array.filter(m => (bottom_top ? m[key] <= limit : m[key] >= limit));
  return (extract);
}

// Devuelve el nombre completo del miembro
function memberFullName(member){
  var name = member.first_name;
  name += (member.middle_name?' '+member.middle_name:'');
  name += ' ' + member.last_name;
  return(name);
}

// Almacena los datos utiles de "array" en el elemento "key" del objeto "statistics"
function storeStatistics(key, array){
  // Define las claves a almacenar segun el elemento "key" indicado
  var k1 = (key.endsWith('engaged')?'missed_votes':'votes_with_party');
  var k2 = (key.endsWith('engaged')?'missed_votes_pct':'votes_with_party_pct');
  array.forEach(
    function(m){
      var name = memberFullName(m);
      var url = m.url;
      var votes = (k1.startsWith('missed') ? m[k1] : vwp(m));
      var pct = m[k2].toFixed(2);
      statistics[key].push({
        'name' : name,
        'url' : url,
        [k1] : votes,
        [k2] : pct
      });
    }
  );
}

/********************************************************/
/* Esta es la funcion inicial que es llamada desde AJAX */
/* Inicializa los objetos JSon y los objetos Vue        */
/********************************************************/
function initTables(){
  // Configura los filtros y filtra la tabla 'Member Data'
  var member_data = document.getElementById('member_data');
  if(member_data){
    // Genera las opciones del dropdown "Filter by State"
    setDropStates();

    // Agrega listeners que atiendan los cambios de los filtros
    setListeners();

    memberData = new Vue({
      el: '#member_data',
      data: {
        titulos : ["Name","Party","State","Years in Office","% Votes w/ Party"],
        miembros : []
      }
    });

    filtraYMuestraTabla();
  }

  statistics = {
    "at_a_glance" : [
      {
        "party" : "Republican",
        "number_of_reps": 0,
        "votes_with_party_pct" : 0
      },
      {
        "party" : "Democrat",
        "number_of_reps": 0,
        "votes_with_party_pct" : 0
      },
      {
        "party" : "Independent",
        "number_of_reps": 0,
        "votes_with_party_pct" : 0
      },
    ],

    "least_engaged" : [],

    "most_engaged" : [],

    "least_loyal" : [],

    "most_loyal" : []
  };

  // Calcula estadisticas "De un vistazo"
  var at_a_glance = document.getElementById('at_a_glance');
  if(at_a_glance){
    var republicans = getMiembrosByParty("R");
    var democrats = getMiembrosByParty("D");
    var independents = getMiembrosByParty("I");

    statistics.at_a_glance[0].number_of_reps = republicans.length;
    statistics.at_a_glance[1].number_of_reps = democrats.length;
    statistics.at_a_glance[2].number_of_reps = independents.length;

    statistics.at_a_glance[0].votes_with_party_pct = getPorcentAvgOfParty(republicans);
    statistics.at_a_glance[1].votes_with_party_pct = getPorcentAvgOfParty(democrats);
    statistics.at_a_glance[2].votes_with_party_pct = getPorcentAvgOfParty(independents);

    // Totaliza 'number_of_reps'
    var total_number_of_reps = statistics.at_a_glance.reduce((suma,party)=>(suma + party.number_of_reps),0);

    // Promedia 'votes_with_party_pct' en forma ponderada
    var total_votes_with_party_pct = (statistics.at_a_glance.reduce((suma,party)=>(suma + party.votes_with_party_pct * party.number_of_reps / total_number_of_reps),0)).toFixed(2);

    //Almacena los totales
    statistics.at_a_glance.push({
      'party' : 'Total',
      'number_of_reps': total_number_of_reps,
      'votes_with_party_pct' : total_votes_with_party_pct
    });

    var tableGlance = new Vue({
      el: '#at_a_glance',
      data: {
        titulos : ['Party','Nº of Reps','% Voted w/ Party'],
        partidos : statistics.at_a_glance
      }
    });
  }

  var head = '';
  var stat_type = '';

  // Calcula las estadisticas 'Engaged'
  var engaged = document.getElementById('engaged');
  if(engaged){
    head = ['Name', 'Nº Missed Votes', '% Missed'];
    stat_type = 'engaged';

    /*  Obtiene un array del 10% de miembros MENOS COMPROMETIDOS,
        lo ordena de mayor a menor y almacena lo importante en 'statistics' */
    var bottom_10_pct_members = getMembersByPct(miembros, 'missed_votes_pct', 10, false);
    orderMembersByKey(bottom_10_pct_members, 'missed_votes_pct', false);
    storeStatistics('least_engaged', bottom_10_pct_members);

    /*  Obtiene un array del 10% de miembros MAS COMPROMETIDOS,
        lo ordena de menor a mayor  y almacena lo importante en 'statistics' */
    var top_10_pct_members = getMembersByPct(miembros, 'missed_votes_pct', 10, true);
    orderMembersByKey(top_10_pct_members,'missed_votes_pct', true);
    storeStatistics('most_engaged', top_10_pct_members);
  }

  // Calcula las estadisticas 'Loyalty'
  var loyalty = document.getElementById("loyalty");
  if(loyalty){
    head = ['Name', 'Nº Party Votes', '% Party Votes'];
    stat_type = 'loyal';

    /*  Obtiene un array del 10% de miembros MENOS LEALES,
        lo ordena de menor a mayor y almacena lo importante en 'statistics' */
    var bottom_10_pct_members = getMembersByPct(miembros, 'votes_with_party_pct', 10, true);
    orderMembersByKey(bottom_10_pct_members, 'votes_with_party_pct', true);
    storeStatistics('least_loyal', bottom_10_pct_members);

    /*  Obtiene un array del 10% de miembros MAS LEALES,
        lo ordena de mayor a menor  y almacena lo importante en 'statistics' */
    var top_10_pct_members = getMembersByPct(miembros, 'votes_with_party_pct', 10, false);
    orderMembersByKey(top_10_pct_members,'votes_with_party_pct', false);
    storeStatistics('most_loyal', top_10_pct_members);
  }

  if(engaged || loyalty){
    var tableLeast = new Vue({
        el: '#least_'+ stat_type,
        data: {
          titulos : head,
          miembros : statistics['least_'+ stat_type]
        }
      });

    var tableMost = new Vue({
      el: '#most_'+ stat_type,
      data: {
        titulos : head,
        miembros : statistics['most_'+ stat_type]
      }
    });
  }
}

