/*       SET THE CARD OPACITY     */
function setCardOpacity(_id, _show) {
    document.getElementById(_id).style.opacity = (_show === true ? 1.0 : .25);
}

/*           SALYCILATES          */
function load_Salicylates(_val) {
    let str = '<div class="chip chipsa ';

    if (_val === null) {
        str += '">Inconnu';

        setCardOpacity('card_salicylate', false);
    }
    else {
        let val = Number(_val.replace(/[^\d.-]/g, ''));

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

        str += `"><b>${_val}</b>`;

        setCardOpacity('card_salicylate', true);
    }

    str += '</div>';

    return str;
}

/*              AMINES            */
function load_Amines_(_char) {
    return `<div class="chip grey lighten-2"><b>${_char.toUpperCase()}</b></div>`;
}

function load_Amines(_flags) {
    let str = '<div class="chip chipam ';
    if (_flags !== null) {
        setCardOpacity('card_amine', true);
        switch(_flags.replace(/[^\d.-]/g, '').substr(0, 1)) {
            case '0': str += 'green darken-2">Bien toléré'; break;
            case '1': str += 'yellow darken-2">Bien Toléré en faible quantité'; break;
            case '2': str += 'orange darken-2">Modérément toléré'; break;
            case '3': str += 'red darken-2">Mal toléré'; break;
            case '4': str += 'purple darken-2">Très mal toléré'; break;
        }

        str += `</div>`;
        let strFlags = _flags.substr(1);
    
        for (const char of strFlags)
            str += load_Amines_(char);
    }
    else {
        str += '">Inconnu</div>';
        setCardOpacity('card_amine', false);
    }

    return str;
}

/*                POTENTIEL HYDROGENE              */
function load_Potentielhydrogene(_val) {
    let str = '<div class="chip chipph ';

    if (_val === null) {
        str += '">Inconnu';

        setCardOpacity('card_potentielhydrogene', false);
    }
    else {
        let val = Number(_val.replace(/[^\d.-]/g, ''));

        if (val <= 0)
        str += 'light-green accent-2';
        else
        str += 'yellow accent-2';

        str += `"><b>${_val}</b>`;

        setCardOpacity('card_potentielhydrogene', true);
    }
    str += '</div>';
    return str;
}

/*        GLYCEMIE        */
function load_Glycemie_(_val, _name) {
    let val = Number(_val.replace(/[^\d.-]/g, ''));
    let str = '<div class="chip chipig ';

    if (val <= 50)
        str += 'green';
    else if (val <= 70)
        str += 'yellow';
    else
        str += 'red';

    str += `">${_name} : <b>${_val}</b></div>`;
    
    return str;
}
function load_Glycemie(_indice, _charge) {
    let str = '';

    if (_indice === null
        && _charge === null) {
        setCardOpacity('card_glycemie', false);
        str = '<div class="chip chipig">Inconnu</div>';
    }
    else {
        setCardOpacity('card_glycemie', true);

        if (_indice !== null)
            str += load_Glycemie_(_indice, 'Indice');
        if (_charge !== null)
            str += load_Glycemie_(_charge, 'Charge');
    }
    
    return str;
}

/*         FIBRES        */
function load_Fibre_(_val, _name) {
    return `<div class="chip chipig">${_name} : <b>${_val}</b></div>`;
}
function load_Fibre(_sol, _ins) {
    let str = '';

    if (_sol === null
        && _ins === null) {
        setCardOpacity('card_fibre', false);
        str += '<div class="chip">Inconnu</div>';
    }
    else {
        setCardOpacity('card_fibre', true);

        if (_sol !== null)
            str += load_Fibre_(_sol.replace(/[^\d.-]/g, ''), 'Solubles');
        if (_ins !== null)
            str += load_Fibre_(_ins.replace(/[^\d.-]/g, ''), 'Insolubles');
    }
    
    return str;
}

/*              FODMAP            */
function load_Fodmap(_val) {
    let str = '<div class="chip chipfd ';

    if (_val === null) {
        str += '">Inconnu';
        setCardOpacity('card_fodmap', false);
    }
    else {
        setCardOpacity('card_fodmap', true);
        
        switch(_val.replace(/[^\d.-]/g, '')) {
            case '0': str += 'green lighten-1">Non'; break;
            case '1': str += 'orange lighten-1">FODMAP'; break;
            case '2': str += 'red lighten-1">FODMAP'; break;
        }
    }

    str += '</div>';

    return str;
}

/*          LOAD COMMENTS         */
function load_Comments(_com) {
    if (_com === null) {
        setCardOpacity('card_commentaire', false);
        return 'Néant.';
    }
    else {
        setCardOpacity('card_commentaire', true);
        return _com;
    }
}

/*         LOAD FOOD INFOS        */
function findElem(_name) {
    var obj = {
        "amine": null,
        "commentaire": null,
        "fodmap": null,
        "indiceglycemique": null,
        "chargeglycemique": null,
        "name": "Introuvable",
        "potentielhydrogene": null,
        "salicylate": null,
        "fibresoluble": null,
        "fibreinsoluble": null
    };
    Object.keys(window['aliments']).forEach(x => obj = window['aliments'][x].name === _name ? window['aliments'][x] : obj);
    return obj;
}

