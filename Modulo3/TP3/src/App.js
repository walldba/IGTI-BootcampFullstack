import React, { Component } from "react";
import { calculateSalaryFrom } from "./helper/salary";
import { formatNumber, formatPercent } from "./helper/formatHelpers";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
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

    const percentBase = (discountINSS / fullSalary) * 100;
    const percentIRRF = (discountIRPF / fullSalary) * 100;
    const percentNetSalary = (netSalary / fullSalary) * 100;

    return (
      <div className="row">
        <form className="col s12">
          <h1>React Salary</h1>
          <div className="input-field col s12">
            <p>Salário Bruto</p>
            <input
              type="number"
              value={fullSalary}
              onChange={this.handleInputChange}
              min="1000"
            />
          </div>

          <div className="input-field col s3">
            <p>Base INSS</p>
            <input value={formatNumber(baseINSS)} readOnly />
          </div>

          <div className="input-field col s3">
            <p>Desconto INSS</p>
            <input
              value={`${formatNumber(discountINSS)} (${formatPercent(
                percentBase
              )}%)`}
              readOnly
            />
          </div>

          <div className="input-field col s3">
            <p>Base IRPF</p>
            <input value={formatNumber(baseIRPF)} readOnly />
          </div>
          <div className="input-field col s3">
            <p>Desconto IRPF</p>
            <input
              value={`${formatNumber(discountIRPF)} (${formatPercent(
                percentIRRF
              )}%)`}
              readOnly
            />
          </div>
          <div className="input-field col s3">
            <p>Salário líquido</p>
            <input
              value={`${formatNumber(netSalary)} (${formatPercent(
                percentNetSalary
              )}%)`}
              readOnly
            />
          </div>
        </form>
      </div>
    );
  }
}
