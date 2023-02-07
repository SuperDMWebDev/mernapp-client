import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Styled from './style';
const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <Styled>
      <div className="auth">
        <div className="wrap-login100">
          <div className="login100-pic jt-tilt">
            <img src="/assets/images/img-01.png" alt="image" />
          </div>
          <form className="login100-form validate-form">
            <h2 className="login100-form-title">Sign in</h2>
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={(e) => handleSubmit(e)}>Login</button>
            {err && <p>{err}</p>}
            <span>
              Don't you have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </Styled>
  );
};

export default Login;
