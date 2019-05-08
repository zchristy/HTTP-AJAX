import React, { Component } from 'react';
import axios from 'axios';

class FriendsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  addFriend = event => {
    event.preventDefault();

    const newFriend = {
      id: Date.now(),
      name: event.target.querySelector('#name').value,
      age: event.target.querySelector('#age').value,
      email: event.target.querySelector('#email').value
    }

    axios.post('http://localhost:5000/friends', newFriend)
    .then(res => {
      this.setState({
        friends: res.data
      })
    })
    .catch(error => {
      console.log(error);
    });

    event.target.reset();
  }

  componentDidMount() {
    axios.get('http://localhost:5000/friends')
    .then(res => {
      this.setState({
        friends: res.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const friendInfo = this.state.friends.map(friend => {
      return (
        <div key={friend.id}>
          <h1>{friend.name}</h1>
          <p>{friend.age}</p>
          <p>{friend.email}</p>
        </div>
      )
    })
    return (
      <div>
        <form onSubmit={this.addFriend}>
          <input id='name' type='text' placeholder="name" required/>
          <input id='age' type='text' placeholder="age" required/>
          <input id='email' type='email' placeholder="email" required/>
          <button>Submit</button>
        </form>
        {friendInfo}
      </div>
    );
  }

}

export default FriendsList;
