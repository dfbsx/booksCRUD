import axios from 'axios';
import API_URL  from './localApi';

export const getBooks = () => {
  return axios({
    method: 'GET',
    url: `${API_URL}`,
  })
};