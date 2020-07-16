// App.js

import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';


import AuthPage from './pages/auth/Auth';
import HomePage from './pages/Home';
import ListsPage from './pages/lists/Lists';

import MainNavigation from './components/nav/MainNav';
import AuthContext from './context/auth-context';
import { fetchRequest } from './utils/helper';

class App extends Component {

	state = {
		userID: '',
		isLoading: true
	};

	componentDidMount() {
		const requestBody = {
			query: `
				query {
					resumeID
				}
			`
		};
		fetchRequest(requestBody).
		then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed');
			}
			return res.json();
		}).
		then((resbody) => {
			const resdata = resbody.data;
			if (resdata.resumeID) {
				this.authenticate(resdata.resumeID);
			}
		}).then(() => {
			this.setState({ isLoading: false });
		}).
		catch((err) => {
			console.log(err);
		});
	}

	authenticate = (userID) => {
		this.setState({
			userID: userID
		});
	};

	signout = () => {
		this.setState({
			userID: ''
		});
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
								{this.state.isLoading && <LinearProgress /> }
								{!this.state.isLoading && <Fragment>
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
								</Fragment>}
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
