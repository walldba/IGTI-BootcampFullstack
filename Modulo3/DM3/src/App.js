import React, { useState } from "react";
import Form from "./components/Form";
import Parcelas from "./components/Parcelas";

export default function App() {
  const [montante, setMontante] = useState(0);
  const [juros, setJuros] = useState(0);
  const [parcelas, setParcelas] = useState(0);
  const [listaParcelas, setListaParcelas] = useState([]);

  const handleValueChange = (valores) => {
    setMontante(valores.montante);
    setJuros(valores.juros);
    setParcelas(valores.parcelas);

    let listaTemp = [];
    for (let i = 1; i <= valores.parcelas; i++) {
      let valorPorcentagem =
        (parseFloat(valores.montante) * parseFloat(valores.juros)) / 100;
      valores.montante = parseFloat(valores.montante) + valorPorcentagem;
      let valorAumentoPorMes = valores.montante - montante;
      let valorCorrespondenteAPorcentagem =
        (valorAumentoPorMes * 100) / montante;

      listaTemp.push({
        id: i,
        montanteAtual: valores.montante.toFixed(2),
        valorAumentoPorMes: valorAumentoPorMes.toFixed(2),
        valorCorrespondenteAPorcentagem: valorCorrespondenteAPorcentagem.toFixed(
          2
        ),
      });
    }

    setListaParcelas(listaTemp);
  };

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <Form
        montante={montante}
        juros={juros}
        parcelas={parcelas}
        onValueChange={handleValueChange}
      />
      <Parcelas listaParcelas={listaParcelas} />
    </div>
  );
}
