import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

import { UserContext } from '../context/userContext'

const Header = () => {

  const [isNavShowing , setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const { currentUser } = useContext(UserContext)

  const closeNavHandler = () => {
    if(window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true)
    }
  }

  return (
    <nav>
        <div className="container nav__container">
            <Link to='/' className='nav__logo' onClick={closeNavHandler}>
                <img src={logo} alt="navbar Logo" />
            </Link>
            {currentUser?.id && isNavShowing && (
        <ul className="nav__menu">
          <li>
            <Link to="/" onClick={closeNavHandler}>Home <i class="bi bi-house"></i></Link>
          </li>
          <li>
            <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>Your Profile<i class="bi bi-person-circle"></i></Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavHandler}>Create Post <i class="bi bi-pencil-square"></i></Link>
          </li>
          <li>
            <Link to="/authors" onClick={closeNavHandler}>Authors <i class="bi bi-person-fill-check"></i></Link>
          </li>
          <li>
            <Link to="/logout" onClick={closeNavHandler}>Logout <i class="bi bi-box-arrow-in-left"></i></Link>
          </li>
        </ul>
      )}

      {!currentUser?.id && isNavShowing && (
        <ul className="nav__menu">
          <li>
            <Link to="/" onClick={closeNavHandler}>Home <i class="bi bi-house"></i></Link>
          </li>
          <li>
            <Link to="/authors" onClick={closeNavHandler}>Authors <i class="bi bi-person-fill-check"></i></Link>
          </li>
          <li>
            <Link to="/login" onClick={closeNavHandler}>Login <i class="bi bi-box-arrow-in-right"></i></Link>
          </li>
        </ul>
      )}
            <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
              {isNavShowing ? <i class="bi bi-x-lg"></i> : <i class="bi bi-list"></i>}
            </button>
        </div>
    </nav>
  )
}

export default Header 