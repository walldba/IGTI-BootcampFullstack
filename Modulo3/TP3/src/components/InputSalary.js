import React, { Component } from "react";
import css from "./style.module.css";

export default class InputSalary extends Component {
  render() {
    const { value, handleInputChange } = this.props;

    return (
      <div>
        <div className="input-field col s12">
          <strong>Salário Bruto:</strong>
          <input
            className={css.inputSalary}
            type="number"
            value={value}
            onChange={handleInputChange}
            min="1000"
          />
        </div>
      </div>
    );
  }
}
