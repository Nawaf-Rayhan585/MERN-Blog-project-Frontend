import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../context/userContext'
import axios from 'axios'

const UserProfile = () => {
  const [avatar,setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword , setNewPassword] = useState('')
  const [NewConfirmPassword, setNewConfirmPassword] = useState('')
  const [isAvatarTouched , setIsAvatarTouched] = useState(false)
  const [error , setError] = useState('')
  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);



  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };

    getUser()
  }, []);
  


  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
  
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
  
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
  
      setAvatar(response?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };


  const updateUserDetails = async (e) => {
    e.preventDefault();
  
    try {
      // const userData = new FormData();
      // userData.set('name', name);
      // userData.set('email', email);
      // userData.set('currentPassword', currentPassword);
      // userData.set('newPassword', newPassword);
      // userData.set('confirmNewPassword', confirmNewPassword);
      const userData = {
        name,
        email,
        currentPassword,
        newPassword,
        NewConfirmPassword
      };

      const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/edit-user`,userData,{ withCredentials: true, headers: { Authorization: `Bearer ${token}` , "Content-Type":'application/json'}});
      
      if (response.status === 200) {
        navigate('/logout');
      }  
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  };


  return (
    <section className='profile'>
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>

              <form className='avatar__form'>
                <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
                <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><i class="bi bi-pencil-square"></i></label>
              </form>
             {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><i class="bi bi-check2"></i></button>}
          </div>

          
          <h1>{currentUser.name}</h1>


        <form className='form profile__form' onSubmit={updateUserDetails}>
          {error && <p className='form__error-message'>{error}</p>}
          <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder='current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
          <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          <input type="password" placeholder='Confirm New password' value={NewConfirmPassword} onChange={e => setNewConfirmPassword(e.target.value)}/>
          <button type='submit' className='btn primary'>Update Details</button>
        </form>
        </div>
      </div>
    </section>
  )
}


export default UserProfile

