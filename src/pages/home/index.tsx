import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { URL } from '../../constant/variable';
import { AuthContext } from '../../context/authContext';
import Styled from './style';
// const posts = [
//   {
//     id: 1,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 2,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 3,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 4,
//     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
//     img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   }
// ];
export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const navigate = useNavigate();
  const isValidUrl = useCallback((text: string) => {
    var regexp =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    const check = regexp.test(text);
    return check;
  }, []);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    console.log('doc ', doc);
    return doc.body.textContent;
  };

  return (
    <Styled>
      <div className="container">
        <div className="home">
          <div className="posts">
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="img">
                  <img
                    src={`${isValidUrl(post.img) ? `${post.img}` : `/upload/${post.img}`}`}
                    alt=""
                  />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: post.desc }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Styled>
  );
}
