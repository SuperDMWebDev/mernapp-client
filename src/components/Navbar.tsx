import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import _ from 'lodash';
export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutApp = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/assets/icons/google-classroom.ico" alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <span className="img-profile">
            <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" />
            <div className="absolute">
              <div className="img-box">
                <span>{_.capitalize(currentUser?.username)}</span>
                <div onClick={() => logoutApp()}>Logout</div>
              </div>
            </div>
          </span>

          <span className="write">
            <Link to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
