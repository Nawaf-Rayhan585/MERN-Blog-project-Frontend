import React, {useContext , useEffect , useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';
import axios from 'axios';


const PostDetails = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const {currentUser} = useContext(UserContext)

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`); 
        setPost(response. data);
      } catch (error) {
        setError(error); 
      }
      setIsLoading(false)
    };
     
    getPost(); 
  }, [id]);


  if(isLoading) {
    return <Loader/>
  }


  return (

    <section className="post-detail">
      {error && <p className='error'>{error}</p>}
      {post && <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id == post?.creator && <div className="post-detail__buttons">
            <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
            <DeletePost postId={id}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail__thumbnail">
          <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="FGD" />
        </div>
        <p dangerouslySetInnerHTML={{__html: post.description}}></p>
      </div>}
    </section>
  )
}

export default PostDetails