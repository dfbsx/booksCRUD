import axios from 'axios';
import API_URL  from './localApi';

export const deleteBook = (id: number) => {
  //funckja przekazująca id usuwanej książki do serwera
  return axios({
    method: 'DELETE',
    url: `${API_URL}`,
    data: {id:id},
  })
};