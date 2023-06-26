import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = {};
		if (password && password.length <= 5) {
			errors["password"] = "your password is too short"
		} 
		if (confirmPassword && password !== confirmPassword) {
			errors.confirmPW = "passwords do not match"
		}
		if (email && !email.match(validRegex)) {
			errors.email = "invalid email"
		}
		if (username.trim().length === 0) {
			errors.username = "username is required"
		}
		if (username && username.length > 40) {
			errors.username = "maximum 40 characters"
		}
		setErrors(errors);

		if(Object.values(errors).length === 0){
		const data = await dispatch(signUp(username, email, password));

			if(data){
				const errors = {};
				for(let error of data){
					if(error.slice(0, 5) === "email"){
						errors.email = error.split(" : ")[1]
						setErrors(errors);
					}
					if(error.slice(0, 5) === "usern"){
						errors.username = error.split(" : ")[1]
						setErrors(errors);
					}
				}
			}else {
				closeModal()
			}
		}
	};

	return (
		<div className="sign-up-modal log-in-modal">
			<h1>Sign up for Song%</h1>
			<form onSubmit={handleSubmit}>
				<section>
					<h4>What's your email?</h4>
					<h4 className="errors">{errors.email}</h4>
				</section>
				<label>
					<input
					type="text"
					placeholder="Enter your email."
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					/>
				</label>
				<section>
					<h4>What should we call you?</h4>
					<h4 className="errors">{errors.username}</h4>
				</section>
				<label>
					<input
					type="text"
					placeholder="Enter a profile name."
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					/>
				</label>
				<section>
					<h4>Create a password</h4>
					<h4 className="errors">{errors.password}</h4>
				</section>
				<label>
					<input
					type="password"
					placeholder="Create a password."
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					/>
				</label>
				<section>
					<h4>Confirm password</h4>
					<h4 className="errors">{errors.confirmPW}</h4>
				</section>
				<label>
					<input
					type="password"
					placeholder="Confirm password."
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					/>
				</label>
				<button type="submit">Sign up</button>
				{/* disabled={!!Object.values(errors).length} */}
			</form>
		</div>
	);
}

export default SignupFormModal;