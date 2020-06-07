import config from './config';
import {GetFromStorage, DeleteStorage} from './storage';
import NavigationService from './navigationService';

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

export async function GET(endpoint, type = 'get') {
  const token = await GetFromStorage('token');
  return fetch(`${config.api}/${endpoint}`, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (res.status === 401) {
        await DeleteStorage();
        NavigationService.navigate('SignIn');
      } else {
        return res.json();
      }
    })
    .then((data) => data);
}
