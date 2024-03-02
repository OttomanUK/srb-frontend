import axios from "axios";
// export const baseURL = "https://upgraded-space-sniffle-p6g69vv76rx294vp-8000.app.github.dev";
import {data} from "./data"
export const baseURL = "http://127.0.0.1:8000";

export const API = axios.create({ baseURL: baseURL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("authToken")) {
    req.headers.Authorization = `Token ${JSON.parse(
      localStorage.getItem("authToken")
    )}`;

    }
  return req;
});
export const fetchAllProducts = async () => await API.get(`/products`);
export const getSingleInvoice = async (id) => await API.get(`/filter?anomaly=10&anomaly_by_srb_invoice_id=${id}`);
export const getAllNtn = async (page) => await API.get(`/filter?ntn=all&page=${page}`);
export const getAllInvoice = async (page,anomaly,date) => await API.get(`/filter?anomaly=${anomaly}&page=${page}&date=${date}`);
export const getNtnInvoice = async (id,page,anomaly,date) => await API.get(`filter?anomaly=${anomaly}&anomaly_by_ntn=${id}&page=${page}&date=${date}`);
export const getPosInvoice = async (id,ntn,page,anomaly,date) => await API.get(`/filter?anomaly=${anomaly}&anomaly_by_pos=${id}&anomaly_by_ntn=${ntn}&anomaly_by_date=${date}&page=${page}`);
export const getNtnPos = async (id) => await API.get(`/NtnPos/${id}`);
export const getMissingInvoice = async (id,page) => await API.get(`/filter?missing_invoice_by_ntn=${id}&page=${page}`);
export const login = async (body) => await API.post(`/dj-rest-auth/login/`,body);
export const register = async (body) => await API.post(`/dj-rest-auth/registration/`,body);



export const submit_data = async (body) =>await API.post("/missing_invoices/",data);
