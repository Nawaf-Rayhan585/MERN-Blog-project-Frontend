import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'



const Authors = () => {

  const [authors , setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users`);
        setAuthors(response.data); 
      } catch (error) {
        console.log(error); 
      }
  
    setIsLoading(false); 
    };
  
    getAuthors(); 
  }, []); 



  if(isLoading) {
    return <Loader></Loader>
  }




  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors__container">
          {
            authors.map(({_id, avatar, name, posts}) => {
              return <Link key={_id} to={`/posts/users/${_id}`} className='author'>
                <div className="author__avatar">
                  <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts} posts uploaded</p>
                </div>
              </Link>
            })
          }
        </div> : <h2 className='center'>No Authors Found</h2>
      }
    </section>
  )
}

export default Authors