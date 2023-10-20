import axios from 'axios';
import API_URL  from './localApi';

export const getBooks = () => {
  //wywołanie chęci pobrania wszystkich książek z serwera
  return axios({
    method: 'GET',
    url: `${API_URL}`,
  })
};