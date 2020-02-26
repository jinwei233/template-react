import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './app.module.scss';

import './index.scss';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value,
      };
    });
  }

  render() {
    return (
      <form>
        <input
          className={styles.red}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const wrapper = document.getElementById('container');
ReactDOM.render(<Form />, wrapper);
