let students = [];
let searchField = null;
const input = document.querySelector('#input-students');
const button = document.querySelector('#btn-students');
const form = document.querySelector('#form-search');

window.addEventListener('load', async () => {

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    button.disabled = true;
    getEvents();
    students = await callApi();
})

function getEvents() {
    input.addEventListener('keyup', getInput);
    button.addEventListener('click', getClickButton);
}

async function callApi() {
    const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    return await response.json();
}

function getInput(event) {
    button.disabled = false;
    searchField = event.target.value;
    if (searchField === null || searchField === '') {
        return;
    }
    const studentsSearch = students.results.filter(res => {
        return res.name.first.match(searchField);
    });
}

function getClickButton(event) {
    searchField = input.value;
    if (searchField === null || searchField === '') {
        return;
    }
    const studentsSearch = students.results.filter(res => {
        return res.name.first.match(searchField);
    });
    console.log(studentsSearch);
    document.querySelector('.users').appendChild(render(studentsSearch));
}

function render(users) {
    var list = document.createElement('ul');

    for (var i in users) {
        var item = document.createElement('li');

        item.appendChild(document.createTextNode(users[i].name.first));

        list.appendChild(item);
    }

    return list;

}


