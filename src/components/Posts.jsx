import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import Loader from './Loader'
import axios from 'axios'

const Posts = () => {

    const [posts , setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/`)
          setPosts(response?.data)
        } catch (err) {
          console.log(err)
        }

        setIsLoading(false)
      }

      fetchPosts()
    }, []);

    if(isLoading) {
      return <Loader></Loader>
    }


  return (
    <section className='posts'> 
        {posts.length > 0 ? <div className="container posts__container">
            
            {
                posts.map(({_id :id , thumbnail , creator ,category , title , description, createdAt}) => 
                <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} authorID={creator} title={title} description={description} createdAt={createdAt}/>)
            }

        </div> : <h2 className='center'>No Posts To Display</h2>}
    </section>
  )
}
export default Posts


 