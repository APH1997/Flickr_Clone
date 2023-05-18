import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<div>
				<NavLink exact to="/">HighrMe</NavLink>
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
