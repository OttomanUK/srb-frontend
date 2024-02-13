import {
    allProducts,
    startLoading,
    endLoading,
  } from "../reduxStore/reducer.js";
  import * as api from "../api/index.js";
  
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

  export const getSingleInvoice = () => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getSingleInvoice();
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };

  export const getAllInvoice = () => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getAllInvoice();
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getNtnInvoice = (id) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getNtnInvoice(id);
        dispatch(endLoading());
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
  export const getPosInvoice = (id) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await api.getPosInvoice(id);
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