function load_Food() {
    let nodeVal = document.getElementById('inp_nomali').value;
    
    let elem = findElem(nodeVal);
    
    document.getElementById('tt').innerHTML = nodeVal;

    document.getElementById('sa').innerHTML = load_Salicylates(elem['salicylate']);
    document.getElementById('am').innerHTML = load_Amines(elem['amine']);
    document.getElementById('ph').innerHTML = load_Potentielhydrogene(elem['potentielhydrogene']);
    document.getElementById('ig').innerHTML = load_Glycemie(elem['indiceglycemique'], elem['chargeglycemique']);
    document.getElementById('fi').innerHTML = load_Fibre(elem['fibresoluble'], elem['fibreinsoluble']);
    document.getElementById('fd').innerHTML = load_Fodmap(elem['fodmap']);
    document.getElementById('cm').innerHTML = load_Comments(elem['commentaire']);

    // Update url and page title with food name
    const title = `SaPHI · ${nodeVal}`;
    document.title = title;
    window.history.pushState({ page: nodeVal }, title, `${window.location.origin + window.location.pathname}?nom=${btoa(encodeURIComponent(nodeVal))}`);
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
            Afin d'éviter la prolifération de bactéries, un plat <b>ne doit pas</b> être laissé à refroidir <b>plus de deux heures</b> à température ambiante, avant d'être stocké au réfrigérateur.<br/>
            Un plat chaud (ou tiède) ne doit pas être mis au réfrigirateur.<br/>
            Le plat est à consommer dans les 3 jours.<br/>`;
            break;
        // Pré/Probiotiques
        case 6:
            document.getElementById('mdl_title').innerHTML = 'Pré/Probiotiques';
            document.getElementById('mdl_content').innerHTML = `
            <ul class="collection with-header mt-3 z-depth-1">
                <li class="collection-header">
                    <h5>Prébiotiques</h5>
                    <h6>Ce sont des molécules (l’inuline, les fructo-oligosaccharides (ou FOS), les galacto-oligosaccharides (ou GOS) et le lactulose) favorisant la croissance de bactéries intestinales bénéfiques.</h6>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Certains <b>fruits</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Ail, Artichaut, Asperge, Chicorée, etc</p>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Certains <b>légumes</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Banane, Ananas, Pomme, etc</p>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Certaines <b>légumineuses</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Lentille, Pois chiche, Haricot noir et rouge, etc</p>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Certaines <b>céréales et céréales complètes</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Avoine, Blé entier, Lin, Seigle, etc</p>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Certaines <b>oléagineux</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Amandes, Pistaches, Noix, etc</p>
                </li>
            </ul>
            <br/>
            <ul class="collection with-header z-depth-1">
                <li class="collection-header">
                    <h5>Probiotiques</h5>
                    <h6>Ce sont des micro-organismes bénéfiques pour la santé intestinale se nourissant des prébiotiques.</h6>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Les <b>boissons fermentées</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Kéfir, Kombucha, etc</p>
                </li>
                <li class="collection-item">
                    <p class="mb-0">Les <b>légumes fermentés</b></p>
                    <p class="mt-0 grey-text text-darken-1"><i class="material-icons tiny collection-icons">chevron_right</i> Tempeh, Natto, Miso, Kimchi, Choucroute, Soyu, Tamari, etc</p>
                </li>
                <li class="collection-item">
                    Le <b>vinaigre de cidre</b>.
                </li>
            </ul>`;
            break;
    }

    let elem_modal = document.querySelectorAll('.modal')[0];
    let inst_modal = M.Modal.getInstance(elem_modal);
    inst_modal.open();
}

/*     PROCESS DISTANT DATA       */
const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
function parseJson(_objData, _data) {
    window['aliments'] = _data;
    
    // Remove all accents
    for (let i = 0; i < window['aliments'].length; ++i)
        if (Array.from(window['aliments'][i].name.normalize('NFD')).length !== Array.from(window['aliments'][i].name).length)
            window['aliments'][i].name = removeAccents(window['aliments'][i].name);

    // Prepare a specific dict for auto-complete
    for (const elem of Object.entries(_data))
        _objData.dict[elem[1].name] = null;
}

/*      RETRIEVE DISTANT DATA     */
async function retrieveJson(_objData) {
    const response = await fetch('data/aliments.json')
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

    // Bind text input to the accent remover function
    document.getElementById('inp_nomali').addEventListener('input', (event) => {
        document.getElementById('inp_nomali').value = removeAccents(event.target.value);
    });

    // Retrieve the distant food list file
    retrieveJson(objData).then(function () {
        // Enable the text input
        let inp = document.getElementById('inp_nomali');
        inp.disabled = false;

        // Get the food name filled in the url param
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const foodName = urlParams.get('nom');
        if (foodName !== null) {
            document.getElementById('inp_nomali').value = decodeURIComponent(atob(foodName));
            document.getElementById('inp_nomali').focus();
            load_Food();
        }
    });
    
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
        // Add listener to store the information if the user open the menu
        let menu_bouton = document.getElementById('menu');
        menu_bouton.addEventListener("click", function() {
            localStorage.setItem('menu_opened', 'true');
        });
        
        // Disable automatic opening
        localStorage.setItem('menu_opened', 'true');
        
        // Show the discovery after 3 seconds
        // setTimeout(() => {
            let elem_disco = document.querySelectorAll('.tap-target');
            let instance_discovery = M.TapTarget.getInstance(elem_disco[0]);
            instance_discovery.open();
           
            // Close the discovery after 5 seconds
            setTimeout(() => {
                let elem_disco = document.querySelectorAll('.tap-target');
                let instance_discovery = M.TapTarget.getInstance(elem_disco[0]);
                instance_discovery.close();
            }, 5000);
        // }, 3000);
    }
}, false);

/*             CONTACT            */
function launchContact() {
    let strAddr = "ZW0ra2kjdGJqbGlocA==";
    window.location.href = `mailto:${atob(strAddr).replace("+", ".").replace("#", "@").split("").reverse().join("")}`;
}