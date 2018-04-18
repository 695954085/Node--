import axios from 'axios';

export const requestLogin = params => {
  console.log(params);
  return axios.post('/login', params);
};

export const isLogin = () => axios.get('/islogin');

export const getServerData = () => axios.get('/getserverdata').then(value => value.data);

export const addMessage = (oid, friendOid, message, self) => axios.post('/addMessage', {
  _id: oid,
  friendOid, friendOid,
  message: message,
  self: self
})
