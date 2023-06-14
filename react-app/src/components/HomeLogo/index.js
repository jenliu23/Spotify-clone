import React from 'react';
import { NavLink } from 'react-router-dom';


function HomeLogo( ){
	
	return (
		<div>
            <NavLink exact to="/"><i className="fa-solid fa-house"></i></NavLink>
			<NavLink exact to="/">Home</NavLink>
		</div>
	);
}

export default HomeLogo;