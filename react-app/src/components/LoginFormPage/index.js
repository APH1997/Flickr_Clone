import React, { useContext, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  if (sessionUser) {
    history.push('/')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async(e) => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data)
    }
  }

  const signupRedirect = () => {
    history.push('/signup')
  }

  return (
    <div className="login-form-page-container">
      <form id="login-form-fields"onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <p>Don't have an account?
        <span> <span onClick={() => signupRedirect()} className="no-account-options">Sign up</span> </span>
        or log in as a <span className="no-account-options" onClick={() => handleDemo()}>Demo User!</span>
      </p>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
