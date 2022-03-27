import { get, post } from "./api/api.js";
import { html, render } from "./node_modules/lit-html/lit-html.js"

const menu = document.getElementById('menu')
const form = document.querySelector('form')
form.addEventListener('submit', onSubmit)
const message = document.getElementById('message')

async function addItem() {
    const getInfo = await get('/jsonstore/advanced/dropdown')
    const allCity = Object.values(getInfo)
    render(template(allCity), menu)
}

const template = (cityes) => html`
${cityes.map(city => html`<option .value=${city._id}>${city.text}</option>`)}
`

async function onSubmit(e) {
    e.preventDefault()
    // check for exist city
    let allCityes = ([...e.target.parentElement.querySelectorAll('option')].map(s => s.textContent.toLocaleLowerCase()));

    let input = e.target.querySelector('#itemText');
    let newCity = input.value.trim()
    if (newCity != "" && !allCityes.includes(newCity.toLocaleLowerCase())) {
        post('/jsonstore/advanced/dropdown', { text: newCity })
        addItem()
        input.value = ""
        message.textContent = `Successfully added ${newCity}`
    } else if (newCity == "") {
        message.textContent = `You need to add sity name!!!`
    } else {
        message.textContent = `Ops...${newCity} is already exist`
    }
}

addItem()