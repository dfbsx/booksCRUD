import axios from 'axios';
import API_URL  from './localApi';

export const deleteBook = (id: number) => {
  return axios({
    method: 'DELETE',
    url: `${API_URL}`,
    data: {id:id},
  })
};