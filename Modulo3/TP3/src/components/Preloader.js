import React from "react";

export default function Preloader() {
  return (
    <>
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
      <strong>Por favor, digite seu salário bruto.</strong>
      <span role="img" aria-label="smile">
        😎
      </span>
    </>
  );
}
