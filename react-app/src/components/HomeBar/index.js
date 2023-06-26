import React from 'react';
import { NavLink } from 'react-router-dom';

function HomeBar( ){
	
	return (
		<div>
            {/* <NavLink exact to="/"><i className="fa-solid fa-house"></i></NavLink> */}
			<NavLink exact to="/"><img src='/favicon.ico' width="40px" alt="img" /></NavLink>
			{/* <NavLink exact to="/">Home</NavLink> */}
		</div>
	);
}

export default HomeBar;