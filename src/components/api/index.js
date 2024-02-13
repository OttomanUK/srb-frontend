import axios from "axios";
export const baseURL = "https://owaisali246.pythonanywhere.com/";
// export const baseURL = "https://76ae-115-186-48-54.ngrok-free.app/";
// const API = axios.create({ baseURL: "http://127.0.0.1:8000/" });
const API = axios.create({ baseURL: baseURL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("authToken")) {
    req.headers.Authorization = `Token ${JSON.parse(
      localStorage.getItem("authToken")
    )}`;
  }

  return req;
});

export const fetchAllProducts = async () => await API.get(`/products`);
export const getSingleInvoice = async () => await API.get(`/SingleInvoice`);
export const getAllNtn = async () => await API.get(`/AllNtn`);
export const getAllInvoice = async () => await API.get(`/AllInvoice`);
export const getNtnInvoice = async (id) => await API.get(`/NtnInvoice/${id}`);
export const getPosInvoice = async (id) => await API.get(`/PosInvoice/${id}`);
export const getNtnPos = async (id) => await API.get(`/NtnPos/${id}`);
