import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<div>
				<h1 id="home">high<span id="home-r">r</span>Me</h1>
			</div>
			{isLoaded && (
				<div>

						<NavLink exact to="/photos/new">Create a Post</NavLink>


						<ProfileButton user={sessionUser} />

				</div>
			)}
		</div>
	);
}

export default Navigation;
