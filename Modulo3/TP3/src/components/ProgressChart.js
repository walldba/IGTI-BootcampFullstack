import React, { Component } from "react";
import { Chart } from "react-google-charts";
import Preloader from "./Preloader";
import css from "./style.module.css";

export default class ProgressChart extends Component {
  render() {
    const { value, valueINSS, valueIRRF, valueSalary } = this.props;
    const options = {
      titleTextStyle: { color: "black" },
      backgroundColor: "#eeeeee",
      pieSliceTextStyle: {
        color: "black",
      },
      legend: { textStyle: { color: "black" } },
      colors: ["#438a5e", "#ffcb74", "#c70039"],
      is3D: true,
    };

    const data = [
      ["Discriminação", "Quantidade"],
      ["Salário Líquido", valueINSS],
      ["Desconto INSS", valueIRRF],
      ["Desconto IRRF", valueSalary],
    ];

    if (value === 0 || value === "") {
      return (
        <div className={`col s12 ${css.preloader}`}>
          <Preloader />
        </div>
      );
    } else {
      return (
        <div className="col s12">
          <Chart
            width={"100%"}
            height={"auto"}
            chartType="PieChart"
            data={data}
            options={options}
          />
        </div>
      );
    }
  }
}
