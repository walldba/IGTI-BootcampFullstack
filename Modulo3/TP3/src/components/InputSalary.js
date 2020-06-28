import React, { useRef, useEffect } from "react";
import css from "./style.module.css";

export default function InputSalary({ value, handleInputChange }) {
  const textInput = useRef(null);

  useEffect(() => {
    document.title = `Salário ${value}`;
    textInput.current.focus();
  }, [value]);

  return (
    <div>
      <div className="input-field col s12">
        <strong>Salário Bruto:</strong>
        <input
          ref={textInput}
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
