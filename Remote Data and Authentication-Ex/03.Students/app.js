const url = 'http://localhost:3030/jsonstore/collections/students';

async function getStudents () {
    const response = await fetch(url);

    return await response.json();
}

async function postStudent (data) {
    const response = await fetch(url, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data))
    });

    return await response.json();
}

function extractStudents (studentsData) {
    const table = document.querySelector('#results > tbody');
    table.innerHTML = '';

    Object.values(studentsData).forEach(student => {
        const tr = document.createElement('tr');

        Object.entries(student).forEach(([key, value]) => {
            const td = document.createElement('td');

            if (key !== '_id') {
                td.innerHTML = value;
                tr.appendChild(td);
            }
        });

        table.appendChild(tr);
    })

}

function isValid (data) {
    return data.every(([_, value]) => value !== '');
}

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = [...formData.entries()];

    if (isValid(data)) {
        await postStudent(data);
        extractStudents(await getStudents());
        document.querySelectorAll('#form > div.inputs > input[type=text]').forEach(x => x.value = '');
    } else {
        alert('All field must be filled!')
    }
})



