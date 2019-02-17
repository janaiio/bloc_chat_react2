import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
//import User from './components/User.js';

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
      activeRoom: null,
      username: ''
    }
  }

  setActiveRoom(room, index) { //this method sets the active room based on which the user clicks
      this.props.room = this.props.room.value;
      this.setState({ activeRoom: this.props.room.value });
      console.log('called');
  }
  //We need a method that will filter the MessageList based on the active roomID

  setUser(e){
    this.setState({ user: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <RoomList
          setActiveRoom={ this.setActiveRoom.bind(this) }
          firebase={ firebase }
          rooms={ this.props.rooms }
        />
        <MessageList
          setActiveRoom={ this.setActiveRoom.bind(this) }
          firebase={ firebase }
          messages={ this.props.messages }
        />

      </div>
    );
  }
}

export default App;
