import axios from "axios";
// export const baseURL = "https://upgraded-space-sniffle-p6g69vv76rx294vp-8001.app.github.dev";
export const baseURL = "http://127.0.0.1:8000";

const API = axios.create({ baseURL: baseURL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("authToken")) {
    // req.headers.Authorization = `Token ${JSON.parse(
    //   localStorage.getItem("authToken")
    // )}`;
    req.headers.Authorization = `Token bf6aacfc21ec2e5b7912df7ff5407dc759c468db`;
  }

  return req;
});

export const fetchAllProducts = async () => await API.get(`/products`);
export const getSingleInvoice = async (id) => await API.get(`/filter?anomaly=True&srb_invoice_id=${id}`);
export const getAllNtn = async () => await API.get(`/AllNtn`);
export const getAllInvoice = async () => await API.get(`/filter?anomaly=True`);
export const getNtnInvoice = async (id) => await API.get(`/NtnInvoice/${id}`);
export const getPosInvoice = async (id) => await API.get(`/filter?anomaly=True&pos=${id}`);
export const getNtnPos = async (id) => await API.get(`/NtnPos/${id}`);
export const login = async (body) => await API.post(`/dj-rest-auth/login/`,body);
export const submit_data = async (body) => await API.post(`/submit_data/`,body);
