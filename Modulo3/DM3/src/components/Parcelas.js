import React from "react";
import Parcela from "./Parcela";
import css from "./styles.module.css";

export default function Parcelas({ listaParcelas }) {
  return (
    <div className={css.flexRowParcelas}>
      {listaParcelas.map((parcela) => {
        return <Parcela parcela={parcela} key={parcela.id} />;
      })}
    </div>
  );
}
