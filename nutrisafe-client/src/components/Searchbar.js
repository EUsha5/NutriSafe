import React, { Component } from 'react'
// class SearchBar extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       username: ''
//     }
//   }

//   handleSearch (e) {
//     this.setState({ username: e.target.value })
//   }

//   handleGoClick () {
//     if (!this.props.github.isFetchingUser) {
//       this.props.actions.fetchUser(this.state)
//     }
//   }

//   render () {
//     return (
//       <div className='searchbar-container'>
//         <form onSubmit={e => e.preventDefault()}>
//           <input
//             type='text'
//             size='45'
//             placeholder='Search Das Food'
//             onChange={this.handleSearch.bind(this)}
//             value={this.state.username} />
//           <button
//             type='submit'
//             onClick={this.handleGoClick.bind(this)}>
//             Search
//           </button>
//         </form>
//       </div>
//     )
//   }
// }

// import './SearchBar.scss'
class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state={term:''};
  }
  onInputChange(term){
    const name = this.props.searchBoxName || undefined
    this.setState({term});
    if(this.props.onSearchTermChange){
      this.props.onSearchTermChange({name,term})
    }
  }
    render() {
      const name = this.props.searchBoxName || undefined
        return (
            <div className="search-box">
              <div className="search-icon">
                <img src="http://share.ashiknesin.com/search-icon.png" alt=""></img>
              </div>
              <input name={name} className="search-input" id="search" type="text" placeholder="Search" value={this.state.term}
                onChange={event=>this.onInputChange(event.target.value)} onKeyPress={this.props.onKeyPress|| null}/>
            </div>
        );
    }
}
 
export default SearchBar;

// export default SearchBar