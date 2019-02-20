import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA5x6rqZpDHgaslv-Aq7ks6yw0MRI4cCmI",
  authDomain: "bloc-chat-react-2-14191.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-2-14191.firebaseio.com",
  projectId: "bloc-chat-react-2-14191",
  storageBucket: "bloc-chat-react-2-14191.appspot.com",
  messagingSenderId: "384826750367"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: '',
      user: ''
    }
  }

  setActiveRoom(room) { //this method sets the active room based on which the user clicks
    this.setState({ activeRoom: room });
    console.log('active room set');
  }

  setUser(user){
//    console.log(user.uid);
      this.setState({ user: user }); //change value, User UID?
    }

  render() {
    return (
      <div className="App">
      <RoomList
        firebase={ firebase }
        rooms={ this.props.rooms }
        setActiveRoom={ this.setActiveRoom.bind(this) }
      />
      {
        this.state.activeRoom ? (
          <MessageList
            activeRoom={ this.state.activeRoom }
            firebase={ firebase }
            messages={ this.state.messages }
            newMessage={ this.state.newMessage }
          />
        ) : null
      }
      <User
        firebase={ firebase }
        setUser={ this.setUser.bind(this) }
        user={ this.state.user }
      />
      </div>
    );
  }
}

export default App;
