import React from "react";
import css from "./styles.module.css";

export default function Form(props) {
  const { montante, juros, parcelas, onValueChange } = props;

  const handleInputChangeMontante = (event) => {
    onValueChange({
      montante: event.target.value,
      juros: juros,
      parcelas: parcelas,
    });
  };

  const handleInputChangeJuros = (event) => {
    onValueChange({
      montante: montante,
      juros: event.target.value,
      parcelas: parcelas,
    });
  };

  const handleInputChangeParcelas = (event) => {
    onValueChange({
      montante: montante,
      juros: juros,
      parcelas: event.target.value,
    });
  };

  return (
    <div>
      <form className={css.flexRow}>
        <div style={{ width: "32%" }} className="input-field">
          <input
            onChange={handleInputChangeMontante}
            id="inputMontanteInicial"
            type="number"
            step="100"
            value={montante}
          />
          <label className="active" htmlFor="inputMontanteInicial">
            Montante Inicial:
          </label>
        </div>

        <div style={{ width: "32%" }} className="input-field">
          <input
            onChange={handleInputChangeJuros}
            id="inputJurosMensal"
            type="number"
            step="0.1"
            min="-12"
            max="12"
            value={juros}
          />
          <label className="active" htmlFor="inputJurosMensal">
            Taxa de juros mensal:
          </label>
        </div>

        <div style={{ width: "32%" }} className="input-field">
          <input
            onChange={handleInputChangeParcelas}
            id="inputParcelas"
            type="number"
            step="1"
            min="1"
            max="36"
            value={parcelas}
          />
          <label className="active" htmlFor="inputParcelas">
            Período (meses):
          </label>
        </div>
      </form>
    </div>
  );
}
