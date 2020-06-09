import express from "express";
import fs from "fs";

const { readFileSync, writeFileSync } = fs;
const app = express();
app.use(express.json());
const port = 3000;

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

app.get("/States/:uf", (req, res) => {
  let uf = req.params.uf.toUpperCase();
  try {
    const file = readFileSync(`./src/citiesOfStates/${uf}.json`, "utf-8");
    const cities = JSON.parse(file);
    res.send({
      city: uf,
      numberOfCities: cities.length,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`API started on port ${port}`);
  createArchives();
});
