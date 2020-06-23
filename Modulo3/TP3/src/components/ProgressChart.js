import React, { Component } from "react";
import { Chart } from "react-google-charts";

export default class ProgressChart extends Component {
  render() {
    const { valueINSS, valueIRRF, valueSalary } = this.props;
    const options = {
      title: "Gráfico Salário",
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
