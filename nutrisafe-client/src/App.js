import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import AuthService from './components/user/authService';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Navbar from './components/Navbar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedInUser: null};
    this.service = new AuthService();
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser(){
    // console.log("running the fetch user function ******************");
    if(this.state.loggedInUser === null){
      this.service.loggedin()
      .then(response => {
        console.log("response from the fetch user function ^&&^&&^&^^&^&^&^&^&^&^&^&^&&^&^&^&^&&^&^&&^^&", response);
        this.setState({
          loggedInUser: response
        })
      })
      .catch(err => {
        console.log("error from the fetch user function %%%%%%%%%%%%&&&&&&&&&&&&&$$$$$$$$$$$$$$$$$$$$$", err);
        this.setState({
          loggedInUser: false
        })
      }) 
    }
  }

  render() {
    this.fetchUser();
    return (
      <div className="App">
        <Navbar setTheUser={this.getTheUser} userInSession={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/signup" render={() =><Signup setTheUser={this.getTheUser}/>} />
          <Route exact path='/login' render={() => <Login setTheUser={this.getTheUser}/>} />
          {/* <Route exact path="/login" Component={Login} /> */}

       </Switch>
      </div>
    );
  }
}

export default App;
