import { html, render } from "./node_modules/lit-html/lit-html.js";


document.querySelector('form').addEventListener('submit', onSubmit)
const divRoot = document.getElementById('root')

function onSubmit(e) {
    e.preventDefault();

    const input = document.getElementById("towns").value;
    const towns = input.split(',').map(town => town.trim());

    const result = template(towns);
    render(result, divRoot)

    console.log(result);
}

const template = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`;

