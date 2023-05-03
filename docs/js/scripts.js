/*       SET THE CARD OPACITY     */
function setCardOpacity(_id, _show) {
    document.getElementById(_id).style.opacity = (_show === true ? 1.0 : .25);
}

/*           SALYCILATES          */
function load_Salicylates(_val) {
    let str = '<div class="chip chipsa ';

    if (_val === '?') {
        str += '">Inconnu';

        setCardOpacity('card_sa', false);
    }
    else {
        let val = Number(_val);

        if (val <= 0.06)
            str += 'green darken-4';
        else if (val <= 0.10)
            str += 'yellow darken-4';
        else if (val <= 0.60)
            str += 'orange darken-4';
        else if (val <= 1.0)
            str += 'red darken-4';
        else if (val <= 20.0)
            str += 'purple darken-4';
        else
            str += 'grey darken-4';

        str += `"> ${_val}`;

        setCardOpacity('card_sa', true);
    }

    str += '</div>';

    return str;
}

/*              AMINES            */
function load_Amines_(_char) {
    return `<div class="chip grey lighten-2">${_char.toUpperCase()}</div>`;
}

function load_Amines(_flags) {
    let str = '<div class="chip chipam ';
    switch(_flags.substr(0, 1)) {
        case '0': str += 'green darken-2">Bien toléré'; break;
        case '1': str += 'yellow darken-2">Bien Toléré en faible quantité'; break;
        case '2': str += 'orange darken-2">Modérément toléré'; break;
        case '3': str += 'red darken-2">Mal toléré'; break;
        case '4': str += 'purple darken-2">Très mal toléré'; break;
        default: str += '">Inconnu'; break;
    }
    str += `</div>`;
    let strFlags = _flags.substr(1);

    for (const char of strFlags)
        str += load_Amines_(char);

    if (_flags === '?')
        setCardOpacity('card_am', false);
    else
        setCardOpacity('card_am', true);

    return str;
}

/*                PH              */
function load_Ph(_val) {
    let str = '<div class="chip chipph ';

    if (_val === '?') {
        str += '">Inconnu';

        setCardOpacity('card_ph', false);
    }
    else {
        let val = Number(_val);

        if (val <= 0)
        str += 'light-green accent-2';
        else
        str += 'yellow accent-2';

        str += `"> ${_val}`;

        setCardOpacity('card_ph', true);
    }
    str += '</div>';
    return str;
}

/*        INDEX GLYCEMIQUE        */
function load_IG(_val) {
    let str = '<div class="chip chipig ';

    if (_val === '?') {
        str += '">Inconnu';

        setCardOpacity('card_ig', false);
    }
    else {
        let val = Number(_val);

        if (val <= 50)
        str += 'green';
        else if (val <= 70)
        str += 'yellow';
        else
        str += 'red';

        str += `"> ${_val}`;

        setCardOpacity('card_ig', true);
    }
    str += '</div>';
    return str;
}

/*         PRE/PROBIOTIQUE        */
function load_Biotique(_val) {
    let str = '<div class="chip chipbi ';
    switch(_val) {
        case '1': str += 'blue">Prébiotique'; break;
        case '2': str += 'blue">Probiotique'; break;
        default: str += 'grey lighten-1">Non'; break;
    }

    str += `</div>`;

    if (_val === '?')
        setCardOpacity('card_bi', false);
    else
        setCardOpacity('card_bi', true);

    return str;
}

/*              FODMAP            */
function load_Fodmap(_val) {
    let str = '<div class="chip chipfd ';
    switch(_val) {
        case '0': str += 'green lighten-1">Non'; break;
        case '1': str += 'orange lighten-1">FODMAP'; break;
        case '2': str += 'red lighten-1">FODMAP'; break;
        default: str += '">Inconnu'; break;
    }

    str += `</div>`; 

    if (_val === '?')
        setCardOpacity('card_fd', false);
    else
        setCardOpacity('card_fd', true);

    return str;
}

