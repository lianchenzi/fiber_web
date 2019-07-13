import axios from './http'
import Qs from 'qs'
let base=''
export const loginType = params =>{
  console.log(Qs.stringify(params))
  return axios.post(`${base}/login`,Qs.stringify(params))
};
export const setupTest = params=>{
  console.log(params)
  return axios.post(`${base}/task`,params)
};

export const getRunningInfo = params=>{
  console.log(params)
  return axios.get(`${base}/running`)
};
