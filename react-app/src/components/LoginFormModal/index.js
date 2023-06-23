import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors("Credentials Invalid")
    } else {
      closeModal()
    }
  };

  const handlerDemoUserLogIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <div className="log-in-modal">
      <h1>Log in to Song%</h1>
      <form onSubmit={handleSubmit} >
        <h4 className="errors">{errors}</h4>
        <section>
          <h4>Email</h4>
          <h4 className="errors">*</h4>
        </section>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <section>
          <h4>Password</h4>
          <h4 className="errors">*</h4>
        </section>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
            <button type="submit">Log In</button>
            <button onClick={handlerDemoUserLogIn}>Demo User</button>
        </div>
        
        <nav>
            <h5>Don't have an account?</h5>
            {/* <h5>Sign up for Song%</h5> */}
            <OpenModalButton
              buttonText="Sign up for Song%"
              modalComponent={<SignupFormModal />}
            />
        </nav>
        
        
      </form>
    </div>
  );
}

export default LoginFormModal;
