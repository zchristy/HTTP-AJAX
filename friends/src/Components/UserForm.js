import React, { Component } from 'react';

import { Form, Button } from '../Styles/styles';


class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: {
        id: Date.now(),
        name: '',
        age: '',
        email: ''
      }
    }
  }

  changeHandler = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [name]: value
      }
    }));
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.friend);
    event.target.addEventListener('reset', this.reset());
  }

  reset = () => {
    this.setState({
      friend: {
        id: Date.now(),
        name: '',
        age: '',
        email: ''
      }
    })
  }

  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <input
          onChange={this.changeHandler}
          name='name'
          value={this.state.friend.name}
          placeholder="name"
          required
        />
        <input
          onChange={this.changeHandler}
          name='age'
          value={this.state.friend.age}
          placeholder="age"
          required
        />
        <input
          onChange={this.changeHandler}
          name='email'
          value={this.state.friend.email}
          placeholder="email"
          required
        />
        <Button>Submit</Button>
      </Form>
    );
  }

}

export default UserForm;
