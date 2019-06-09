import React, { Component } from 'react';
import Header from './components/Header/';
import VlogsGrid from './components/VlogsGrid';
import API from './utils/API'

class App extends Component {
  state = {
    vlogs: []
  }

  componentDidMount() {
    this.fetchVlogs()
  }

  
  fetchVlogs = () => {
    API.getVlogs()
       .then(res => {
         console.log(res.data.items)
        const vlogs = res.data.items
         this.setState({ vlogs })
       })
       .catch(err => {
         console.log(err)
       })
  }

  render() {
    return(
      <div>
        <Header/>
        <VlogsGrid vlogs={this.state.vlogs}/>
      </div>
    )
    
  }
}

export default App;
