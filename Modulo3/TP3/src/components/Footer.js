import React, { Component } from "react";
import css from "./style.module.css";

export default class Footer extends Component {
  render() {
    return (
      <div class={`footer-copyright ${css.footer}`}>
        <div class="container">
          © {new Date().getFullYear()} Wallace Willer
          <a
            class="grey-text text-lighten-4 right"
            href="https://github.com/walldba"
          >
            Github
          </a>
        </div>
      </div>
    );
  }
}
