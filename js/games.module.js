import {url, options} from "./index.js";


export class Games{
    constructor(uiInstance){
        this.ui = uiInstance;
    }


    async getData(genre) {
        try {
                const response = await fetch(`${url}games?category=${genre}`, options);
                const items = await response.json();
                //handle network error
                if (!items) {
                    console.log('hi from error');
                    this.DOMElements.cartoona.innerHTML = `<p class="text-danger">Failed to load games.</p>`;
                    this.DOMElements.loadingView.classList.replace(
                    "d-flex",
                    "d-none"
                    );
                    return;
                }
            return(items);
        } catch (error) {
            console.log('hi from error');
            console.error(error);
            this.ui.DOMElements.cartoona.innerHTML = `<p class="text-danger">Failed to load games.</p>`;
            this.ui.DOMElements.loadingView.classList.replace('d-flex', 'd-none');
        }
    }
}