import {
    // allProducts,
    startLoading,
    endLoading,
    addAnomalyHashmap,
    addAllLocation,
    addIsAuthorized,
    addAllNtn
  } from "../redux_store/reducer.js";
  import * as api from "../api/index.js";
  import { validateParameters } from "./validator.js";
  
export const getAllLocation=()=>async(dispatch)=>{
try{
  
  const {data}=await api.getAllLocation()
  dispatch(addAllLocation(data.results))
  return data.results
}
catch(error){
  console.log("There is some error"+error)
}
}
export const getAnomalyDescription=()=>async(dispatch)=>{
  try{
    const {data}=await api.getAnomalyDescription()
    const anomalyHashMap = {};
    data.results?.forEach(item => {
      anomalyHashMap[item.id] = item.description;
    });
    dispatch(addAnomalyHashmap(anomalyHashMap))
    return anomalyHashMap
    
}
catch(error){
  console.log("There is some error"+error)

}
}
export const getSingleInvoice = (id) => async (dispatch) => {
  try {
    validateParameters( id );
    dispatch(startLoading());
    
    const { data } = await api.getSingleInvoice(id);
    console.log(data)
    dispatch(endLoading());
    return data;
      } catch (error) {
         dispatch(endLoading());
        console.log(error.message);
      }
    };
    
  
  export const getpos_idInvoice = (id="None",ntn="None",page=1,anomaly,date="None",location="None") => async (dispatch) => {
    try {
      validateParameters( id,ntn,page,anomaly,date,location );
      console.log(date)
      dispatch(startLoading());
      const { data } = await api.getpos_idInvoice(id,ntn,page,anomaly,date,location);
      dispatch(endLoading());
       
        return data;
      } catch (error) {
         dispatch(endLoading());
        console.log(error.message);
      }
    };
    export const getAllNtn = (page, all = false) => async (dispatch) => {
      try {
        console.log(all)
        validateParameters("None", "None", page, "None", "None", "None");
    
        dispatch(startLoading());   
    if(all){
      let uniqueNtnSet=new Set()
      let nextPage = page; // Initialize nextPage with the provided page number
      while (nextPage) {
        const { data } = await api.getAllNtn(nextPage);
       // Accumulate results
        data.results.forEach(result => {
          uniqueNtnSet.add(result.ntn);
        });
        
        if (data.next) {
          nextPage = nextPage + 1; // Move to the next page
        } else {
          nextPage = null; // Set nextPage to null to exit the loop
        }
      }
      const uniqueNtnList = [...uniqueNtnSet];
      dispatch(addAllNtn(uniqueNtnList));
      dispatch(endLoading());
      return ;
      
    } else{
      const { data } = await api.getAllNtn(page);
      dispatch(endLoading());
      return data;

    }   
        
      } catch (error) {
        dispatch(endLoading());
        console.log(error.message);
      }
    };
    
  export const getNtnpos_id = (id) => async (dispatch) => {
    try {
      validateParameters( id );
      dispatch(startLoading());
      const { data } = await api.getNtnpos_id(id);
        dispatch(endLoading());
        return data;
      } catch (error) {
         dispatch(endLoading());
        console.log(error.message);
      }
    };
  export const getMissingInvoice = (id="all",page=1,date="None",pos="None",location="None") => async (dispatch) => {
    try {
      validateParameters( id,"None",page,"None",date,"None" );

      let data
      dispatch(startLoading());
      if(id=="None"){
          data  = await api.getMissingInvoice("all",page,date,pos,location);
        
      }else{
        
          data  = await api.getMissingInvoice(id,page,date,pos,location);
      }
        dispatch(endLoading());
        return data.data;
      } catch (error) {
         dispatch(endLoading());
        console.log(error.message);
      }
    };
  export const login = (body) => async (dispatch) => {
    try {
      dispatch(startLoading());
      const  {data}  = await api.login(body);
        dispatch(endLoading());
       
        localStorage.setItem("authToken", JSON.stringify(data.key));
        return true;
      } catch (error) {
         dispatch(endLoading());
         console.log(error.message);
         return false
      }
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
        // TODO: make it false please👇
        dispatch(addIsAuthorized(true))
        return true;
        
      } catch (error) {
         dispatch(endLoading());
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
         dispatch(endLoading());
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
         dispatch(endLoading());
        console.log(error);
      }
    };

    export const analytics = (id = "None", ntn = "None", page = 1, anomaly=10, date = "None", location = "None") => async (dispatch) => {
      try {
        validateParameters( id,ntn,page,anomaly,date,location );

        dispatch(startLoading());
    
        let currentPage = 1;
        const result = [];
        console.log(anomaly);
    
        const fetchData = async (currentPage) => {
          const { data } = await api.getpos_idInvoice(id, ntn, currentPage, anomaly, date, location);

          result.push(...data.results);
          return result
          if (data.next) {
            await fetchData(currentPage + 1); // Recursive call for the next page
          }
        };
    
        await fetchData(currentPage); // Start fetching data for the first page
    
        dispatch(endLoading());
        return result;
      } catch (error) {
         dispatch(endLoading());
        console.error("Error fetching data:", error);
        dispatch(endLoading());
        throw error; // Propagate the error
      }
    };
    
    export const missingAnalytics= (id="all",page=1,date="None",pos="None",location="None") =>async(dispatch)=>{ 
      try {
        validateParameters( id,"None",page,"None","None","None" );

        dispatch(startLoading())
        let currentPage = 1;
        const result=[]
        const fetchData = async (currentPage) => {
          const data=await dispatch(getMissingInvoice(id,page,date,pos,location))
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
           dispatch(endLoading());
          console.log("There is some Errro"+error)
        }
    }

    export const logout=()=>async(dispatch)=>{
      try{
        if (localStorage.getItem("authToken")) {
          const { data } = await api.logout(); 
          localStorage.removeItem("authToken");
        }
        return true
      }catch(err){
         dispatch(endLoading());
        localStorage.removeItem("authToken");
    }
    };
  

  
