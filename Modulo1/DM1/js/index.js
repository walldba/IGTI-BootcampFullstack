let students = [];
let searchField = null;
const input = document.querySelector('#input-students');
const button = document.querySelector('#btn-students');
const form = document.querySelector('#form-search');
const studentsQuery = document.querySelector('#students');
const staticsQuery = document.querySelector('#statics');

window.addEventListener('load', async () => {
    getEvents();
    button.disabled = true;
    students = await callApi();
    console.log(students);
})

function getEvents() {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    input.addEventListener('keyup', getInput);
    button.addEventListener('click', getClickButton);
}

async function callApi() {
    const data = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const response = await data.json();
    return students = response.results.map(x => {
        return {
            name: x.name.first + " " + x.name.last,
            picture: x.picture.thumbnail,
            gender: x.gender,
            age: x.dob.age
        }
    });
}

function getInput(event) {
    button.disabled = false;
    searchField = event.target.value;
    if (searchField === null || searchField === '') {
        button.disabled = true;
        return;
    }
}

function getClickButton() {
    const studentsSearch = students.filter(res => {
        return res.name.match(searchField);
    });
    console.log(studentsSearch);
    studentsQuery.innerHTML = renderStudents(studentsSearch);
    staticsQuery.innerHTML = renderStatics(studentsSearch);
}

function renderStudents(users) {
    let studentHtml = `<h5>${users.length} usuário(s) encontrado(s)</h5>`;

    for (var i in users) {
        studentHtml += `
        <div id="results-students">
          <img src="${users[i].picture}" alt="picture" />
          <span>${users[i].name}, ${users[i].age} anos</span>
        </div>
        `;
    }
    return studentHtml;
}

function renderStatics(users) {
    let staticsHtml = `<h5>Estatísticas</h5>`;

    const totalMale = users.filter(user => user.gender === "male").length;
    const totalFem = users.filter(user => user.gender === "female").length;
    const totalAges = users.reduce((acc, curr) => { return acc += curr.age; }, 0);
    let medianAge = (totalAges / users.length);
    console.log(totalAges);
    if (isNaN(medianAge)) {
        medianAge = 0;
    }

    const statHTML = `
    <div id="results-statics">
      <span>Sexo masculino: <strong>${totalMale}</strong></span>
      <span>Sexo feminino: <strong>${totalFem}</strong></span>
      <span>Soma das idades: <strong>${totalAges}</strong></span>
      <span>Média das idades: <strong>${medianAge.toFixed(2).replace('.', ',')}</strong></span>
      </div>
    `;
    staticsHtml += statHTML;

    return staticsHtml;
}


