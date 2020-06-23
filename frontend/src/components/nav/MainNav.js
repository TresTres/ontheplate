// MainNav.js

import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNav.css';

const MainNavigation = (props) => (

	<header className="main-navigation">
		<div className="main-navigation__logo">
			<h1>OnThePlate</h1>
		</div>
		<nav className="main-navigation__items">
			<ul>
				<li><NavLink to="/home">Home Base</NavLink></li>
				<li><NavLink to="/lists">Lists</NavLink></li>
				<li><NavLink to="/search">Search</NavLink></li>
				<li><NavLink to="/profile">Profile</NavLink></li>
			</ul>
		</nav>
	</header>
);

export default MainNavigation;
