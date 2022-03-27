import { html, render } from "./node_modules/lit-html/lit-html.js"
import { get } from "./api/api.js";

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const data = await get('/jsonstore/advanced/table')
   const tBody = document.querySelector('tbody')
   const inputField = document.getElementById('searchField')

   let students = Object.values(data)
   students.forEach(s => s.match = false)
   viewStudents(students, tBody)

   function onClick(e) {
      const input = inputField.value.toLocaleLowerCase().trim()
      for (const el of students) {
         let searchIn = Object.values(el)
         searchIn.pop()
         el.match = searchIn.some(x => x.toLocaleLowerCase().includes(input))
      };
      inputField.value = ""
      viewStudents(students, tBody)
   }
}

solve()




function viewStudents(students, tBody) {
   let result = students.map(s => template(s))
   render(result, tBody)
}


const template = (student) => html`
<tr class=${student.match ? "select" : "" }>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>
`