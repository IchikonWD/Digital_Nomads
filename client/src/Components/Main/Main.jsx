import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import Error from '../Error';

const Main = () => {
  return (
    <main className='main'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/spain/' />
          </Route>
          <Route path='/spain/' component={Home} exact />
          <Route path='/spain/register' component={Register} />
          <Route path='/spain/login' component={Login} />
          <Route component={Error} />
        </Switch>
      </Router>
    </main>
  );
};

export default Main;
