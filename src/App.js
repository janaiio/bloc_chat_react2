import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

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
      activeRoom: null
    }
  }

  setActiveRoom(room, index) { //this method sets the active room based on which the user clicks
      this.setState({ activeRoom: room.key });
  }


  //We need a method that will filter the MessageList based on the active roomID

  render() {
    return (
      <div className="App">
        <RoomList onClick={ e => this.setActiveRoom(e) }
          firebase={ firebase }
          rooms={ this.props.rooms }
        />
        <MessageList
          firebase={ firebase }
          messages={ this.props.messages }
        />
      </div>
    );
  }
}

export default App;
