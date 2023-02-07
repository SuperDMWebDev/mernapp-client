import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu';
import moment from 'moment';
const DOMPurify = require('dompurify');
import { URL } from '../constant/variable';
import { TrendingUpOutlined } from '@mui/icons-material';
export const Single = () => {
  const [post, setPost] = useState<any>({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log('Single ', currentUser, postId);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/posts/${postId}`);
        console.log('Single post ', res.data, isValidURL(res.data.img));
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  function isValidURL(string: string | null) {
    if (string != null) return string.includes('http');
    return true;
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/posts/${postId}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };
  return (
    <div className="container">
      <div className="single">
        <div className="content">
          <img src={isValidURL(post?.img) ? post?.img : `/upload/${post.img}`} alt="" />
          <div className="user">
            {post.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src="../assets/images/edit.png" alt="" />
                </Link>
                <img onClick={handleDelete} src="../assets/images/delete.png" alt="" />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc)
            }}></p>{' '}
        </div>
        <Menu cat={post.cat} />
      </div>
    </div>
  );
};
