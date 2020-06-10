import express from "express";
import fs from "fs";

const { readFileSync, writeFileSync } = fs;
const app = express();
const port = 3000;

app.use(express.json());

function getStates() {
  try {
    const states = readFileSync("./src/archives/States.json", "utf-8");
    return JSON.parse(states);
  } catch (error) {
    console.log(error.message);
  }
}

function getCities() {
  try {
    const cities = readFileSync("./src/archives/Cities.json", "utf-8");
    return JSON.parse(cities);
  } catch (error) {
    console.log(error.message);
  }
}

function createArchives() {
  const states = getStates();
  const cities = getCities();

  states.find((state) => {
    let city = cities.filter((city) => {
      return city.Estado == state.ID;
    });
    writeFileSync(
      `./src/citiesOfStates/${state.Sigla}.json`,
      JSON.stringify(city)
    );
  });
}

function getStateByUf(uf) {
  try {
    const file = readFileSync(`./src/citiesOfStates/${uf}.json`, "utf-8");
    const cities = JSON.parse(file);

    return {
      city: uf,
      numberOfCities: cities.length,
    };
  } catch (error) {
    console.log(error);
  }
}

function sortUfAsc() {
  const result = [];
  const arrayStates = [];
  const states = getStates();
  states.forEach((state) => {
    arrayStates.push(getStateByUf(state.Sigla));
  });

  const order = arrayStates
    .sort((a, b) => b.numberOfCities - a.numberOfCities)
    .slice(0, 5);

  order.forEach((x) => {
    result.push(`${x.city} - ${x.numberOfCities}`);
  });

  console.log(result);
}

function sortUfDesc() {
  const result = [];
  const arrayStates = [];
  const states = getStates();
  states.forEach((state) => {
    arrayStates.push(getStateByUf(state.Sigla));
  });

  const order = arrayStates
    .sort((a, b) => a.numberOfCities - b.numberOfCities)
    .slice(0, 5);

  order.forEach((x) => {
    result.push(`${x.city} - ${x.numberOfCities}`);
  });

  console.log(result);
}

function biggestUfName() {
  const arrayStates = [];
  const states = getStates();
  states.find((state) => {
    let currentName = "";
    let arrayName = [];
    let cities = JSON.parse(
      readFileSync(`./src/citiesOfStates/${state.Sigla}.json`, "utf-8")
    );
    cities.filter((city) => {
      if (city.Nome.length == currentName.length) {
        arrayName = [currentName, city.Nome];
        currentName = arrayName.sort()[0];
      }
      if (city.Nome.length > currentName.length) {
        currentName = city.Nome;
      }
    });
    arrayStates.push(`${currentName} - ${state.Sigla} `);
  });

  console.log(arrayStates);
}

function smallestUfName() {
  const arrayStates = [];
  const states = getStates();
  states.find((state) => {
    let currentName = "";
    let currentNameLenght = 30;
    let arrayName = [];
    let cities = JSON.parse(
      readFileSync(`./src/citiesOfStates/${state.Sigla}.json`, "utf-8")
    );
    cities.filter((city) => {
      if (city.Nome.length == currentName.length) {
        arrayName = [currentName, city.Nome];
        currentName = arrayName.sort()[0];
      }
      if (city.Nome.length < currentNameLenght) {
        currentNameLenght = city.Nome.length;
        currentName = city.Nome;
      }
    });
    arrayStates.push(`${currentName} - ${state.Sigla} `);
  });

  console.log(arrayStates);
}

app.listen(port, () => {
  console.log(`API started on port ${port}`);
  createArchives();
  sortUfAsc();
  sortUfDesc();
  biggestUfName();
  smallestUfName();
});
