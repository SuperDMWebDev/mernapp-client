import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../constant/variable';
import Styled from './style';
const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/auth/register`, inputs);
      navigate('/login');
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
            <h2 className="login100-form-title">Sign up</h2>

            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input required type="email" placeholder="email" name="email" onChange={handleChange} />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>
              Do you have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </Styled>
  );
};

export default Register;
