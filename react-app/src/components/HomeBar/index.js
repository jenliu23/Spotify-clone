import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeBar.css'

function HomeBar( ){
	
	return (
		<div className='home-bar'>
            {/* <NavLink exact to="/"><i className="fa-solid fa-house"></i></NavLink> */}
			<div>
				<NavLink exact to="/"><img src='/favicon.ico' width="40px" alt="img" /></NavLink>
				<nav className='developer'>
					<h4>Developed by Jen Liu</h4>
					<a href="https://github.com/JENLIU2023"><img src="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/LOGO/GitHub-Mark.png" alt="GitHub Logo" width="32px"/></a>
					<a href="https://www.linkedin.com/in/jen-liu-8862b9281/"><img src="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/LOGO/LinkedIn_logo.png" alt="Linkedin Logo" width="32px"/></a>
				</nav>
			</div>
			<div>
				{/* <h3>Search</h3> */}
			</div>
			
			
			{/* <NavLink exact to="/">Home</NavLink> */}
		</div>
	);
}

export default HomeBar;