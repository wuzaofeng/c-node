import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { message } from 'antd';
import './config';

message.config({
  duration: 1,
});

import App from './wrap';

if (DEBUG) {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    );
  };
  render(App);
  if (module.hot) module.hot.accept('./wrap', () => { render(App); });
} else {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<App />, rootEl);
}
