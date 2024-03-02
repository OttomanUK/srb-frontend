import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isLoading: false,
  userData: null,
  data: [],
  anomaly: "Anomaly",
  reduxPos: "None",
  graphData: {},
  reduxNtn:  "None",
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
    addPos: (state, action) => {
      const data = action.payload;
      state.reduxPos=data
      
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
  addPos,
} = centralStore.actions;

export default centralStore.reducer;

