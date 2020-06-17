import React, { Component } from "react";
import { calculateSalaryFrom } from "./helper/salary";
import formatNumber from "./helper/formatHelpers";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      fullSalary: event.target.value,
    });
  };

  render() {
    const { fullSalary } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);

    return (
      <div className="row">
        <h1>React Salary</h1>
        <div className="input-field col s12">
          <p>Salário bruto:</p>
          <input
            type="number"
            value={fullSalary}
            onChange={this.handleInputChange}
            className="validate"
          />
        </div>

        <div className="input-field col s3">
          <p>Base INSS</p>
          <input value={formatNumber(baseINSS)} readOnly />
        </div>

        <div className="input-field col s3">
          <p>Desconto INSS</p>
          <input value={formatNumber(discountINSS)} readOnly />
        </div>

        <div className="input-field col s3">
          <p>Base IRPF</p>
          <input value={formatNumber(baseIRPF)} readOnly />
        </div>
        <div className="input-field col s3">
          <p>Desconto IRPF</p>
          <input value={formatNumber(discountIRPF)} readOnly />
        </div>
        <div className="input-field col s3">
          <p>Salário líquido</p>
          <input value={formatNumber(netSalary)} readOnly />
        </div>
      </div>
    );
  }
}
