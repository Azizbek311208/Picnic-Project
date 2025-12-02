import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./(api)/ProductApi";
import productsSlice from "./(slices)/ProductSlices";
import cartSlice from "./(slices)/CartSlices";
import SearchSlice from "./(slices)/SearchSilce";
const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    search: SearchSlice,

    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
