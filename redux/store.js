import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { thunk } from "redux-thunk";

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
