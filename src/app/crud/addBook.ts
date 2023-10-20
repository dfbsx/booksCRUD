import axios from 'axios';
import API_URL  from './localApi';
import { Book } from '../new/page';
//funcja przekazująca dane nowej książki do serwera
export const addBook = (data: Book) => {
  return axios({
    method: 'POST',
    url: `${API_URL}`,
    data: data,
  })
};