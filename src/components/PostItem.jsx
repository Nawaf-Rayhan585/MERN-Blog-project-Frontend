import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from '../components/PostAuthor'

const PostItem = ({postID , category , title , description , authorID , thumbnail , createdAt}) => {

    const shortDescription = description.length > 145 ? description.substr(0 , 145) + '...' : description;
    const shortTitle = title.length > 43 ? title.substr(0 , 43) + '...' : title;

    return (
        <article className='post'>
            <div className="post__thumbnail">
                <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{shortTitle}</h3>
                </Link>
                <p className='description'>{shortDescription}</p>
                <div className="post__footer">
                    <PostAuthor authorID={authorID} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
                </div>
            </div>
        </article>
    );
}

export default PostItem;
