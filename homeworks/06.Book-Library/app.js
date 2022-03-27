import { del, get, post, put } from "./api/api.js"
import { html, render } from "./node_modules/lit-html/lit-html.js"

const body = document.querySelector('body')
const loadBooks = document.getElementById("loadBooks")
loadBooks.addEventListener('click', getData)
let currentBookId = ""
let booksInfo = ''

async function getData() {
    const books = Object.entries(await get('/jsonstore/collections/books'))
    booksInfo = books
    viewData(books)
}

function viewData(books) {
    let result = template(books)
    render(result, body)
}


async function editBookView(e) {
    const element = e.target.parentElement.parentElement;
    const bookId = element.id
    currentBookId = bookId
    const data = await get('/jsonstore/collections/books/' + bookId)
    let result = editTemplate(booksInfo, data)
    render(result, body)
}

async function updateBook(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title').trim()
    const author = formData.get('author').trim()

    try {
        if (author == "" || title == "") {
            throw new Error('All fields are required')
        }
        put('/jsonstore/collections/books/' + currentBookId, { author, title })
        getData()
        e.target.reset()
    } catch (error) {
        alert(error)
    }
}

async function deleteBook(e) {
    const element = e.target.parentElement.parentElement;
    const bookId = element.id
    del('/jsonstore/collections/books/' + bookId);
    element.remove()
}

function addBook(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title').trim()
    const author = formData.get('author').trim()

    try {
        if (author == "" || title == "") {
            throw new Error('All fields are required')
        }
        post('/jsonstore/collections/books', { author, title })
        getData()
        e.target.reset()
    } catch (error) {
        alert(error)
    }
}

const template = (books) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${books.map(b => html`
        <tr id=${b[0]}>
            <td>${b[1].title}</td>
            <td>${b[1].author}</td>
            <td>
                <button @click=${editBookView}>Edit</button>
                <button @click=${deleteBook}>Delete</button>
            </td>
        </tr>
        `)}
    </tbody>
</table>
<form id="add-form" @submit=${addBook}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>
`
const editTemplate = (books, data) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${books.map(b => html`
        <tr id=${b[0]}>
            <td>${b[1].title}</td>
            <td>${b[1].author}</td>
            <td>
                <button @click=${editBookView}>Edit</button>
                <button @click=${deleteBook}>Delete</button>
            </td>
        </tr>
        `)}
    </tbody>
</table>
<form id="edit-form" @submit=${updateBook}>
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" .value=${data.title} placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" .value=${data.author} placeholder="Author...">
    <input type="submit" value="Save">
</form>
`
