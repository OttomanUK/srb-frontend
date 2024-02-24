import axios from "axios";
export const baseURL = "https://upgraded-space-sniffle-p6g69vv76rx294vp-8000.app.github.dev";
// export const baseURL = "http://127.0.0.1:8000";

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
export const getSingleInvoice = async (id) => await API.get(`/filter?anomaly=True&srb_invoice_id=${id}`);
export const getAllNtn = async () => await API.get(`/AllNtn`);
export const getAllInvoice = async (offset,anomaly) => await API.get(`/filter?anomaly=${anomaly}&offset=${offset}`);
export const getNtnInvoice = async (id,offset,anomaly) => await API.get(`filter?anomaly=${anomaly}&ntn=${id}&offset=${offset}`);
export const getPosInvoice = async (id,ntn,offset,anomaly) => await API.get(`/filter?anomaly=${anomaly}&pos=${id}&ntn=${ntn}&offset=${offset}`);
export const getNtnPos = async (id) => await API.get(`/NtnPos/${id}`);
export const getMissingInvoice = async (id) => await API.get(`/filter?missing_invoice_by_ntn=${id}`);
export const login = async (body) => await API.post(`/dj-rest-auth/login/`,body);
export const register = async (body) => await API.post(`/dj-rest-auth/registration/`,body);



const data={data:[

  {"srb_invoice_id":"1015231118521500582","pos_id":387,"ntn":55,"name":"Luna Sanders","invoice_date":"2023-11-18 02:12:24.000","invoice_no":"35630","rate_value":13.0,"sales_value":2399.0,"sales_tax":275.88,"consumer_name":null,"consumer_ntn":null,"consumer_address":null,"tariff_code":null,"extra_info":null,"pos_user":null,"pos_pass":null,"is_active":1,"created_date_time":"2023-11-18 02:24:16.000","invoice_type":1.0,"consider_for_Annex":1,"date":1700265600000},

{"srb_invoice_id":"1015231119221247014","pos_id":388,"ntn":55,"name":"Luna Sanders","invoice_date":"2023-11-19 22:11:46.000","invoice_no":"35634","rate_value":13.0,"sales_value":2600.0,"sales_tax":299.0,"consumer_name":null,"consumer_ntn":null,"consumer_address":null,"tariff_code":null,"extra_info":null,"pos_user":null,"pos_pass":null,"is_active":1,"created_date_time":"2023-11-18 22:17:29.000","invoice_type":1.0,"consider_for_Annex":1,"date":1700352000000}]}
export const submit_data = async (body) => await API.post(`/missing_invoices/`,data);