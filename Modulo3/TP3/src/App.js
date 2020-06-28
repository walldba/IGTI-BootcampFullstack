import React, { useState } from "react";
import { calculateSalaryFrom } from "./helper/salary";
import InputSalary from "./components/InputSalary.js";
import InputSalaryReadOnly from "./components/InputSalaryReadOnly";
import ProgressChart from "./components/ProgressChart";
import css from "./components/style.module.css";
import Footer from "./components/Footer";

export default function App() {
  const [fullSalary, setFullSalary] = useState(0);

  const handleInputChange = (event) => {
    setFullSalary(event.target.value);
  };

  console.log(
    `%c🔥 Meet my Github: https://github.com/walldba 🔥`,
    "font-size:15px"
  );

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
    <>
      <div className={`container ${css.container}`}>
        <div className="row">
          <form className="col s12">
            <h1 className={css.tittle}>REACT SALARY</h1>
            <InputSalary
              value={fullSalary}
              handleInputChange={handleInputChange}
            />
            <InputSalaryReadOnly tittle={"Base INSS"} value={baseINSS} />
            <InputSalaryReadOnly
              tittle={"Desconto INSS"}
              value={discountINSS}
              percent={percentBase}
            />
            <InputSalaryReadOnly tittle={"Base IRPF"} value={baseIRPF} />
            <InputSalaryReadOnly
              tittle={"Desconto IRPF"}
              value={discountIRPF}
              percent={percentIRRF}
            />
            <InputSalaryReadOnly
              tittle={"Salário líquido"}
              value={netSalary}
              percent={percentNetSalary}
            />

            <ProgressChart
              value={fullSalary}
              valueINSS={netSalary}
              valueIRRF={discountIRPF}
              valueSalary={discountINSS}
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
