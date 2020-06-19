import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={null} />
        <Route path="/auth" component={null} />
        <Route path="/lists" component={null} />
        <Route path="/search" component={null} />
      </BrowserRouter>
    );
  }
  
}

export default App;
