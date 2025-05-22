import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./redux/wishlistSlice.js";
import cartReducer from "./redux/cartSlice.js"; // импортируем редюсер корзины

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer, // добавляем cart
  },
});

export default store;
