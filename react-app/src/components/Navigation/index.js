import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	
	return (
		<ul className='nav-bar'>
			<li className="nav-bar-icon">
				<NavLink exact to="/"><i className="fa-solid fa-house fa-sm"></i> Home</NavLink>
			</li>
			<li className="nav-bar-icon">
				<NavLink exact to="/"><i className="fa-solid fa-compact-disc"></i> Albums</NavLink>
			</li>
			<li className="nav-bar-icon">
				<NavLink exact to="/songs"><i className="fa-solid fa-music fa-sm"></i> All Songs</NavLink>
			</li>
			<li className={sessionUser? "nav-bar-icon":"hidden nav-bar-icon"}>
              	<NavLink to="/uploaded-songs"><i className="fa-solid fa-cloud-arrow-up"></i> Your Uploads</NavLink>
            </li>
			{isLoaded && (
			<li>
				<ProfileButton user={sessionUser} />
			</li>
			)}
		</ul>
	);
}

export default Navigation;