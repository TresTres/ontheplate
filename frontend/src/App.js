// App.js

import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'


import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import ListsPage from './pages/Lists';

import MainNavigation from './components/nav/MainNav'

class App extends Component {

  render() {
    return (
			<BrowserRouter>
				<Fragment>
					<Switch>
						<main className="main-content">
							<Redirect path="/" to="/auth" exact />
							<Route path="/auth" component={AuthPage} />
							<Route path="/home" component={HomePage} />
							<Route path="/lists" component={ListsPage} />
							<Route path="/search" component={null} />
							<Route path="/profile" component={null} />
						</main>
					</Switch>
					<MainNavigation />
				</Fragment>
			</BrowserRouter>
    );
  }
  
}

export default App;
