import React from 'react';
import { Link } from 'react-router-dom';
class Error extends React.Component {
  render() {
    return (
      <div id="main">
        <div className="fof">
          <h1>Error 404</h1>
          <h3>The page you are looking for does not exist</h3>
          <Link to='/dashboard'><button className=" notFound">Home Page</button></Link>
        </div>
      </div>
    )
  };
}

export default Error;