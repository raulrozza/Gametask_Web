import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const addApiHeader = (header: string, value: string): void => {
  instance.defaults.headers[header] = value;
};

const removeApiHeader = (header: string): void => {
  delete instance.defaults.headers[header];
};

export default {
  instance,
  addApiHeader,
  removeApiHeader,
};
