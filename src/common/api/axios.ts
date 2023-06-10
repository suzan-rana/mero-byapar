import axios from "axios";
import { error } from "console";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
 
instance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return req;
});
instance.interceptors.response.use(
  (res) => {
    console.log('RESPONSE', res)
    return res;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);
export default instance;
