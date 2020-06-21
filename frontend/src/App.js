import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import AuthPage from './components/Auth';
import Blank from '.';

class App extends Component {

  render() {
    return (
			<BrowserRouter>
				<Redirect path="/" to="/auth" />
        <Route path="/auth" component={AuthPage} />
        <Route path="/lists" component={null} />
        <Route path="/search" component={null} />
      </BrowserRouter>
    );
  }
  
}

export default App;
