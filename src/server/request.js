import 'fetch-ie8';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function checkBusinessCode(res) {
  if (!res.success) {
    return Promise.reject(res);
  }
  return res;
}

function ERROR(error) {
  const error2 = new Error(error);
  throw error2;
}

export default function request(url, data, method = 'get', headers = {}) {
  // const filterData = (typeof data === 'object') ? JSON.stringify(data) : data;
  return fetch(url, {
    method,
    mode: 'cors',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(checkBusinessCode)
    .catch(ERROR);
}
