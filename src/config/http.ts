import Axios from 'axios';

const instance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const addHeader = (key: string, value: string): void => {
  instance.defaults.headers[key] = value;
};

const removeHeader = (key: string): void => {
  delete instance.defaults.headers[key];
};

export default {
  instance,
  addHeader,
  removeHeader,
};