/*          LOAD COMMENTS         */
function load_Comments(_com) {
    if (_com === null) {
        setCardOpacity('card_cm', false);
        return 'Néant.';
    }
    else {
        setCardOpacity('card_cm', true);
        return _com;
    }
}

/*         LOAD FOOD INFOS        */
function findElem(_name) {
    var obj = {
        "am": "?",
        "cm": null,
        "fd": "?",
        "ig": "?",
        "nm": "Introuvable",
        "ph": "?",
        "sa": "?"
    };
    Object.keys(window['aliments']).forEach(x => obj = window['aliments'][x].nm === _name ? window['aliments'][x] : obj);
    return obj;
}

function load_Food() {
    let nodeVal = document.getElementById('inp_nomali').value;
    
    let elem = findElem(nodeVal);
    
    document.getElementById('tt').innerHTML = nodeVal;

    document.getElementById('sa').innerHTML = load_Salicylates(elem['sa']);
    document.getElementById('am').innerHTML = load_Amines(elem['am']);
    document.getElementById('ph').innerHTML = load_Ph(elem['ph']);
    document.getElementById('ig').innerHTML = load_IG(elem['ig']);
    document.getElementById('bi').innerHTML = load_Biotique(elem['bi']);
    document.getElementById('fd').innerHTML = load_Fodmap(elem['fd']);
    document.getElementById('cm').innerHTML = load_Comments(elem['cm']);
}

/*           OPEN MODAL           */
function openModal(_id) {
    switch(_id) {
        // Fish
        case 0:
            document.getElementById('mdl_title').innerHTML = 'Poissons';
            document.getElementById('mdl_content').innerHTML = `
            Le <b>saumon sauvage</b> provient seulement du Pacifique.<br/>
            Le <b>saumon de l'Atlantique</b>, que l'on retrouve au supermarché, provient uniquement d'élevages en bassins.<br/>
            Les <b>saumons de Norvège</b>, sauvages ou d'élevages, sont de qualité équivalente, leurs bassins d'élevage étant placés directement dans la mer.
            `;
            break;
    }

    var elem_modal = document.querySelectorAll('.modal')[0];
    var inst_modal = M.Modal.getInstance(elem_modal);
    inst_modal.open();
}

/*     PROCESS DISTANT DATA       */
function parseJson(_objData, _data) {
    window['aliments'] = _data;
    for (const elem of Object.entries(_data))
        _objData.dict[elem[1].nm] = null;
}

/*      RETRIEVE DISTANT DATA     */
function retrieveJson(_objData) {
    fetch('data/aliments.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            parseJson(_objData, data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
}

/*           INITIALIZE           */
var objData = { dict: {} };
document.addEventListener('DOMContentLoaded', function() {
    // Remove any entered text
    document.getElementById('inp_nomali').value = '';

    // Retrieve the distant food list file
    retrieveJson(objData);

    // Initialize the autocomplete input
    let options = {
        data: objData.dict,
        limit: 10,
        minLength: 1,
        onAutocomplete: load_Food
    }

    var elem_autocomp = document.querySelectorAll('.autocomplete');
    var inst_autocomp = M.Autocomplete.init(elem_autocomp, options);

    // Initialize the collapsibles
    var elem_collaps = document.querySelectorAll('.collapsible');
    var inst_collaps = M.Collapsible.init(elem_collaps, {});

    // Initialize the floating menu button
    var elem_menu = document.querySelectorAll('.fixed-action-btn');
    var inst_menu = M.FloatingActionButton.init(elem_menu, {
        direction:'bottom',
        hoverEnabled:false,
        toolbarEnabled:false
    });

    // Initialize the modal window
    var elem_modal = document.querySelectorAll('.modal');
    var inst_modal = M.Modal.init(elem_modal, {});

    // Initialize the tooltips
    var elem_tooltips = document.querySelectorAll('.tooltipped');
    var inst_tooltips = M.Tooltip.init(elem_tooltips, {});

    // Enable the text input
    let inp = document.getElementById('inp_nomali');
    inp.disabled = false;
});

/* CONTACT */
function contact() {
    window.location.href = "mailto:philjbt@ik.me";
}