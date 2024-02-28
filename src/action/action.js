import {
    // allProducts,
    startLoading,
    endLoading,
  } from "../redux_store/reducer.js";
  import * as api from "../api/index.js";
  import {data1} from "../data/singleData.js"
import reducer from "../redux_store/reducer.js";
  export const fetchAllProducts = () => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.fetchAllProducts();
      const a = data.map((product) => 
      {
        const b=product.cylinder;
        const c=product.discount;
        return {...b,discount:c}
        })
        dispatch(endLoading());
      } catch (error) {
        console.log(error.message);
      }
    };

  export const getSingleInvoice = (id) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getSingleInvoice(id);
      console.log(data)
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };

  export const getAllInvoice = (page,anomaly,date="None") => async (dispatch) => {
    try {
      dispatch(startLoading());
      console.log(page)
      const { data } = await api.getAllInvoice(page,anomaly,date);
        dispatch(endLoading());
        console.log(data)
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getNtnInvoice = (id,page,anomaly,date="None") => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getNtnInvoice(id,page,anomaly,date);
        dispatch(endLoading());
        console.log(data)
        return data
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getPosInvoice = (id,ntn,page,anomaly,date="None") => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getPosInvoice(id,ntn,page,anomaly,date);
      console.log(data)
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getAllNtn = () => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getAllNtn();
        dispatch(endLoading());
        console.log(data)
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getNtnPos = (id) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getNtnPos(id);
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getMissingInvoice = (id) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getMissingInvoice(id);
        dispatch(endLoading());
        console.log(data)
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const login = (body) => async (dispatch) => {
    // try {
      dispatch(startLoading());
      const  {data}  = await api.login(body);
        dispatch(endLoading());
        console.log(data)
        localStorage.setItem("authToken", JSON.stringify(data.key));
        return true;
      // } catch (error) {
        console.log(error.message);
      // }
    };
  export const register = (body) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const  data  = await api.register(body);
        dispatch(endLoading());
        console.log(data)
        // localStorage.setItem("authToken", JSON.stringify(data.key));
        return true;
      } catch (error) {
        console.log(error.message);
        return false
      }
    };
  export const submit_data = (body) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.submit_data(data1);
        dispatch(endLoading());
        console.log(data)
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };