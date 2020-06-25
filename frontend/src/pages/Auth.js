// Auth.js

import React, { Component } from 'react';
import { 
	Button,
	FormControl, 
	Input, 
	InputLabel
} from '@material-ui/core';

import './Auth.css';

class AuthPage extends Component {

	constructor(props) {
		super(props);
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
	}


	loginHandler = (event) => {
		event.preventDefault();
	
		const email = this.emailEl.value;
		const password = this.passwordEl.value;

		if(email.trim().length === 0 || password.trim() === 0) {
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
		}

		fetch('http://localhost:4000/api', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
			}
		})
		.then(res => {
			if(res.status !== 200 && res.status !== 201) {
				throw new Error('Failed');
			}
			return res.json();
		})
		.then(resbody => {
			console.log(resbody);
		})
		.catch(err => {
			console.log(err);
		})
	};

	render() {

		return (
			<form className="auth-form" onSubmit={this.loginHandler}>
				<FormControl required fullWidth={true} className="form-control">
					<InputLabel htmlFor="email">E-Mail</InputLabel>
					<Input type="email" id="email-input" inputRef={ref => {this.emailEl = ref}}/>
				</FormControl>
				<FormControl required fullWidth={true} className="form-control">
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input type="password" id="password" inputRef={ref => {this.passwordEl = ref}}/>
				</FormControl>
				<div className="form-actions">
					<Button variant="outlined" type="submit" disableElevation>
						Log In
					</Button>
					<Button variant="outlined" type="button" disableElevation>
						Create User
					</Button>
				</div>
			</form>
		);
	}
}

export default AuthPage;
