import React, { Component } from 'react';
import css from './Filter.module.css';
export class Filter extends Component {
  state = {
    filter: '',
  };
  handleInputChange = ({ target }) => {
    this.props.filterHandler(target.value.toLowerCase());
    this.setState({ filter: target.value });
  };
  render() {
    return (
      <div className={css.container}>
        <p>Find contacts by name</p>
        <input
          className={css.input}
          type="text"
          value={this.state.filter}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Filter;
