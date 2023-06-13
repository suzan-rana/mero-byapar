import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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
    if (res.status === 201) {
      toast.success(res.data?.message);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);
export default instance;
