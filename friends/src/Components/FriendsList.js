import React from 'react';
import { Link } from 'react-router-dom'
import UserForm from './UserForm';

import { FriendListContainer,
         FriendListUserFormContainer,
         FriendInfoContainer,
         FriendCard } from '../Styles/styles';

function FriendsList(props) {

  const friendSelector = friend => {
    props.onClick(friend)
  }

  return (
    <FriendListContainer>
      <FriendListUserFormContainer>
        <h2> Add New Friend </h2>
        <UserForm {...props} props={props} onSubmit={props.onSubmit}/>
      </FriendListUserFormContainer>
      <FriendInfoContainer>
        {props.friends.map(friend => {
          return (
            <FriendCard key={friend.id}>
              <Link to={`/friends/${friend.id}`} >
                <h1 onClick={() => friendSelector(friend)}>{friend.name}</h1>
              </Link>
              <h4>Age: {friend.age}</h4>
              <h4>{friend.email}</h4>
            </FriendCard>
          )
        })}
      </FriendInfoContainer>
    </FriendListContainer>
  );

}

export default FriendsList;
