import axios from 'axios';
import API_URL  from './localApi';
import { newBook } from '../page';

export const updateBook = (data: newBook) => {
  //funkcja przekazująca dane zaktualizowane do serwera
  return axios({
    method: 'POST',
    url: `${API_URL}`,
    data: data,
  })
};