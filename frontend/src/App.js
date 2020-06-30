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

		token: null,
		userID: null,
		userName: null
	};

	startSession = (token, userID, userName, tokenExpiration) => {
		this.setState({
			token,
			userID,
			userName
		});
	};

	endSession = () => {
		this.setState({
			token: null,
			userID: null,
			userName: null
		})
	};

  render() {
    return (
			<BrowserRouter>
				<Fragment>
					<AuthContext.Provider value={{
						token: this.state.token,
						userID: this.state.userName,
						userName: this.state.userName,
						startSession: this.startSession,
						endSession: this.endSession
					}}>
						<Switch>
							<main className="main-content">
								{!this.state.token && <Redirect path="/" to="/auth" exact />}
								{!this.state.token && <Route path="/auth" component={AuthPage} />}

								{this.state.token && <Redirect path="/" to="/home" exact />}
								{this.state.token && <Redirect path="/auth" to="/home" exact />}
								{this.state.token &&
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
