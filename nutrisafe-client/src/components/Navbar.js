import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from './user/authService';
import SearchBar from './Searchbar';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {loggedInUser: null};
    this.service = new AuthService();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
    // console.log('???????????Logged In User?????????', this.state.loggedInUser);
  }
  

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      console.log("logging out the user from the session ###################### ", this.state);
      this.setState({ loggedInUser: null });
      this.props.setTheUser(null);  
      console.log("the logged in user info after the log out function $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ", this.state.loggedInUser);
    })
  }



  displayInfo(){
    if(this.state.loggedInUser){
      // console.log('============', this.state.loggedInUser);
      return(

        <nav className="navbar-logout">
          <SearchBar searchBoxName={"userNameSearch"} onSearchTermChange={this.onSearch} />
          <ul>
            <li>Welcome, {this.state.loggedInUser.firstName}</li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/profile/book/:id'>RecipeBook</Link></li>
            <li><Link to='/recipes/:id'>Recipe</Link></li>
            <li><Link to='/recipes/create/:id'>CreateRecipe</Link></li>
            <li>
              {/* <Link to='/'> */}
                <button onClick={() => this.logoutUser()}>Logout</button>
              {/* </Link> */}
            </li>
          </ul>
        </nav>

      )
    } else {
      return ( 
        <nav className="navbar-login">
        <SearchBar />
          <ul>
            <li><Link to='/'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/profile/book/:id'>RecipeBook</Link></li>
            <li><Link to='/recipes/:id'>Recipe</Link></li>
            <li><Link to='/recipes/create/:id'>CreateRecipe</Link></li>

          </ul>
        </nav>
      )
    }
  }

  render(){
    // this.fetchUser()
    // console.log("the current state info from the nav component ==============================", this.state)
    return(
      <div>
        {/* <h2> hello world </h2> */}
        {this.displayInfo()}
      </div>
    )
    // if(this.state.loggedInUser !== false){
    //   // console.log('============', this.state.loggedInUser);
    //   return(
    //     <nav className="navbar-logout">
    //       <ul>
    //         <li>Welcome, {this.state.loggedInUser.firstName}</li>
    //         <li><Link to='/profile'>Profile</Link></li>
    //         <li>
    //           <Link to='/'>
    //             <button onClick={() => this.logoutUser()}>Logout</button>
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   )
    // } else {
    //   return ( 
    //     <nav className="navbar-login">
    //       <ul>
    //         <li><Link to='/login'>Login</Link></li>
    //         <li><Link to='/signup'>Signup</Link></li>
    //       </ul>
    //     </nav>
    //   )
    // }
    }
  }
  export default Navbar;