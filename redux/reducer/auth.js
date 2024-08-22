const initStateLogin = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state = initStateLogin, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const initStateOrder = {
  orders: [],
};

export const orderReducer = (state = initStateOrder, action) => {
  switch (action.type) {
    case "GET_ORDER_DATA":
      return {
        ...state,
        orders: action.value.data.query || [],
        tanggal: action.value.data.tanggal || [],
        submit: action.value.data.submitted,
      };
    case "UPDATE_ORDER_SUCCESS":
      return {
        ...state,
        orders: state.orders.map((order) => (order.id === action.value.id ? { ...order, pesan: action.value.pesan } : order)),
      };
    default:
      return state;
  }
};

const initStateRuang = {
  rooms: [],
};

export const ruangReducer = (state = initStateRuang, action) => {
  switch (action.type) {
    case "GET_RUANG_DATA":
      return {
        ...state,
        rooms: action.value.rooms,
      };
    default:
      return state;
  }
};

const initStateBooking = {
  bookings: [],
};

export const bookingReducer = (state = initStateBooking, action) => {
  switch (action.type) {
    case "GET_BOOKING_DATA_BY_ROOM_ID":
      return {
        ...state,
        bookings: action.value.bookings,
      };
    default:
      return state;
  }
};

// get Ruang by nama

const initStateNamaRuang = {
  ruang: [],
};

export const namaRuangReducer = (state = initStateNamaRuang, action) => {
  switch (action.type) {
    case "GET_RUANG_BY_NAMA":
      return {
        ...state,
        ruang: action.value.ruang,
      };
    default:
      return state;
  }
};

const insertRuang = {
  bookings: [],
  error: null,
};

export const insertRuangReducer = (state = insertRuang, action) => {
  switch (action.type) {
    case "INSERT_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: [...state.bookings, action.value],
        error: null,
      };
    case "INSERT_BOOKING_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: state.bookings.map((booking) => (booking.id === action.value.id ? action.value : booking)),
        error: null,
      };
    case "UPDATE_BOOKING_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: state.bookings.filter((booking) => booking.id !== action.id),
        error: null,
      };
    case "DELETE_BOOKING_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initStateZoom = {
  zooms: [],
};

export const zoomReducer = (state = initStateZoom, action) => {
  switch (action.type) {
    case "GET_ZOOM_DATA":
      return {
        ...state,
        zooms: action.value,
      };
    default:
      return state;
  }
};

const initStateBookingZoom = {
  isizoom: [],
};

export const bookingZoomReducer = (state = initStateBookingZoom, action) => {
  switch (action.type) {
    case "GET_ZOOM_PESAN_BY_ID":
      return {
        ...state,
        isizoom: action.value.isizoom,
      };
    default:
      return state;
  }
};

const insertZoom = {
  bookingZoom: [],
  error: null,
};

