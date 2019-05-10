import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FriendCard, Button, ButtonContainer, FriendContainer } from '../Styles/styles';

class Friend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: {}
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  clickHandler = event => {
    event.preventDefault();
    this.props.onClick(this.props.friend.id);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/friendsById/${this.props.match.params.id}`)
    .then(res => {
        this.setState({
          friend: res.data
        })
    })
    .catch(err => console.log(err))
  }
  render() {
    const {name, age, email} = this.state.friend;

    return (
      <FriendContainer>
        <FriendCard>
          <h1>{name}</h1>
          <h4>Age: {age}</h4>
          <h4>{email}</h4>
          <ButtonContainer>
            <Button onClick={this.clickHandler}>Delete</Button>
            <Link to='/friend/update-form' ><Button>Update</Button></Link>
          </ButtonContainer>
          <h4 onClick={this.goBack}>Go Back</h4>
        </FriendCard>
      </FriendContainer>
    );
  }
}

export default Friend;
