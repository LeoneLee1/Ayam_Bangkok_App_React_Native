import { combineReducers } from "redux";
import {
  orderReducer,
  kritikReducer,
  ruangReducer,
  bookingReducer,
  namaRuangReducer,
  insertRuangReducer,
  authReducer,
  zoomReducer,
  bookingZoomReducer,
  insertZoomReducer,
  dataAbsenReducer,
  kusionerReducer,
  scanReducer,
  dataKritikReducer,
  pesanHarianReducer,
  insertPesanHarianReducer,
} from "./auth";
import { globalReducer } from "./global";

const reducer = combineReducers({
  globalReducer,
  orderReducer,
  ruangReducer,
  bookingReducer,
  namaRuangReducer,
  insertRuangReducer,
  authReducer,
  zoomReducer,
  bookingZoomReducer,
  insertZoomReducer,
  dataAbsenReducer,
  kusionerReducer,
  scanReducer,
  kritikReducer,
  dataKritikReducer,
  pesanHarianReducer,
  insertPesanHarianReducer,
});

export default reducer;
