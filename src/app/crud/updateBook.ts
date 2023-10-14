import axios from 'axios';
import API_URL  from './localApi';
import { Book } from '../new/page';

export const updateBook = (data: Book) => {
  console.log(data)
  return axios({
    method: 'POST',
    url: `${API_URL}`,
    data: data,
  })
};