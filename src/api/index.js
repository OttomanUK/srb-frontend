import axios from "axios";
// export const baseURL = "https://firm-intimate-longhorn.ngrok-free.app/";
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
export const getSingleInvoice = async (id) => await API.get(`/filter?anomaly=10&anomaly_by_srb_invoice_id=${id}`);
export const getAllNtn = async (page) => await API.get(`/filter?ntn=all&page=${page}`);

export const getpos_idInvoice = async (id,ntn,page,anomaly,date,location) => await API.get(`/filter?anomaly=${anomaly}&anomaly_by_pos=${id}&anomaly_by_ntn=${ntn}&anomaly_by_date=${date}&page=${page}&anomaly_by_location=${location}`);

export const getNtnpos_id = async (id) => await API.get(`/Ntnpos_id/${id}`);
export const getUserRole = async () => await API.get(`/get_user_role`);
export const getMissingInvoice = async (id,page,date,pos="None",location="None") => await API.get(`/filter?missing_invoice_by_ntn=${id}&page=${page}&missing_invoice_by_date=${date}&missing_invoice_by_pos=${pos}&missing_invoice_by_location=${location}`);
export const login = async (body) => await API.post(`/dj-rest-auth/login/`,body);
export const register = async (body) => await API.post(`/dj-rest-auth/registration/`,body);
export const logout = async () => await API.post(`/dj-rest-auth/logout/`);



export const submit_data = async (body) =>await API.post("/missing_invoices/",data);
export const getAnomalyDescription = async () =>await API.get("/filter?anomaly_info=all");
export const getAllLocation = async () =>await API.get("/filter?location=all");
