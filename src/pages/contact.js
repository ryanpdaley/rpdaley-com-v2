import { Component } from 'react';

import * as gtag from '../lib/gtag';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleInput = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = (e) => {
    const { message } = this.state;
    e.preventDefault();

    gtag.event({
      action: 'submit_form',
      category: 'Contact',
      label: message,
    });

    this.setState({ message: '' });
  };

  render() {
    return (
      <>
        <h1>This is the Contact page</h1>
      </>
    );
  }
}
