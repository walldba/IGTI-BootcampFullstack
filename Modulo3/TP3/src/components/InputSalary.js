import React, { Component } from "react";

export default class InputSalary extends Component {
  render() {
    const { value, handleInputChange } = this.props;

    return (
      <div>
        <h1>React Salary</h1>
        <div className="input-field col s12">
          <p>Salário Bruto</p>
          <input
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
