import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: ''
    };

    this.usersRef = this.props.firebase.database().ref('users');
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }


    signInWithPopup(e){
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup( provider );
      console.log('sign in');
    }

    signOutWithPopup(e){
      this.props.firebase.auth().signOut();
    }

  render(){
    return(
      <section className="user-signInOut">
        {
          this.props.user.displayName
        }
        <button id="signIn" onClick={ e => this.signInWithPopup(e) }>Sign In</button>
        <button id="signOut" onClick={ e => this.signOutWithPopup(e) }>Sign Out</button>
      </section>
    );
  };
}

export default User;
