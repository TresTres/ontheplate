// App.js

import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


import AuthPage from './pages/auth/Auth';
import HomePage from './pages/Home';
import ListsPage from './pages/lists/Lists';

import MainNavigation from './components/nav/MainNav';
import AuthContext from './context/auth-context';

class App extends Component {

	state = {
		userID: ''
	};

	authenticate = (userID) => {
		this.setState({
			userID: userID
		});
	};

	signout = () => {
		this.setState({
			userID: ''
		})
	};

  render() {
    return (
			<BrowserRouter>
				<Fragment>
					<AuthContext.Provider value={{
						userID: this.state.userID,
						authenticate: this.authenticate,
						signout: this.signout
					}}>
						<Switch>
							<main className="main-content">
								{!this.state.userID && <Redirect to="/auth" exact />}
								{!this.state.userID && <Route path="/auth" component={AuthPage} />}
								{this.state.userID && <Redirect path="/" to="/home" exact />}
								{this.state.userID && <Redirect path="/auth" to="/home" exact />}
								{this.state.userID &&
									<Fragment>
										<Route path="/home" component={HomePage} />
										<Route path="/lists" component={ListsPage} />
										<Route path="/search" component={null} />
										<Route path="/profile" component={null} />
									</Fragment>
								}
							</main>
						</Switch>
						<MainNavigation />
				</AuthContext.Provider>
				</Fragment>
			</BrowserRouter>
    );
  }
  
}

export default App;
