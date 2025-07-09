import {url, options, ui} from "./index.js";

export class Details{
    
    async getItemData(itemId) {
    
        try {
            const response = await fetch(`${url}game?id=${itemId}`, options);
            const result = await response.json();
            return(result);
        } catch (error) {
            console.error(error);
            ui.DOMElements.cartoona.innerHTML = error;
        }
    }

}
