import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import { useContext } from "react";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const history = useHistory()

  if (sessionUser) {
    history.push('/')
  };


  useEffect(() => {
    const errObj = {}
    if (first_name && first_name.length > 20) {
      errObj.first_name = "First name cannot exceed 20 characters"
    }
    if (last_name && last_name.length > 20) {
      errObj.last_name = "Last name cannot exceed 20 characters"

    }
    if (username && username.length > 20) {
      errObj.username = "Username cannot exceed 20 characters"
    }

    if (password !== confirmPassword) {
      errObj.password = "Confirm Password field has to match Password field"
    }

    if (Object.values(errObj).length) {
      setErrors(errObj)
    } else {
      setErrors({})
    }

  }, [first_name, last_name, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (Object.values(errors).length) return;

    const data = await dispatch(signUp(username, email, password, first_name, last_name));
    if (data) {
      setErrors([data])
    }

  };

  const loginRedirect = () => {
    history.push('/login')
  }

  const handleDemo = async (e) => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data)
    }
  }


  return (
    <div className="signup-form-page-container">
      <form id="signup-form-fields" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p>Already have an account?
          <span> <span onClick={() => loginRedirect()} className="no-account-options">Log in here</span> </span>
          or take the <span className="no-account-options" onClick={() => handleDemo()}>Demo User</span> for a spin!
        </p>
        {hasSubmitted && Object.values(errors).length > 0 &&
          Object.values(errors).map((error, idx) => <p key={idx} className="errors">{error}</p>)
        }
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
