import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
  }

  signInWithPopup(e){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOutWithPopup(e){
    this.props.firebase.auth().signOut();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

//  displayName(user){

    //if user is a user, or equal to e.target.value
//    const isUser = this.props.user;
//    if (isUser){
//      return this.props.user.displayName;
//    }

    //if user is a guest
//    else (!isUser){

//    }
//  }

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
