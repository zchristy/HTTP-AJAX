import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';

import FriendsList from './Components/FriendsList';
import Friend from './Components/Friend';
import UserForm from './Components/UserForm';
import UpdateForm from './Components/UpdateForm';

import { AppContainer } from './Styles/styles';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      clickedFriend: {
        id: '',
        name: '',
        age: '',
        email: ''
      }
    }
  }

  addFriend = friend => {
    axios.post('http://localhost:5000/friends', friend)
    .then(res => {
      console.log(res);
      this.setState({
        friends: res.data
      })
    })
    .catch(error => {
      console.log(error);
    });

  }

  setClickedFriend = selectedfriend => {
    this.setState({
      clickedFriend: selectedfriend
    });
  }

  updateFriend = friend => {

    axios.put(`http://localhost:5000/friends/${friend.id}`, friend)
    .then(res => {
      this.setState({
        friends: res.data
      })
      this.props.history.push('/friends');
    })
    .catch(error => {
      console.log(error);
    });

  }

  deleteFriend = friend => {

    axios.delete(`http://localhost:5000/friends/${friend}`)
    .then(res => {
      this.setState({
        friends: res.data
      })
      this.props.history.push('/friends');
    })
    .catch(error => {
      console.log(error);
    });

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
    return (
      <AppContainer>

        <Route exact path='/' component={() => <a href="http://localhost:3000/friends">Go To Friends</a>} />

        <Route
          exact
          path='/friends'
          render= {(props) => (
             <FriendsList
                {...props}
                onSubmit={this.addFriend}
                friends={this.state.friends}
                friend={this.state.clickedFriend}
                onClick={this.setClickedFriend}
              />
          )} />

        <Route
          path='/friends/:id'
          render= {(props) => (
             <Friend {...props} friend={this.state.clickedFriend} onClick={this.deleteFriend} />
          )} />

          <Route
            path='/friend/update-form'
            render= {(props) => (
               <UpdateForm {...props} friend={this.state.clickedFriend} onSubmit={this.updateFriend} />
            )} />
      </AppContainer>
    );
  }
}
const AppWithRouter = withRouter(App);
export default AppWithRouter;
