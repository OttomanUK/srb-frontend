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
  export const getPosInvoice = (id="None",ntn="None",page=1,anomaly,date="None") => async (dispatch) => {
    try {
      console.log(date)
      dispatch(startLoading());
      const { data } = await api.getPosInvoice(id,ntn,page,anomaly,date);
      console.log(date)
      console.log(id)
      console.log(data)
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getAllNtn = (page) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getAllNtn(page);
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
  export const getMissingInvoice = (id="all",page=1) => async (dispatch) => {
    try {
      let data
      dispatch(startLoading());
      if(id=="None"){
          data  = await api.getMissingInvoice("all",page);
        
      }else{
        
          data  = await api.getMissingInvoice(id,page);
      }
        dispatch(endLoading());
        console.log(data.data)
        return data.data;
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
      const { data } = await api.submit_data(body);
        dispatch(endLoading());
        console.log(data)
        return data;
      } catch (error) {
        console.log(error);
      }
    };