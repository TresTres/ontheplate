// AuthButtons.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class AuthButtons extends Component {
	
	constructor(props) {
		super(props);
		this.switchModeHandler = props.switchModeHandler;
	}

	render() {

		return (
			<div className="form-actions">
				<Button variant="outlined" type="submit" disableElevation>
					{this.props.isLogin ? 'Log In' : 'Create Account'}
				</Button>
				<Button variant="outlined" type="button" onClick={this.switchModeHandler} 
					disableElevation>
					{this.props.isLogin ? 'New User' : 'Back to Sign In'}
				</Button>
			</div>
		);
	}
}

AuthButtons.propTypes = {
	switchModeHandler: PropTypes.func,
	isLogin: PropTypes.bool
};

export default AuthButtons;
