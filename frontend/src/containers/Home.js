import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container mt-5">
    <div className="card p-5 shadow">
      <h1 className="display-4 text-center mb-4">Welcome to Session Authentication</h1>
      <p className="lead text-center">
        My First Application Using Django and React
      </p>
      <hr className="my-4" />
      <p className="text-center">Click the button below to log in.</p>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-primary btn-lg" to="/login">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
