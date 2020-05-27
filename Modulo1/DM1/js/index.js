let students = [];
let studentsFilter = [];
let searchField = null;
const input = document.querySelector('#input-students');
const form = document.querySelector('#form-search');
const studentsQuery = document.querySelector('#students');
const staticsQuery = document.querySelector('#statics');

window.addEventListener('load', () => {
    getEvents();
    getStudents();
})

function getEvents() {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    input.addEventListener('keyup', getInput);
    input.focus();
}

async function getStudents() {
    const data = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const response = await data.json();
    students = response.results.map(user => {
        const { name, picture, dob, gender, email, location } = user;

        return {
            name: name.first + ' ' + name.last,
            picture: picture.large,
            age: dob.age,
            gender,
            email,
            country: location.country,
            city: location.city
        };
    });
}

function getInput(event) {
    searchField = event.target.value;

    if (searchField === null || searchField === '')
        return;

    studentsFilter = filterStudents();
    studentsQuery.innerHTML = renderStudents(studentsFilter);
    staticsQuery.innerHTML = renderStatics(studentsFilter);
}


function filterStudents() {
    return students.filter(res => {
        const lowerName = res.name.toLowerCase();
        const lowerInput = searchField.toLowerCase();
        return lowerName.includes(lowerInput);
    });
}

function renderStudents(users) {
    let studentHtml = `<h5>${users.length} usuário(s) encontrado(s)</h5>`;

    users.forEach(user => {
        const { name, picture, age, gender, email, country, city } = user;
        studentHtml += `
        <div id="results-students">
          <img src="${picture}" alt="picture" />
          <span>${name}, ${age} anos</span>
        </div>
        `;
    });

    return studentHtml;
}

function renderStatics(users) {
    let staticsHtml = `<h5>Estatísticas</h5>`;

    const totalMale = users.filter(user => user.gender === "male").length;
    const totalFem = users.filter(user => user.gender === "female").length;
    const totalAges = users.reduce((acc, curr) => { return acc += curr.age; }, 0);
    let medianAge = (totalAges / users.length);

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


