import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import Error from '../Error';
import ScrollButton from "../ScrollButton/ScrollButton";


const Main = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route component={Error} />
        </Switch>
      </Router>
      <ScrollButton />
    </main>
  );
};

export default Main;
