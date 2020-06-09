import express from 'express';
import fs, { readFile } from 'fs';

const { readFileSync, writeFileSync } = fs;
const app = express();
app.use(express.json());
const port = 3000;

function getStates() {
  const states = readFileSync("./src/archives/States.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data)
    }
  });

  return JSON.parse(states);
}

function getCities() {
  const cities = readFileSync("./src/archives/Cities.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data)
    }
  });

  return JSON.parse(cities);
}

function createArchives() {
  const states = getStates();
  const cities = getCities();

  const teste = states.find(state => {
    let city = cities.filter(city => {
      return city.Estado == state.ID;
    });
    writeFileSync(`./src/citiesOfStates/${state.Sigla}.json`, JSON.stringify(city))
  });
}

app.get('/States/:uf', (req, res) => {
  let uf = req.params.uf.toUpperCase();
  try {
    const file = readFileSync(`./src/citiesOfStates/${uf}.json`, 'utf-8');
    const cities = JSON.parse(file);
    res.send({
      city: uf, numberOfCities: cities.length
    });
  } catch (error) {
    res.status(400).send(error.message)
  }
});

app.listen(port, () => {
  console.log(`API started on port ${port}`);
  createArchives()
});
