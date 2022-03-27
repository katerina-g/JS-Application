import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats as catInfo } from './catSeeder.js'


const allCats = document.getElementById('allCats')



const template = (cats) => html`
<ul>
    ${cats.map(cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${clickEvent} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`)}
</ul>
`;

const result = template(catInfo)
render(result, allCats)

function clickEvent(e) {

    const catDisplay = e.target.parentElement.querySelector('div');
    if (catDisplay.style.display == 'block') {
        catDisplay.style.display = 'none'
        e.target.textContent = 'Show status code';
    } else {
        catDisplay.style.display = 'block'
        e.target.textContent = 'Hide status code';
    }
}
