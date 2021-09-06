const API_BASE_URL = 'http://localhost:3001';

// get
export const get = async (url) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };

  const response = await fetch(API_BASE_URL + url, requestOptions);
  return { ok: response.ok, data: await response.json() };
};

// post
export const post = async (url, reqBody) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody),
  };

  const response = await fetch(API_BASE_URL + url, requestOptions);
  return { ok: response.ok, data: await response.json() };
};

// put
export const put = async (url, reqBody) => {
  const requestOptions = {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody),
  };

  const response = await fetch(API_BASE_URL + url, requestOptions);
  return { ok: response.ok, data: await response.json() };
};
