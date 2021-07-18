import Axios from 'axios';

const instance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.defaults.headers = {
  'Cache-Control': 'no-cache',
  'x-amz-acl': 'public-read',
  Pragma: 'no-cache',
  Expires: '0',
};

export default {
  instance,
};
