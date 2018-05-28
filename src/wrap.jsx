import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './model';
import App from './app'; // 入口节目
import Index from './views/index';
import Login from './views/login';
import User from './views/user';
import Edit from './views/edit';
import Add from './views/add';

const Wrap = () => (
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/" exact render={() => (<Redirect to="/home" />)} />
          <Route path="/home" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Route path="/edit" component={Edit} />
          <Route path="/add" component={Add} />
        </Switch>
      </App>
    </Router>
  </Provider>
);

export default Wrap;

