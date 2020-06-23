import React, { Component } from "react";
import { formatNumber, formatPercent } from "../helper/formatHelpers";

export default class InputSalaryReadOnly extends Component {
  render() {
    const { tittle, value, percent } = this.props;
    if (percent === undefined) {
      return (
        <div className="input-field col s3">
          <p>{tittle}</p>
          <input value={formatNumber(value)} readOnly />
        </div>
      );
    } else {
      return (
        <div className="input-field col s3">
          <p>{tittle}</p>
          <input
            value={`${formatNumber(value)} (${formatPercent(percent)}%)`}
            readOnly
          />
        </div>
      );
    }
  }
}
