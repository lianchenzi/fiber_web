import axios from './http'
import Qs from 'qs'
let base=''
export const loginType = params =>{
  console.log(Qs.stringify(params))
  return axios.post(`${base}/login`,Qs.stringify(params))
};
export const setupTest = params=>{
  return axios.post(`${base}/task`,params)
};

export const getRunningInfo = params=>{
  return axios.get(`${base}/running`)
};

export const getDevice = params=>{
  return axios.get(`${base}/device`)
};
export const setDevice = params=>{
  return axios.post(`${base}/device`,params)
};
export const getProductConfig = params=>{
  console.log(Qs.stringify(params))
  return axios.get(`${base}/product?`+Qs.stringify(params))
};
export const getBhs= params=>{
  console.log(Qs.stringify(params))
  return axios.get(`${base}/bhs?`+Qs.stringify(params))
};

export const getResult= params=>{
  console.log(Qs.stringify(params))
  return axios.get(`${base}/result?`+Qs.stringify(params))
};
export const addProduct = params=>{
  return axios.post(`${base}/product`,params)
};
export const updateProduct = params=>{
  return axios.put(`${base}/product`,params)
};

export const runningControl = params=>{
  console.log(Qs.stringify(params))
  return axios.get(`${base}/task?`+Qs.stringify(params))
};
