// MainNav.js

import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNav.css';

const MainNavigation = (props) => (

	<AuthContext.Consumer>
		{
			(context) => context.token && (
				<header className="main-navigation">
					<div className="main-navigation__logo">
						<h2>OnThePlate</h2>
					</div>
					<nav className="main-navigation__items">
					
							<ul>
								<li><NavLink to="/home">Home Base</NavLink></li>
								<li><NavLink to="/lists">Lists</NavLink></li>
								<li><NavLink to="/search">Search</NavLink></li>
								<li><NavLink to="/profile">Profile</NavLink></li>
								<li><a className="logout" onClick={context.endSession}>Log out</a></li>
							</ul>
					</nav>
				</header>
			)
		}
	</AuthContext.Consumer>
);

export default MainNavigation;
