import React, { Component } from "react";
import css from "./style.module.css";

export default class Footer extends Component {
  render() {
    return (
      <div className={`footer-copyright ${css.footer}`}>
        <div className="container">
          © {new Date().getFullYear()} Wallace Willer
          <a
            className="grey-text text-lighten-4 right"
            href="https://github.com/walldba"
          >
            Github
          </a>
        </div>
      </div>
    );
  }
}