export const insertZoomReducer = (state = insertZoom, action) => {
  switch (action.type) {
    case "INSERT_ZOOM_SUCCESS":
      return {
        ...state,
        bookingZoom: [...state.bookingZoom, action.value],
        error: null,
      };
    case "INSERT_ZOOM_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_ZOOM_SUCCESS":
      return {
        ...state,
        bookingZoom: state.bookingZoom.map((booking) => (booking.id === action.value.id ? action.value : booking)),
        error: null,
      };
    case "UPDATE_ZOOM_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_ZOOM_SUCCESS":
      return {
        ...state,
        bookingZoom: state.bookingZoom.filter((booking) => booking.id !== action.id),
        error: null,
      };
    case "DELETE_ZOOM_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const absenState = {
  absen: null,
};

export const dataAbsenReducer = (state = absenState, action) => {
  switch (action.type) {
    case "GET_ABSEN_DATA":
      return {
        ...state,
        absen: action.value,
      };
    default:
      return state;
  }
};

const kusionerState = {
  kusioner: null,
  error: null,
};

export const kusionerReducer = (state = kusionerState, action) => {
  switch (action.type) {
    case "CREATE_KUSIONER_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "CREATE_KUSIONER_SUCCESS":
      return {
        ...state,
        kusioner: action.payload,
      };
    case "CREATE_KUSIONER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// SCAN ABSEN
const scanState = {
  scan: null,
  error: null,
};

export const scanReducer = (state = scanState, action) => {
  switch (action.type) {
    case "CREATE_SCAN_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "CREATE_SCAN_SUCCESS":
      return {
        ...state,
        scan: action.payload,
      };
    case "CREATE_SCAN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const kritikState = {
  kritik: null,
  error: null,
};

export const kritikReducer = (state = kritikState, action) => {
  switch (action.type) {
    case "CREATE_KRITIK_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "CREATE_KRITIK_SUCCESS":
      return {
        ...state,
        kritik: action.payload,
      };
    case "CREATE_KRITIK_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const dataKritikState = {
  dataKritik: null,
};

export const dataKritikReducer = (state = dataKritikState, action) => {
  switch (action.type) {
    case "GET_KRITIK_DATA":
      return {
        ...state,
        dataKritik: action.value,
      };
    default:
      return state;
  }
};

const initStatePesanHarian = {
  pesanHarian: [],
};

export const pesanHarianReducer = (state = initStatePesanHarian, action) => {
  switch (action.type) {
    case "GET_PESAN_HARIAN_DATA":
      return {
        ...state,
        pesanHarian: action.value,
      };
    default:
      return state;
  }
};

const insertPesanHarian = {
  pesanHarianZoom: [],
  error: null,
};

export const insertPesanHarianReducer = (state = insertPesanHarian, action) => {
  switch (action.type) {
    case "INSERT_PESAN_HARIAN_SUCCESS":
      return {
        ...state,
        pesanHarianZoom: [...state.pesanHarianZoom, action.value],
        error: null,
      };
    case "INSERT_PESAN_HARIAN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_PESAN_HARIAN_SUCCESS":
      return {
        ...state,
        pesanHarianZoom: state.pesanHarianZoom.map((pesanHarian) => (pesanHarian.id === action.value.id ? action.value : pesanHarian)),
        error: null,
      };
    case "UPDATE_PESAN_HARIAN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_PESAN_HARIAN_SUCCESS":
      return {
        ...state,
        pesanHarianZoom: state.pesanHarianZoom.filter((pesanHarian) => pesanHarian.id !== action.id),
        error: null,
      };
    case "DELETE_ZOOM_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateValueZoom = {
  valueZoom: [],
  error: null,
};

export const updateValueZoomReducer = (state = updateValueZoom, action) => {
  switch (action.type) {
    case "UPDATE_VALUE_ZOOM_SUCCESS":
      return {
        ...state,
        valueZoom: state.valueZoom.map((nilaizoom) => (nilaizoom.id === action.value.id ? action.value : nilaizoom)),
        error: null,
      };
    case "UPDATE_VALUE_ZOOM_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const kantorUnitData = {
  kantor: null,
};

export const kantorUnitDataReducer = (state = kantorUnitData, action) => {
  switch (action.type) {
    case "GET_KANTOR_DATA":
      return {
        ...state,
        kantor: action.value,
      };
    default:
      return state;
  }
};

const fetchKantorUnitData = {
  fetchKantor: null,
};

export const fetchKantorUnitDataReducer = (state = fetchKantorUnitData, action) => {
  switch (action.type) {
    case "FETCH_KANTOR_DATA":
      return {
        ...state,
        fetchKantor: action.value,
      };
    default:
      return state;
  }
};

const kandangData = {
  kandang: null,
};

export const kandangDataReducer = (state = kandangData, action) => {
  switch (action.type) {
    case "GET_KANDANG_DATA":
      return {
        ...state,
        kandang: action.value,
      };
    default:
      return state;
  }
};

const fetchKandangData = {
  fetchKandang: null,
};

export const fetchKandangDataReducer = (state = fetchKandangData, action) => {
  switch (action.type) {
    case "FETCH_KANDANG_DATA":
      return {
        ...state,
        fetchKandang: action.value,
      };
    default:
      return state;
  }
};

const valueUpdate = {
  valueApp: null,
};

export const valueUpdateReducer = (state = valueUpdate, action) => {
  switch (action.type) {
    case "VALUE_APP":
      return {
        ...state,
        valueApp: action.value,
      };
    default:
      return state;
  }
};

export default bookingReducer;
