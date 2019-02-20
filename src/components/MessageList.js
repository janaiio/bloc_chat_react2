import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
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

  sendMessages(e){
    const newMessage = this.state.newMessage;
    e.preventDefault()
    this.messagesRef.push({
      username: this.props.firebase.auth().currentUser.displayName,
      content: newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.activeRoom.key
    });
  }

  handleChange(e){
    this.setState({ newMessage: e.target.value });
  }

  render(){
    return(
      <section>
      {
        this.state.messages.filter( message => message.roomID === this.props.activeRoom.key)
        .map( (message, index) =>
          <p className="messages" key={index}>{message.username} {message.content} {message.sentAt}</p>,
        )

      }

      <form onSubmit={(e) => this.sendMessages(e)}>
        <label>
          Write Your Message Here:
          <input type="text" value={this.state.newMessage} onChange={ e => this.handleChange(e) }/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      </section>
    );
  }
}

export default MessageList;
