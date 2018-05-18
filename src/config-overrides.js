import { injectBabelPlugin } from 'react-app-rewired';

module.exports = function override(config) {
  const config2 = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  return config2;
};