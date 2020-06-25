import React, { Component } from "react";
import css from "./style.module.css";

export default class InputSalary extends Component {
  constructor() {
    super();

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  componentDidUpdate() {
    document.title = `Salário ${this.props.value}`;
  }

  render() {
    const { value, handleInputChange } = this.props;

    return (
      <div>
        <div className="input-field col s12">
          <strong>Salário Bruto:</strong>
          <input
            ref={this.textInput}
            className={css.inputSalary}
            type="number"
            value={value}
            onChange={handleInputChange}
            min="1"
          />
        </div>
      </div>
    );
  }
}
