import { html } from '../lib.js';
import { getUserData } from "../util.js";
import { getByYear } from '../api/data.js';


const searchTemplate = (cars, onClick) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click${onClick}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${cars.length == 0 
        ? html`<p class="no-cars"> No results.</p>`
        : html`${cars.map(searchedCard)}`}
    </div>
    </div>
</section>`

const searchedCard = (car) => html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: {car.year}</h3>
            <h3>Price: {car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`


export async function searchPage(ctx) {      
   
    ctx.render(searchTemplate(onClick));
    
async function onClick(e){
    e.preventDefault()
    let year = document.getElementById("search-input").value
    year = Number(year)
    if(!isNaN(year)){
        const carData = await getByYear(year);
        ctx.render(detailsTemplate(onClick, carData));

        console.log(carData);
    }else{
        alert('Please enter a number!');
    }
}

}