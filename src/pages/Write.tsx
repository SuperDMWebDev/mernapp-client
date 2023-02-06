import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { URL } from '../constant/variable';
const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || 'art');

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${URL}/upload`, formData);
      console.log('res upload ', res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e: any) => {
    e.preventDefault();

    const imgUrl = file != null ? await upload() : null;

    try {
      state
        ? await axios.put(
            `${URL}/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : ''
            },
            {
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            }
          )
        : await axios.post(
            `${URL}/posts/`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : '',
              date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            },
            {
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            }
          );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('state ', state);
    console.log('file ', file);
  }, [file, state]);

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className={`${file == null ? 'file' : 'file noClick'}`} htmlFor="file">
            {file == null ? 'Upload Image' : file.name}
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'art'}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'science'}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'technology'}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'cinema'}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
