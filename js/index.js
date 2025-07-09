import {Ui} from "./ui.module.js";
import {Games} from "./games.module.js";
import {Details} from "./details.module.js";


let items, itemData, genre;
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '6d74da5f2emshcaab42e7f561e18p149af7jsnce638bcc7b82',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

let ui = new Ui();
ui.load(); //load ui elements



let details = new Details();
let games = new Games(ui);


//load app and handle page refresh and page loading
if(sessionStorage.getItem('view') == 'main' && sessionStorage.getItem('items') && sessionStorage.getItem('genre')){
    items = JSON.parse(sessionStorage.getItem('items'));
    ui.displayGames(items);
    for(let i =0; i<ui.LINKS.length; i++){
        ui.LINKS[i].classList.remove('active');
        if(ui.LINKS[i].textContent == sessionStorage.getItem('genre')){
            ui.LINKS[i].classList.add('active');
        }
    }
} else if(sessionStorage.getItem('view') == 'detailsView' && sessionStorage.getItem('itemData')){
    items = JSON.parse(sessionStorage.getItem('items'));
    itemData = JSON.parse(sessionStorage.getItem('itemData'));
    ui.displayGames(items);
    ui.displayItemDetails(itemData);
    for(let i =0; i<ui.LINKS.length; i++){
        ui.LINKS[i].classList.remove('active');
        if(ui.LINKS[i].textContent == sessionStorage.getItem('genre')){
            ui.LINKS[i].classList.add('active');
        }
    }
} else{
    genre = sessionStorage.getItem('genre') || 'mmorpg' ;
    ui.loadApp(genre);
}



export {genre, url, options, ui, games, details, items};




