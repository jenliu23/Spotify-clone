import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
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
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
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
        
      </form>
    </div>
  );
}

export default LoginFormModal;
