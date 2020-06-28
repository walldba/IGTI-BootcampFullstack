import React from "react";
import css from "./styles.module.css";

export default function Parcela(props) {
  const { parcela } = props;
  return (
    <div className={`${css.boxParcela} ${css.flexParcela}`}>
      <div style={{ fontWeight: "bold" }}>{parcela.id}</div>
      <div style={{ marginLeft: "5px" }}>
        <div
          className={
            parcela.valorAumentoPorMes > 0
              ? css.colorPositive
              : css.colorNegative
          }
        >
          R$ {parcela.montanteAtual}
        </div>
        <div
          className={
            parcela.valorAumentoPorMes > 0
              ? css.colorPositive
              : css.colorNegative
          }
        >
          {parcela.valorAumentoPorMes > 0 ? "+" : "-"} R${" "}
          {parcela.valorAumentoPorMes}
        </div>
        <div
          className={
            parcela.valorAumentoPorMes > 0
              ? css.colorPercentPositive
              : css.colorPercentNegative
          }
        >
          {parcela.valorCorrespondenteAPorcentagem}%
        </div>
      </div>
    </div>
  );
}
