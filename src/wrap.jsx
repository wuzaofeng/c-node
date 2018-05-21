import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './app'; // 入口节目
import Index from './views/index';
import About from './views/about';
import User from './views/user';
import Book from './views/book';

const Wrap = () => (
  <Router>
    <App>
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/home" />)} />
        <Route path="/home" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/user" component={User} />
        <Route path="/book" component={Book} />
      </Switch>
    </App>
  </Router>
);

export default Wrap;

