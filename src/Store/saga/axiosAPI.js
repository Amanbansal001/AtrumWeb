import axios from 'axios';
var https = require('https');


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const configuration = {
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS,SAURABH',
    'Access-Control-Allow-Headers': [
      'Origin', 'Accept', 'X-Requested-With', 'Content-Type', 'Authorization'
    ]
  }
};

const instance = axios.create({ configuration });

instance.interceptors.request.use((config) => {
 
  const token = null;

  let newHeaders = config.headers;
  if (token) {
    newHeaders = Object.assign({}, newHeaders, { Authorization: `Bearer ${token}` });
  }
  return Object.assign({}, config, { headers: newHeaders });
}, (error) => Promise.reject(error));

const getAxios = () => instance;

export default getAxios;