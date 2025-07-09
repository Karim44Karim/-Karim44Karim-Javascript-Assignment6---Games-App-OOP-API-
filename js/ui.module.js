import {games, details} from "./index.js"

let items;

export class Ui {
    SELECTORS = {
        mainView: 'main',
        detailsSectionView: '#details-section',
        loadingView: '.loading',
        cartoona: '.cartoona',
    }
    GENRES = ['mmorpg', 'shooter', 'sailing', 'permadeath', 'superhero', 'pixel'];
    LINKS = document.querySelectorAll('.nav-link');

    DOMElements = {}
    load(){
        this.LINKS.forEach((link, index)=>{
            link.addEventListener('click', e=>{
                this.loadApp(this.GENRES[index]);
                this.LINKS.forEach(link => {
                    link.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
            })
        });
        for (const key in this.SELECTORS){
            this.DOMElements[key] = document.querySelector(this.SELECTORS[key]);
        }
    };
    
    async loadApp(genre){
        this.DOMElements.loadingView.classList.replace('d-none', 'd-flex');
        items = await games.getData(genre);
        sessionStorage.setItem('items', JSON.stringify(items));
        sessionStorage.setItem('genre', genre);
        sessionStorage.setItem('view', 'main');
        this.DOMElements.loadingView.classList.replace('d-flex', 'd-none');
        if (!items || !Array.isArray(items)) {
            this.DOMElements.cartoona.innerHTML = `<p class="text-danger">Failed to load games.</p>`;
            this.DOMElements.loadingView.classList.replace('d-flex', 'd-none');
            return;
        }
        this.displayGames(items);
}

    displayGames(items){
        this.DOMElements.cartoona.innerHTML='';
        for (let index = 0; index < items.length; index++) {
            this.DOMElements.cartoona.innerHTML += `
                        <div class="col-md-6 col-lg-4 col-xl-3" data-id="${items[index].id}">
                            <div class="card-custom card">
                                <div class="p-3">
                                    <div>
                                        <img src="${items[index].thumbnail}" alt="card-image">
                                    </div>
                                    <div class="">
                                        <div class="d-flex flex-row justify-content-between pt-3">
                                            <h4 class="card-title-custom">${items[index].title}</h4>
                                            <div class="card-title-lable">Free</div>
                                        </div>
                                        <div class="card-body-custom flex-grow-1">
                                            <p>${items[index].short_description.split(' ').slice(0,20).join(' ')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer card-footer-custom mt-auto">
                                    <div class="px-3 d-flex flex-row justify-content-between">
                                        <div class="card-footer-lable text-uppercase">${items[index].genre}</div>
                                        <div class="card-footer-lable">${items[index].platform}</div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
        //adding event listeners to all cards
        let itemsHTML = document.querySelectorAll('[data-id]');

        for(const item of itemsHTML){
        item.addEventListener('click', async (e)=>{
            this.DOMElements.loadingView.classList.replace('d-none','d-flex');
            this.DOMElements.mainView.classList.replace('d-block','d-none');
            let itemData = await details.getItemData(e.currentTarget.dataset.id);
            this.displayItemDetails(itemData);
            sessionStorage.setItem('itemData', JSON.stringify(itemData));
            sessionStorage.setItem('view', 'detailsView');
        })
        }
    }
    displayItemDetails(itemData){
        this.DOMElements.detailsSectionView.innerHTML = `
                    <div class="pt-4 d-flex justify-content-between align-items-center">
                <h2>Details Game</h2>
                <svg class="hideDetailsIcon" fill="#6C6D6F" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.77 460.77" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
            </div>
            <div class="d-md-flex justify-content-between">
                <div class="pt-4 col-md-4 container">
                    <img src="${itemData.thumbnail}" alt="">
                </div>
                <div class="py-4 container">
                    <h3>Title: <span>Title: ${itemData.title}</span></h3>
                    <ul>
                        <li>Category: <span class="text-uppercase">${itemData.genre}</span></li>
                        <li>Platform: <span class="text-capitalize">${itemData.platform}</span></li>
                        <li>Status: <span class="text-capitalize">${itemData.status}</span></li>
                    </ul>
                    <p>${itemData.description}</p>
                    <a class="btn btn-outline-warning text-white" href="${itemData.game_url}">Show Game</a>
                </div>
        `
        // adding event listener to close icon
        let hideDetailsIcon = document.querySelector('.hideDetailsIcon');
        hideDetailsIcon.addEventListener('click', ()=>{
            this.DOMElements.detailsSectionView.classList.replace('d-block', 'd-none');
            this.DOMElements.mainView.classList.replace('d-none', 'd-block');
            sessionStorage.setItem('view', 'main');
        })
        // hide main view and display the details section
        this.DOMElements.mainView.classList.replace('d-block', 'd-none');
        this.DOMElements.loadingView.classList.replace('d-flex','d-none');
        this.DOMElements.detailsSectionView.classList.replace('d-none', 'd-block');
    }
}
