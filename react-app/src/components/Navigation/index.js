import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	return (
		isLoaded &&
			<div className='nav-spacing-div'>

				<div className='nav-container'>
					<div id="logo-container" onClick={() => history.push('/')}>

						<NavLink id="cloud" to={'/'}>
							<i className="fas fa-cloud"></i>
						</NavLink>
						<h1 id="home">high<span id="home-r">r</span>Me</h1>

					</div>
					{isLoaded && (sessionUser && (
						<div className='profile-and-upload'>

								<div style={{color: "white"}}>
									<i className="fas fa-folder-plus"></i>
									Create an album
								</div>
								<NavLink id="upload-cloud-link" exact to="/photos/new">
									<i className="fas fa-cloud-upload-alt"></i>
									Upload Image
								</NavLink>
								<ProfileButton user={sessionUser} />

						</div>
					)) || (<div style={{width: "60px"}}/>)}
					{/* This condition is so the logo stays to the left when no signed in user */}
				</div>
			</div>
	);
}

export default Navigation;
