import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeBar.css'

function HomeBar( ){
	
	return (
		<div className='home-bar'>
			<div>
				<NavLink exact to="/"><img src='/favicon.ico' width="30px" alt="img" /></NavLink>
				<h4>@2023 Song% inspired by Spotify</h4>
			</div>
			<nav className='developer'>
				{/* <i className="fa-solid fa-at fa-xl"></i> */}
				{/* <h4>Developed by Jen Liu</h4> */}
				<a href="https://github.com/JENLIU2023/Spotify-clone.git" target="_blank"><img src="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/LOGO/GitHub-Mark.png" alt="GitHub Logo" width="32px"/></a>
				<a href="https://www.linkedin.com/in/jen-l-8862b9281/" target="_blank"><img src="https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/LOGO/LinkedIn_logo.png" alt="Linkedin Logo" width="32px"/></a>
			</nav>
		</div>
	);
}

export default HomeBar;