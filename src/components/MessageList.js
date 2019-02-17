import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => { //child_added?
      console.log(snapshot);

      //const message = snapshot.val();
      //message.key = snapshot.key;
      //this.setState({ messages: this.state.messages.concat( message ) })

    });
  }

//  associateRoom(){

//    {
//      username: "<USERNAME HERE>",
//      content: "<CONTENT OF THE MESSAGE HERE>",
//      sentAt: "<TIME MESSAGE WAS SENT HERE>", {}
//          var sessionsRef = firebase.database().ref("sessions");
//          sessionsRef.push({
//          startedAt: firebase.database.ServerValue.TIMESTAMP
//          });
//       };
//      roomId: "<ROOM UID HERE>"
//  };

//  }


  render(){
    return(
      <section>
      {
        this.state.messages.map( (message, index) =>
          <p className="messages" key={index} > {message.content}</p>,
        )
      }
      </section>
    );
  }
}

export default MessageList;
