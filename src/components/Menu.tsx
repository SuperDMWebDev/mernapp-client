import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { URL } from '../constant/variable';
const Menu = ({ cat }: { cat: any }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log('err');
      }
    };
  }, []);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
};
export default Menu;
