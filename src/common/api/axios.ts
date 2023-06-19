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
  if (req.method === "post") {
    toast.loading("SUBMITTING YOUR REQUEST...", {
      toastId: "LOADING",
    });
  }
  req.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return req;
});
instance.interceptors.response.use(
  (res) => {
    if (res.status === 201) {
      toast.dismiss("LOADING");
      new Promise((res) => setTimeout(res, 500));
      toast.success(res.data?.message);
    }
    return res;
  },
  (error) => {
    toast.dismiss("LOADING");
    new Promise((res) => setTimeout(res, 500));
    if (error.response.status === 401) {
      toast.error(
        error.response.data.message ||
          "You are not authorized to perform the action!"
      );
    }

    return Promise.reject(error?.response?.data);
  }
);
export default instance;
