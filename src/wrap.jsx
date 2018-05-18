import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './app'; // 入口节目
import Index from './views/index';
import About from './views/about';
import User from './views/user';
import Book from './views/book';
import Detail from './views/detail';

const Wrap = () => (
  <Router>
    <App>
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/home/all" />)} />
        <Route path="/home" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/user" component={User} />
        <Route path="/detail" component={Detail} />
        <Route path="/book" component={Book} />
      </Switch>
    </App>
  </Router>
);

export default Wrap;

