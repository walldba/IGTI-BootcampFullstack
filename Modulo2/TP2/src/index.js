import express from 'express';
import fs from 'fs';

const { readFileSync, writeFileSync } = fs;
const app = express();
app.use(express.json());
const port = 3000;


function getStates() {
  const states = readFileSync("./src/archives/Estados.json", "utf-8", (err, data) => {
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
  const cities = readFileSync("./src/archives/Cidades.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data)
    }
  });

  return JSON.parse(cities);
}

app.get('/teste', (req, res) => {

  res.send('a');
});

app.listen(port, () => {
  console.log(`API started on port ${port}`);
  var teste = getStates();
  var teste2 = getCities();
});


// writeFile(`./src/teste/${state.Sigla}.json`, JSON.stringify(state), (err, data) => {
//   if (!err) {
//     console.log(data)
//   }
//   else {
//     console.log(err.message)
//   }
// });