import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
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
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const wrapper = document.getElementById('container');
ReactDOM.render(<App />, wrapper);
