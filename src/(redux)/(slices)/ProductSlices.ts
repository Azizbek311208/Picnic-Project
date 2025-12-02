import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../../types";

type State = {
  products: Product[];
  productForm: {
    imageUrl: string;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    discountedPrice?: number;
  };
  visible: boolean;
  editingId: number | string | null;
};

const initialState: State = {
  products: [],
  productForm: {
    imageUrl: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    rating: 1,
    discountedPrice: 0,
  },
  visible: false,
  editingId: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveProduct: (state, action: PayloadAction<Product>) => {
      if (state.editingId === null) {
        state.products.push(action.payload);
      } else {
        const index = state.products.findIndex((p) => p.id === state.editingId);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.editingId = null;
      }
    },

    getProductForm: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.productForm = {
        ...state.productForm,
        [action.payload.key]: action.payload.value,
      };
    },

    resetForm: (state) => {
      state.productForm = {
        imageUrl: "",
        title: "",
        description: "",
        price: 0,
        category: "",
        rating: 1,
        discountedPrice: 0,
      };
    },

    openModal: (state) => {
      state.visible = true;
    },
    closeModal: (state) => {
      state.visible = false;
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id == action.payload);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      state.editingId = action.payload.id;
      state.productForm = {
        imageUrl: Array.isArray(action.payload.imageUrl) ? action.payload.imageUrl.join(", ") : action.payload.imageUrl,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        category: action.payload.category + "",
        rating: action.payload.rating,
        discountedPrice: action.payload.discountedPrice,
      };
    },

    resetEditingId: (state) => {
      state.editingId = null;
    },
  },
});

export const {
  getProductForm,
  saveProduct,
  openModal,
  resetForm,
  closeModal,
  deleteUser,
  updateProduct,
  resetEditingId,
} = productSlice.actions;

export default productSlice.reducer;
