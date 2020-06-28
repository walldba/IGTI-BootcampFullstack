import React from "react";
import { formatNumber, formatPercent } from "../helper/formatHelpers";

export default function InputSalaryReadOnly(props) {
  const { tittle, value, percent } = props;
  if (percent === undefined || isNaN(percent)) {
    return (
      <div className="input-field col s3">
        <strong>{tittle}:</strong>
        <input value={formatNumber(value)} readOnly />
      </div>
    );
  } else {
    return (
      <div className="input-field col s3">
        <strong>{tittle}:</strong>
        <input
          value={`${formatNumber(value)} (${formatPercent(percent)}%)`}
          readOnly
        />
      </div>
    );
  }
}
