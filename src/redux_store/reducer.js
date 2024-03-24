import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isLoading: false,
  userData: null,
  data: [],
  anomaly: "Anomaly",
  reduxpos_id: "None",
  reduxNtn:  "None",
  anomalyHashMap:  {},
  allLocation:[],
  allNtn:[],
  reduxLocation:  "None",
  reduxAnomalous:  10,
  isAuthorized:  false,
  goToGraph:  false,
  reduxDate:  "None",
next:null,
};

export const centralStore = createSlice({
  name: "centralStore",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },

    addData: (state, action) => {
      const data = action.payload;
      state.data=data
      
    },
    addGraphData: (state, action) => {
      const data = action.payload;
      state.graphData=data
      const dataString = JSON.stringify(data.next);
      localStorage.setItem('nextUrl', dataString);
      
    },
    setAnomaly: (state, action) => {
      const data = action.payload;
      state.anomaly=data
      
    },

    addNtn: (state, action) => {
      const data = action.payload;
      state.reduxNtn=data
      
    },
    addDate: (state, action) => {
      const data = action.payload;
      state.reduxDate=data
      
    },
    addpos_id: (state, action) => {
      const data = action.payload;
      state.reduxpos_id=data
      
    },
    addLocation: (state, action) => {
      const data = action.payload;
      state.reduxLocation=data
      
    },
    addAllLocation: (state, action) => {
      const data = action.payload;
      state.allLocation=data
      
    },
    addAllNtn: (state, action) => {
      const data = action.payload;
      state.allNtn=data
      
    },
    addAnomalyHashmap: (state, action) => {
      const data = action.payload;
      state.anomalyHashMap=data
      
    },
    addAnomalous: (state, action) => {
      const data = action.payload;
      state.reduxAnomalous=data
      
    },
    addGoToGraph: (state, action) => {
      const data = action.payload;
      state.goToGraph=data
      
    },
    addIsAuthorized: (state, action) => {
      const data = action.payload;
      state.isAuthorized=data
    },
  
  },
});

export const {
  startLoading,
  endLoading,
  addData,
  addGraphData,
  setAnomaly,
  addNtn,
  addLocation,
  addAllLocation,
  addAnomalyHashmap,
  addAnomalous,
  addpos_id,
  addDate,
  addIsAuthorized,
  addGoToGraph,
  addAllNtn

} = centralStore.actions;

export default centralStore.reducer;

