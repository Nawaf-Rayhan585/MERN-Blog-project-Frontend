import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useNavigate , useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const EditPost = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')


  const navigate = useNavigate();
  const {id} = useParams();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
        
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

        
  const modules = {
    toolbar: [
      [''],
    ]
  };
  
  const formats = [
    '',
  ];
   
  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather" , "Science"];


  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response?.data?.title);
        setDescription(response?.data?.description);
      } catch (error) {
        console.log(error)
      }
    };
  
    getPost();
  }, []);


  
  const editPost = async (e) => {
    e.preventDefault()

    const postData = new FormData()
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`,postData,{withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
    
      if (response.status === 200) {
        return navigate('/');
      }
    } catch (error) {
      // Handle error
      setError(error?.response?.data?.message)
    }
  }


  return (
    <section>
      <div className='container'>
        <h2>Edit Post</h2>
        <br />
        {error && <p className='form__error-message'>{error}</p>}
        <form className="form create-post__form" onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
          <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="png, jpg, jpeg"/>
          <button type="submit" class="btn primary">Update Post</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost