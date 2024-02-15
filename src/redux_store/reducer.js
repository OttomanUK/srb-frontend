import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isLoading: false,
  userData: null,
  productList: [],
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

    addProductQuantity: (state, action) => {
      const { product } = action.payload;
      const { quantity } = action.payload;

      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        if (quantity > 0) {
          state.cart[existingProductIndex].quantity = quantity;
        }
      } else {
        product.quantity = quantity;
        state.cart.push(product);
      }
    },
  
  },
});

export const {
  startLoading,
  endLoading,

  addProductQuantity,
} = centralStore.actions;

export default centralStore.reducer;

