import config from './config';
import {GetFromStorage} from './storage';

export async function POST(endpoint, body, type = 'post') {
  const token = await GetFromStorage('token');
  return fetch(`${config.api}/${endpoint}`, {
    body: JSON.stringify(body),
    method: type,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

export async function GET(endpoint) {
  const token = await GetFromStorage('token');
  return fetch(`${config.api}/${endpoint}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}
