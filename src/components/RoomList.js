import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val(); //i.e. `room1`, `room2`, `room3`
        room.key = snapshot.key; //i.e. `name`
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }

    createRoom(e){ //adds an object(check terminology) "newRoomName" to the array
      const newRoomName = this.state.newRoomName;
      e.preventDefault()
      this.roomsRef.push({
        name: newRoomName
      });
    }

    handleChange(e){ //changes the state of the newRoomName (adds to firebase value, i.e. `room1`, ..., `newRoomName`)
      this.setState({ newRoomName: e.target.value });
    }

  render() {
    return (
      <section onClick = { this.props.setActiveRoom }>
        {
          this.state.rooms.map( (room, index) =>
            <p className="rooms" key={index} > {room.name}</p>,
          )
        }

        <form onSubmit={(e) => this.createRoom(e)}>
          <label>
            New Room Name:
            <input type="text" value={this.state.newRoomName} onChange={ e => this.handleChange(e) }/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default RoomList;
