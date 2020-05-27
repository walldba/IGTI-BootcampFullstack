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
    renderAll();
}

function renderAll() {
    studentsQuery.innerHTML = renderStudents(students);
    staticsQuery.innerHTML = renderStatics(students);
}

function getInput(event) {
    searchField = event.target.value;

    studentsFilter = students.filter(res => {
        const lowerName = res.name.toLowerCase();
        const lowerInput = searchField.toLowerCase();
        return lowerName.includes(lowerInput);
    });

    studentsQuery.innerHTML = renderStudents(studentsFilter);
    staticsQuery.innerHTML = renderStatics(studentsFilter);
}

function renderStudents(students) {
    let studentHtml = `<h5>Users found (${students.length})</h5>`;

    students.forEach(student => {
        const { name, picture, age, gender, email, country, city } = student;
        studentHtml += `
        <div id="results-students">
          <img src="${picture}" alt="picture" />
          <span>${name}, ${age} anos</span>
          <span>${email}</span>
          <span>${country}, ${city}</span>
        </div>
        `;
    });

    return studentHtml;
}

function renderStatics(students) {
    let staticsHtml = `<h5>Statistics</h5>`;

    const totalMale = students.filter(student => student.gender === "male").length;
    const totalFem = students.filter(student => student.gender === "female").length;
    const totalAges = students.reduce((acc, curr) => { return acc += curr.age; }, 0);
    let medianAge = (totalAges / students.length);

    if (isNaN(medianAge)) {
        medianAge = 0;
    }

    const statHTML = `
    <div id="results-statics">
      <span>Total Male: <strong>${totalMale}</strong></span>
      <span>Total Female: <strong>${totalFem}</strong></span>
      <span>Sum of ages: <strong>${totalAges}</strong></span>
      <span>Avarage ages: <strong>${medianAge.toFixed(2).replace('.', ',')}</strong></span>
      </div>
    `;
    staticsHtml += statHTML;

    return staticsHtml;
}


