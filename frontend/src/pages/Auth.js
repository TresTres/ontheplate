// Auth.js

import React, { Component } from 'react';
import { 
	Button,
	FormControl, 
	Input, 
	InputLabel
} from '@material-ui/core';

import { validateInput } from '../utils/helper';
import './Auth.css';

class AuthPage extends Component {


	state = {
		isLogin: true
	};

	constructor(props) {
		super(props);
		this.emailEl = React.createRef();
		this.userNameEl = React.createRef();
		this.passwordEl = React.createRef();
	}

	switchModeHandler = () => {
		this.setState(prevState => {

			return {isLogin: !prevState.isLogin};
		});
	}


	loginHandler = (event) => {
		event.preventDefault();
	
		const email = this.emailEl.value,
					password = this.passwordEl.value;

		if (validateInput([email, password]) === false) {
			return;
		}

		const requestBody = {
			query: `
				query {
					login(email: "${email}", password: "${password}") {
						userID
					}
				}
			`
		};

		fetch('http://localhost:4000/api', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).
		then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed');
			}
			return res.json();
		}).
		then((resbody) => {
			console.log(resbody);
		}).
		catch((err) => {
			console.log(err);
		});
	};

	createUserHandler = (event) => {

		event.preventDefault();
		const email = this.emailEl.value, 
					password = this.passwordEl.value,
					userName = this.userNameEl.value;

		if (validateInput([email, password, userName]) === false) {
			return;
		}

		const requestBody = {
			query: `
				mutation {
					createUser(userInput: {
						email: "${email}",
						password: "${password}",
						userName: "${userName}"
					}) {
						userName,
						email,
						creationDate
					}
				}
			`
		};
		
		fetch('http://localhost:4000/api', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		}).
		then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed');
			}
			return res.json();
		}).
		then((resbody) => {
			console.log(resbody);
		}).
		catch((err) => {
			console.log(err);
		});
	};


	render() {

		return (
			<form className="auth-form" 
				onSubmit={this.state.isLogin ? this.loginHandler : this.createUserHandler}>
				<FormControl required fullWidth={true} className="form-control">
					<InputLabel htmlFor="email">E-Mail</InputLabel>
					<Input type="email" id="email-input" inputRef={(ref) => {this.emailEl = ref}}/>
				</FormControl>
				{ !this.state.isLogin &&
					<FormControl required fullWidth={true} className="form-control">
						<InputLabel htmlFor="userName">User Name</InputLabel>
						<Input type="username" id="username-input" inputRef={(ref) => {this.userNameEl = ref}}/>
					</FormControl> }
				<FormControl required fullWidth={true} className="form-control">
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input type="password" id="password-input" inputRef={(ref) => {this.passwordEl = ref}}/>
				</FormControl>
				<div className="form-actions">
					<Button variant="outlined" type="submit" disableElevation>
						{this.state.isLogin ? 'Log In' : 'Create Account'}
					</Button>
					<Button variant="outlined" type="button" onClick={this.switchModeHandler} 
						disableElevation>
						{this.state.isLogin ? 'New User' : 'Back to Sign In'}
					</Button>
				</div>
			</form>
		);
	}
}

export default AuthPage;
