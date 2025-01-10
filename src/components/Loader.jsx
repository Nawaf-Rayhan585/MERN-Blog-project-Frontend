import React from 'react';
import LoadingGif from '../assets/LoadingGif.gif'

const Loader = () => {
    return (
      <div className="loader">
        <div className="loader__image">
          <img src={LoadingGif} alt="" />
        </div>
      </div>
    );
}

export default Loader;
