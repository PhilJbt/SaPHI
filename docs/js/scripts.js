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
        // Meat
        case 0:
            document.getElementById('mdl_title').innerHTML = 'Viandes';
            document.getElementById('mdl_content').innerHTML = `
            <h5>Porc et lactose</h5>
            Afin de rendre leurs <b>tranches de porc</b> plus tendres, certains industriels intègrent <b>du lait</b> dans le processus de préparation.<br/>`;
            break;
        // Fish
        case 1:
            document.getElementById('mdl_title').innerHTML = 'Poissons';
            document.getElementById('mdl_content').innerHTML = `
            <h5>Saumon</h5>
            Le <b>saumon sauvage</b> provient seulement du Pacifique.<br/>
            Le <b>saumon de l'Atlantique</b>, que l'on retrouve au supermarché, provient uniquement d'élevages en bassins.<br/>
            Les <b>saumons de Norvège</b>, sauvages ou d'élevages, sont de qualité équivalente, leurs bassins d'élevage étant placés directement dans la mer.<br/>
            <br/>
            <h5>Poisson fumé</h5>
            Certains industriels utilisent l'appellation &laquo; fumé &raquo; pour leur poissons, même s'ils se contentent d'utiliser <b>des colorants et des arômes</b>.<br/>`;
            break;
        // Fruits
        case 2:
            document.getElementById('mdl_title').innerHTML = 'Fruits';
            document.getElementById('mdl_content').innerHTML = `
            <h5>Poires et gaz</h5>
            Hors saison, <b>les poires</b> dites &laquo; de garde &raquo; (des variétés se conservant plus longtemps) sont généralement <b>conservées dans du gaz</b>.<br/>`;
            break;
        // Produits laitiers
        case 3:
            document.getElementById('mdl_title').innerHTML = 'Produits laitiers';
            document.getElementById('mdl_content').innerHTML = `
            <h5>Fromage sans lactose</h5>
            Il est possible de connaitre le <b>taux de lactose d'un fromage</b>. Si l'étiquette informant de sa composition comporte &laquo; <i>Glucide : 0, dont Sucre : 0</i> &raquo;, cela signifie qu'<b>il est sans lactose</b>, ce dernier étant le &laquo; sucre du lait &raquo;.<br/>`;
            break;
        // Légumes
        case 4:
            document.getElementById('mdl_title').innerHTML = 'Légumes';
            document.getElementById('mdl_content').innerHTML = `
            <h5>Anti-nutriments</h5>
            Pour réduire les <b>anti-nutriments</b> présents dans les aliments végétaux, comme les <b>phytates</b>, les <b>lectines</b> ou les <b>oxalates</b>, faites-les <b>tremper</b>, <b>bouillir</b>, voire <b>germer</b>.<br/>`;
            break;
        // Réfrigérateur
        case 5:
            document.getElementById('mdl_title').innerHTML = 'Conservation au réfrigérateur';
            document.getElementById('mdl_content').innerHTML = `
            <h5>Réfrigérateur</h5>
            Afin d'éviter la prolifération de bactéries, un plat <b>ne doit pas</b> être laissé à refroidir <b>plus de deux heures</b> à température ambiante.<br/>
            Un plat chaud (ou tiède) ne doit pas être mis au réfrigirateur.<br/>
            Le plat est à consommer dans les 3 jours.<br/>`;
            break;
    }

    let elem_modal = document.querySelectorAll('.modal')[0];
    let inst_modal = M.Modal.getInstance(elem_modal);
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

    let elem_autocomp = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elem_autocomp, options);

    // Initialize the collapsibles
    let elem_collaps = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elem_collaps, {});

    // Initialize the floating menu button
    let elem_menu = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elem_menu, {
        direction:'bottom',
        hoverEnabled:false,
        toolbarEnabled:false
    });

    // Initialize the modal window
    let elem_modal = document.querySelectorAll('.modal');
    M.Modal.init(elem_modal, {});

    // Initialize the tooltips
    let elem_tooltips = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elem_tooltips, {});

    // Initialize the discovery feature
    let elem_disco = document.querySelectorAll('.tap-target');
    M.TapTarget.init(elem_disco, {});

    // If the user has never used the menu
    if (localStorage.getItem('menu_opened') !== 'true') {
        /*
        // Add listener to store the information if the user open the menu
        let menu_bouton = document.getElementById('menu');
        menu_bouton.addEventListener("click", function() {
            localStorage.setItem('menu_opened', 'true');
        });*/
        
        // Disable automatic opening
        localStorage.setItem('menu_opened', 'true');
        
        // Show the discovery in 3 seconds
        setTimeout(() => {
            let elem_disco = document.querySelectorAll('.tap-target');
            let instance_discovery = M.TapTarget.getInstance(elem_disco[0]);
            instance_discovery.open();
           
            // Close the discovery after 5 seconds
            setTimeout(() => {
                let elem_disco = document.querySelectorAll('.tap-target');
                let instance_discovery = M.TapTarget.getInstance(elem_disco[0]);
                instance_discovery.close();
            }, 5000);
        }, 3000);
    }

    // Enable the text input
    let inp = document.getElementById('inp_nomali');
    inp.disabled = false;
});

/* CONTACT */
function contact() {
    window.location.href = atob("bWFpbHRvOnBoaWxqYnRAaWsubWU=");
}
