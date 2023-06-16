import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	
	return (
		<ul className='nav-bar'>
			<li>
				<NavLink exact to="/songs">All Songs</NavLink>
			</li>
			<li className={sessionUser? "":"hidden"}>
              	<NavLink to="/uploaded-songs" >Uploaded Song List</NavLink>
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