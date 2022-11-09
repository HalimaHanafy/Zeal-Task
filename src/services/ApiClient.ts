import axios from 'axios';
// import Config from 'react-native-config';

const Axios = axios.create({
  baseURL: 'http://ec2-44-204-28-7.compute-1.amazonaws.com:3000',
  timeout: 60000,
});

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.post.Accept = 'application/json';

export default Axios;
