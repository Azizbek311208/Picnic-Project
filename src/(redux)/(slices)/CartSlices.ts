import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types";

export type CartItem = Product;

const saveCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState: CartItem[] = []; 

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (_, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },

    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existing = state.find((p) => p.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.push({ ...product, quantity });
      }
      saveCart(state);
    },

    increase: (state, action: PayloadAction<string>) => {
      const item = state.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state);
    },

    decrease: (state, action: PayloadAction<string>) => {
      const item = state.find((p) => p.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          const index = state.findIndex((p) => p.id === action.payload);
          state.splice(index, 1);
        }
      }
      saveCart(state);
    },

    remove: (state, action: PayloadAction<string>) => {
      const newState = state.filter((p) => p.id !== action.payload);
      saveCart(newState);
      return newState;
    },

    clear: () => {
      saveCart([]);
      return [];
    },
  },
});

export const { addToCart, increase, decrease, remove, clear, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
