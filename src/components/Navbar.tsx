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
  function capitalizeAllWord(s: string) {
    // lodash only capitalizes first word
    return _.snakeCase(s)
      .split(`_`)
      .map((x) => _.capitalize(x))
      .join(` `);
  }
  const titleList = [
    {
      title: 'art'
    },
    {
      title: 'science'
    },
    {
      title: 'technology'
    },
    {
      title: 'cinema'
    }
  ];
  return (
    <div className="container">
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/assets/icons/google-classroom.ico" alt="logo" />
            </Link>
          </div>
          <div className="links">
            {titleList.map((item, index) => {
              return (
                <Link className="link" to={`/?cat=${item.title}`}>
                  {_.upperCase(item.title)}
                </Link>
              );
            })}

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
    </div>
  );
};
