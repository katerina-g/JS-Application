import { html, render } from './node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'


const townsField = document.getElementById('towns')
const input = document.getElementById("searchText")
const output = document.getElementById('result')
const button = document.querySelector("button")
button.addEventListener('click', getInfo)
function search() {

}
let townsName = towns.map(town => ({ name: town, match: false }))

const townsTemplate = (towns) => html`
<ul>
   ${towns.map(town => html`<li class=${town.match ? 'active' : "" }>${town.name}</li>`)}
</ul>
`

let result = townsTemplate(townsName)



function renderTowns() {
   render(townsTemplate(townsName), townsField)
}



function getInfo(e) {

   let count = 0
   const match = input.value.trim().toLocaleLowerCase();
   for (let town of townsName) {
      if (town.name.toLocaleLowerCase().includes(match)) {
         count++;
         town.match = true
      } else {
         town.match = false
      }

   }
   
   if (input.value == "") {
      count = 0
   }
   // if match is only 1 change text
   output.textContent = count == 1 ? `${count} match found` : `${count} matches found`
  input.value = ""
   renderTowns()
}

renderTowns()