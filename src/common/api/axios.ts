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
    toast.loading("Creating...", {
      toastId: "LOADING",
    });
  }
  if (req.method === "patch" || req.method === "put") {
    toast.loading("Updating...", {
      toastId: "LOADING",
    });
  }
  if (req.method === "delete") {
    toast.loading("Deleting...", {
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
    new Promise((res) => setTimeout(res, 300));
    if (
      error.response.method === "post" ||
      error.response.method === "put" ||
      error.response.method === "delete"
    ) {
      if (error.response.status === 401) {
        toast.error(
          error.response.data.message ||
            "You are not authorized to perform the action!"
        );
      } else {
        toast.error(
          error.reponse.data.message || "Somehow request failed, Contact Admin"
        );
      }
    }
    if (error.response.status === 401 && error.request.method === "get") {
      toast.error(
        error.response.data.message ||
          "You are not authorized to perform the action!"
      );
      window.location.href = "/login";
      Cookies.remove("token");
      localStorage.clear();
    }

    return Promise.reject(error?.response?.data);
  }
);
export default instance;
