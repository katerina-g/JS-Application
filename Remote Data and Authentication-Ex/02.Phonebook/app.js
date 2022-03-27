function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContact);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    phoneList.addEventListener('click',onDelete)
    loadContact();
}

const phoneList = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

attachEvents();

async function onDelete(event) {
    const id = event.target.dataset.id;
    if (id != undefined) {
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}

async function onCreate() {
    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = {person, phone};
    const result = await createContact(contact);
    phoneList.appendChild(createElement(result));

}
async function loadContact() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();
    phoneList.replaceChildren();
    Object.values(data).map(createElement).forEach(i => phoneList.appendChild(i))

}

function createElement(contact) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button data-id="${contact._id}">Delete</button>`;
    return liElement
}
async function createContact(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    const result = await res.json();
    return result;
}

async function deleteContact(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/` + id
    const res = await fetch(url, {
        method: 'delete'
    });
    const result = await res.json();
    return result;
}