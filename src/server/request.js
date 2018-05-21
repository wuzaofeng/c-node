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

/**
 * form-data格式化 || 拼接URL
 * @param {*} data 请求body
 */
function formDateTransfrom(data) {
  // return Object.keys(data).map(e => `${e}=${data[e]}`).join('&');
  return Object.keys(data).map((e) => {
    // 多层嵌套
    if (Array.isArray(data[e])) {
      return `${e}=${JSON.stringify(data[e])}`;
    }
    return `${e}=${data[e]}`;
  }).join('&');
}

// 拼接Url
function joinUrl(url, params = {}) {
  const params2 = formDateTransfrom(params);
  return url.indexOf('?') === -1 ? `${url}?${params2}` : `${url}&${params2}`;
}

export default function request(url, data = null, method = 'get', headers = {}) {
  // const filterData = (typeof data === 'object') ? JSON.stringify(data) : data;

  const params = {
    method,
    mode: 'cors',
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  let url2 = url;
  if (method === 'get') {
    if (data == null) {
      url2 = url;
    } else {
      url2 = joinUrl(url, data);
    }
  } else {
    params.body = JSON.stringify(data);
  }

  return fetch(url2, params)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkBusinessCode)
    .catch(ERROR);
}
