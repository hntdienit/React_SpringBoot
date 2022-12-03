import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Helpers/Auth/Auth.jsx";
import messageReducer from "./Helpers/Auth/Message.jsx";

const reducer = {
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
