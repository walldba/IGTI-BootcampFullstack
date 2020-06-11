import express from "express";
import { promises } from "fs";

const { readFile, writeFile } = promises;
const app = express();
const port = 3000;

app.use(express.json());

async function getStates() {
  try {
    const states = await readFile("./src/archives/States.json", "utf-8");
    return JSON.parse(states);
  } catch (error) {
    console.log(error.message);
  }
}

async function getCities() {
  try {
    const cities = await readFile("./src/archives/Cities.json", "utf-8");
    return JSON.parse(cities);
  } catch (error) {
    console.log(error.message);
  }
}

async function createArchives() {
  const states = await getStates();
  const cities = await getCities();

  states.find((state) => {
    let city = cities.filter((city) => {
      return city.Estado == state.ID;
    });

    writeFile(`./src/citiesOfStates/${state.Sigla}.json`, JSON.stringify(city));
  });
}

// function getStateByUf(uf) {
//   try {
//     const file = readFile(`./src/citiesOfStates/${uf}.json`, "utf-8");
//     const cities = JSON.parse(file);

//     return {
//       city: uf,
//       numberOfCities: cities.length,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

// function sortUfAsc() {
//   const result = [];
//   const arrayStates = [];
//   const states = getStates();
//   states.forEach((state) => {
//     arrayStates.push(getStateByUf(state.Sigla));
//   });

//   const order = arrayStates
//     .sort((a, b) => b.numberOfCities - a.numberOfCities)
//     .slice(0, 5);

//   order.forEach((x) => {
//     result.push(`${x.city} - ${x.numberOfCities}`);
//   });

//   console.log(result);
// }

// function sortUfDesc() {
//   const result = [];
//   const arrayStates = [];
//   const states = getStates();
//   states.forEach((state) => {
//     arrayStates.push(getStateByUf(state.Sigla));
//   });

//   const order = arrayStates
//     .sort((a, b) => a.numberOfCities - b.numberOfCities)
//     .slice(0, 5);

//   order.forEach((x) => {
//     result.push(`${x.city} - ${x.numberOfCities}`);
//   });

//   console.log(result);
// }

// function biggestUfName() {
//   const arrayStates = [];
//   const states = getStates();
//   states.find((state) => {
//     let currentName = "";
//     let arrayName = [];
//     let cities = JSON.parse(
//       readFile(`./src/citiesOfStates/${state.Sigla}.json`, "utf-8")
//     );
//     cities.filter((city) => {
//       if (city.Nome.length == currentName.length) {
//         arrayName = [currentName, city.Nome];
//         currentName = arrayName.sort()[0];
//       }
//       if (city.Nome.length > currentName.length) {
//         currentName = city.Nome;
//       }
//     });
//     arrayStates.push(`${currentName} - ${state.Sigla} `);
//   });

//   console.log(arrayStates);
// }

// function smallestUfName() {
//   const arrayStates = [];
//   const states = getStates();
//   states.find((state) => {
//     let currentName = "";
//     let currentNameLenght = 30;
//     let arrayName = [];
//     let cities = JSON.parse(
//       readFile(`./src/citiesOfStates/${state.Sigla}.json`, "utf-8")
//     );
//     cities.filter((city) => {
//       if (city.Nome.length == currentName.length) {
//         arrayName = [currentName, city.Nome];
//         currentName = arrayName.sort()[0];
//       }
//       if (city.Nome.length < currentNameLenght) {
//         currentNameLenght = city.Nome.length;
//         currentName = city.Nome;
//       }
//     });
//     arrayStates.push(`${currentName} - ${state.Sigla} `);
//   });

//   console.log(arrayStates);
// }

app.listen(port, async () => {
  console.log(`API started on port ${port}`);
  let states = await getStates();
  let city = await getCities();
  createArchives();
  // sortUfAsc();
  // sortUfDesc();
  // biggestUfName();
  // smallestUfName();
});
