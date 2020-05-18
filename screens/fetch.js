import config from './config';

export function POST(endpoint, body) {
  return fetch(`${config.api}/${endpoint}`, {
    body: JSON.stringify(body),
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}
