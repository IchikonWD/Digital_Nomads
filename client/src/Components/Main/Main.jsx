import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import Error from '../Error';

const Main = () => {
  return (
    <main>
      <Router>
        <Route path='/' component={Home} exact />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/error' component={Error} />
      </Router>
    </main>
  );
};

export default Main;
