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
        <h1>Login</h1>
        <form>
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
    </Styled>
  );
};

export default Login;
