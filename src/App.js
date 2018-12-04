import React, { Component } from 'react';
import './App.css';
import Head from "./components/Head";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
class App extends Component {
  render() {
    return (
      <div className="App">
      	<Head></Head>
      	<Nav></Nav>
	        1111111
	        {this.props.children}
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
