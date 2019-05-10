import React, { Component } from 'react';

import { Form, Button, FriendListUserFormContainer } from '../Styles/styles';


class UpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: []
    }
  }

  changeHandler = event => {
    let value = event.target.value;
    const name = event.target.name;

    if(name === 'age') {
      value = parseInt(value, 10);
    }

    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [name]: value
      }
    }));
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.friend)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    this.setState({
      friend: this.props.friend
    })
  }

  render() {
    console.log(this.state.friend);
    return (
      <FriendListUserFormContainer>
        <h2> Update Your Friend </h2>
        <Form onSubmit={this.submitHandler}>
          <input
            onChange={this.changeHandler}
            name='name'
            value={this.state.friend.name}
            placeholder="name"
          />
          <input
            onChange={this.changeHandler}
            name='age'
            value={this.state.friend.age}
            placeholder="age"
          />
          <input
            onChange={this.changeHandler}
            name='email'
            value={this.state.friend.email}
            placeholder="email"
          />
          <Button>Submit</Button>
          <h4 onClick={this.goBack}>Go Back</h4>
        </Form>
      </FriendListUserFormContainer>
    );
  }

}

export default UpdateForm;
