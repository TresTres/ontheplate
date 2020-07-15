// Auth.js

import React, { Component, Fragment } from 'react';
import { Typography } from '@material-ui/core';

import { validateInput, fetchRequest } from '../../utils/helper';
import AuthButtons from './AuthButtons';
import AuthInputs from './AuthInputs';
import AuthContext from '../../context/auth-context';
import './Auth.css';


class AuthPage extends Component {

	static contextType = AuthContext;

	state = {
		isLogin: true,
		loginStr: '',
		email: '',
		userName: '',
		password: ''
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
				this.context.authenticate(resdata.resumeID);
			}
		}).
		catch((err) => {
			console.log(err);
		});
	}

	switchModeHandler = () => {
		this.setState((prevState) => ({ isLogin: !prevState.isLogin }));
	};

	handleInputChange = (inp) => {
		this.setState({
			[inp.target.name]: inp.target.value
		});
	}

	loginHandler = (event) => {
		
		event.preventDefault();
		const { loginStr, password } = { ...this.state };

		if (validateInput([loginStr, password]) === false) {
			return;
		}

		const requestBody = {
			query: `
				query {
					login(str: "${loginStr}", password: "${password}") {
						userID
						userName
						token
						tokenExpiration
					}
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
			if (resdata.login.userID) {
				this.context.authenticate(resdata.login.userID);
			}
		}).
		catch((err) => {
			console.log(err);
		});
	};

	createUserHandler = (event) => {

		event.preventDefault();
		const { email, password, userName } = { ...this.state }; 

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
		
		fetchRequest(requestBody).
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
			<Fragment>
				<div className="title-header">
					<Typography variant="h1" align="center"
						className="title-header" gutterBottom>
						On The Plate
					</Typography>
				</div>
				<form className="auth-form" onSubmit={this.state.isLogin ? 
							this.loginHandler : this.createUserHandler}>
					<AuthInputs isLogin={this.state.isLogin} 
						onChange={this.handleInputChange.bind(this)}
					/>
					<AuthButtons isLogin={this.state.isLogin}
						switchModeHandler={this.switchModeHandler.bind(this)} />
				</form>
			</Fragment>
		);
	}
}

export default AuthPage;
