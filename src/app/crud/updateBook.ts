import axios from 'axios';
import API_URL  from './localApi';
import { newBook } from '../page';

export const updateBook = (data: newBook) => {
  return axios({
    method: 'POST',
    url: `${API_URL}`,
    data: data,
  })
};