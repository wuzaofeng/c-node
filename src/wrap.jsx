import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './model';
import App from './app'; // 入口节目
import Index from './views/index';
import About from './views/about';
import Book from './views/book';
import Login from './views/login';
import User from './views/user';

const Wrap = () => (
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/" exact render={() => (<Redirect to="/home" />)} />
          <Route path="/home" component={Index} />
          <Route path="/about" component={About} />
          <Route path="/book" component={Book} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
        </Switch>
      </App>
    </Router>
  </Provider>
);

export default Wrap;

