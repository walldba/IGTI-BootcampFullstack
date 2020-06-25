import React, { Component } from "react";

export default class Preloader extends Component {
  render() {
    return (
      <>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
        <strong>Por favor, digite seu salário bruto. 😎</strong>
      </>
    );
  }
}
