import React from 'react'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <Link to='/' className='btn primary'><i class="bi bi-arrow-left"></i> Go Back to Home</Link>
      </div>
      <img src="https://www.dpmarketingcommunications.com/wp-content/uploads/2016/11/404-Page-Featured-Image.png" className='notfound-image' alt=""/>
    </section>
  )
}

export default ErrorPage