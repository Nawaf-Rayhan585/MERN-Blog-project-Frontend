import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryPosts = () => {

  const [posts , setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [author , setAuthor] = useState({})

  const {category} = useParams()


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/categories/${category}`)
        setPosts(response?.data)
      } catch (err) {
        console.log(err)
      }

      setIsLoading(false)
    }

    fetchPosts()
  }, [category]);

  if(isLoading) {
    return <Loader></Loader>
  }


return (
  <section className='posts'> 
      <h2 className='center'>All post about {category}</h2>
      <br /><br /><br />
      {posts.length > 0 ? <div className="container posts__container">
          {
              posts.map(({_id :id , thumbnail , creator ,category , title , description, createdAt}) => 
              <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} authorID={creator} title={title} description={description} createdAt={createdAt}/>)
          }

      </div> : <h2 className='center'>No Posts To Display</h2>}
  </section>
)
}

export default CategoryPosts


