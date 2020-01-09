import React from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

//initializing app
firebase.initializeApp({
  apiKey: "AIzaSyBrj1hTv-OP9zJhLGoQEZ61N1TyPlhp6jo",
  authDomain: "askem-game.firebaseapp.com"
})

class App extends React.Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,

    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  //mount users and change status to true which has an object or user
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <h1>Welcome {firebase.auth().currentUser.displayName}!!</h1>
            <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
            <img alt="Prof Pic" src={firebase.auth().currentUser.photoURL} />
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
      </div>
    )
  }
}


export default App;
