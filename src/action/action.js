import {
    // allProducts,
    startLoading,
    endLoading,
    addAnomalyHashmap,
    addAllLocation,
    addIsAuthorized
  } from "../redux_store/reducer.js";
  import * as api from "../api/index.js";
  import {data1} from "../data/singleData.js"
  
export const getAllLocation=()=>async(dispatch)=>{
try{
  dispatch(startLoading())
  const {data}=await api.getAllLocation()
  dispatch(addAllLocation(data.results))
  dispatch(endLoading())
  return data.results
}
catch(error){
  console.log("There is some error"+error)
}
}
export const getAnomalyDescription=()=>async(dispatch)=>{
  try{
    dispatch(startLoading())
    const {data}=await api.getAnomalyDescription()
    const anomalyHashMap = {};
    data.results?.forEach(item => {
      anomalyHashMap[item.id] = item.description;
    });
    dispatch(addAnomalyHashmap(anomalyHashMap))
    dispatch(endLoading())
    return anomalyHashMap
    
}
catch(error){
  console.log("There is some error"+error)

}
}
export const getSingleInvoice = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await api.getSingleInvoice(id);
    dispatch(endLoading());
    return data;
      } catch (error) {
        console.log(error.message);
      }
    };
    
  
  export const getPosInvoice = (id="None",ntn="None",page=1,anomaly,date="None",location="None") => async (dispatch) => {
    try {
      console.log(date)
      dispatch(startLoading());
      const { data } = await api.getPosInvoice(id,ntn,page,anomaly,date,location);
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
  export const getMissingInvoice = (id="all",page=1,date="None") => async (dispatch) => {
    try {
      let data
      dispatch(startLoading());
      if(id=="None"){
          data  = await api.getMissingInvoice("all",page,date);
        
      }else{
        
          data  = await api.getMissingInvoice(id,page,date);
      }
        dispatch(endLoading());
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
       
        localStorage.setItem("authToken", JSON.stringify(data.key));
        return true;
      // } catch (error) {
        console.log(error.message);
      // }
    };
  export const getUserRole = () => async (dispatch) => {
    try {
      dispatch(startLoading());
      const  {data}  = await api.getUserRole();
        dispatch(endLoading());
       
        if(data.is_admin || data.is_staff){
          dispatch(addIsAuthorized(true))
          return true;
        }
        
        dispatch(addIsAuthorized(false))
        return true;
        
      } catch (error) {
        console.log(error.message);
      }
    };
  export const register = (body) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const  data  = await api.register(body);
        dispatch(endLoading());
       
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
       
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    export const analytics = (id = "None", ntn = "None", page = 1, anomaly=10, date = "None", location = "None") => async (dispatch) => {
      try {
        dispatch(startLoading());
    
        let currentPage = 1;
        const result = [];
        console.log(anomaly);
    
        const fetchData = async (currentPage) => {
          const { data } = await api.getPosInvoice(id, ntn, currentPage, anomaly, date, location);

          result.push(...data.results);
          if (data.next) {
            await fetchData(currentPage + 1); // Recursive call for the next page
          }
        };
    
        await fetchData(currentPage); // Start fetching data for the first page
    
        dispatch(endLoading());
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(endLoading());
        throw error; // Propagate the error
      }
    };
    
    export const missingAnalytics= (id="all",page=1) =>async(dispatch)=>{ 
      try {
        dispatch(startLoading())
        let currentPage = 1;
        const result=[]
        const fetchData = async (currentPage) => {
          const data=await dispatch(getMissingInvoice(id,page))
          result.push(data.results)
          if (data.next) {
            await fetchData(currentPage + 1); // Recursive call for the next page
          }
        } 
        
        await fetchData(currentPage);
        dispatch(endLoading());
        return result
      }
        catch(error) {
          console.log("There is some Errro"+error)
        }
    }