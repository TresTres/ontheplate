// AuthInputs.js

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	FormControl,
	Input,
	InputLabel
} from '@material-ui/core';


const AuthInputs = (props) => (
	
	<Fragment>
		{ props.isLogin &&
			<Fragment> 
				<FormControl required fullWidth={true}
					className="form-control">
					<InputLabel htmlFor="email-or-user">
						E-Mail or Username
					</InputLabel>
					<Input type="text" name="loginStr" id="email-or-user-input"
						onChange={props.onChange} />
				</FormControl>
				<FormControl required fullWidth={true} 
						className="form-control">
					<InputLabel htmlFor="password">
						Password
					</InputLabel>
					<Input type="password" name="password" id="password-input" 
						onChange={props.onChange}/>
				</FormControl>
			</Fragment>
		}
		{ !props.isLogin &&
			<Fragment>
				<FormControl required fullWidth={true} 
					className="form-control">
					<InputLabel htmlFor="email">E-Mail</InputLabel>
					<Input type="email" name="email" id="email-input" 
						onChange={props.onChange}/>
				</FormControl>
				<FormControl required fullWidth={true} 
					className="form-control">
					<InputLabel htmlFor="userName">
						User Name
					</InputLabel>
					<Input type="text" name="userName" id="username-input" 
						onChange={props.onChange}/>
				</FormControl>
				<FormControl required fullWidth={true} 
						className="form-control">
					<InputLabel htmlFor="password">
						Password
					</InputLabel>
					<Input type="password" name="password" id="password-input" 
						onChange={props.onChange}/>
				</FormControl>
			</Fragment>
		}
	</Fragment>
);


AuthInputs.propTypes = {
	isLogin: PropTypes.bool,
	onChange: PropTypes.func
};

export default AuthInputs;
