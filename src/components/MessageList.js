import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render(){
    return(
      <section>
      {
        this.state.messages.filter( message => message.roomID === this.props.activeRoom.key)
        .map( (message, index) =>
          <p className="messages" key={index}>{message.content}</p>,
        )

      }

      </section>
    );
  }
}

export default MessageList;
