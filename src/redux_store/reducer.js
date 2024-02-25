import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isLoading: false,
  userData: null,
  data: [],
  anomaly: "Anomaly",
  graphData: {},
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
      
    },
    setAnomaly: (state, action) => {
      const data = action.payload;
      state.anomaly=data
      
    },
  
  },
});

export const {
  startLoading,
  endLoading,
  addData,
  addGraphData,
  setAnomaly
} = centralStore.actions;

export default centralStore.reducer;

