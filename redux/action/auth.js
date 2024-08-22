import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import { setLoading } from "./global";
import { getData, storeData } from "../../utils/storage/index";

const API_HOST = {
  url: "https://apps.ptmustika.my.id/api",
};

// SESUAI IP ADDRESS WIFI KALIAN CONTOH = http://192.168.1.1:8000 (KANTOR)
// const API_HOST = {
//   url: "http://192.168.1.88:8000/api",
// };
// const API_HOST = {
//   url: "http://192.168.1.252:8000/api",
// };

// KOSAN IP ADRRESS
// const API_HOST = {
//   url: "http://192.168.0.110:8000/api",
// };

// PROSES LOGIN FORM
export const loginAction = (form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await Axios.post(`${API_HOST.url}/login`, form);

    if (res.status === 200) {
      const { token, user } = res.data.data;

      if (!token || !user) {
        throw new Error("Invalid response data");
      }

      storeData("token", { value: token });
      storeData("user", { value: user });

      console.log("Login Response:", res.data);
      console.log("Token: ", token);
      console.log("User: ", user);

      dispatch(setLoading(false));
      navigation.reset({ index: 0, routes: [{ name: "MainApp" }] });
    } else {
      throw new Error("Login failed");
    }
  } catch (err) {
    dispatch(setLoading(false));
    console.log("Login Error:", err);

    if (err.response && err.response.status === 401) {
      showMessage({
        message: "Error",
        description: "Username atau Password Salah",
        type: "danger",
      });
    } else {
      showMessage({
        message: "Error",
        description: "Username atau Password Salah!",
        type: "danger",
      });
    }
  }
};

export const getProfileAction = () => (dispatch) => {
  dispatch(setLoading(true));
  getData("token").then((token) => {
    Axios.get(`${API_HOST.url}/login/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        console.log("Profile Response: ", res.data);
        dispatch({
          type: "GET_USER_LOGIN",
          value: res.data,
        });
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log("Profile Error: ", err);
        showMessage("Failed to fetch profile data");
      });
  });
};

// GET DATA ORDER MAKAN BY LOGIN USER
export const getOrderAction = () => (dispatch) => {
  dispatch(setLoading(true));
  getData("token").then((token) => {
    Axios.get(`${API_HOST.url}/order`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        console.log("Order Response:", res.data);
        dispatch({
          type: "GET_ORDER_DATA",
          value: res.data,
        });
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log("Order Error:", err);
        showMessage({
          message: "Error",
          description: "Failed to fetch order data",
          type: "danger",
        });
      });
  });
};

// UPDATE ORDER ACTION
export const updateOrderAction = (id, pesan) => (dispatch) => {
  dispatch(setLoading(true));
  getData("token").then((token) => {
    Axios.post(
      `${API_HOST.url}/order/update/${id}`,
      { pesan },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
      .then((res) => {
        console.log("Update Order Response:", res.data);
        if (res.data.meta.code === 200) {
          dispatch({
            type: "UPDATE_ORDER_SUCCESS",
            value: { id, pesan },
          });
          showMessage({
            message: "Success",
            description: "Berhasil ambil data order makan",
            type: "success",
          });
        } else {
          // showMessage(res.data.meta.message, "danger"); // Hanya pesan yang diteruskan
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log("Update Order Error:", err);
        // showMessage("Gagal memperbarui pesanan");
      });
  });
};

// GET DATA RUANGAN
export const getRuangAction = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/bookings`)
    .then((res) => {
      console.log("Booking Response:", res.data);
      dispatch({
        type: "GET_RUANG_DATA",
        value: {
          rooms: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log("Booking Error:", err);
      showMessage("Failed to fetch booking data");
    });
};

// GET DATA BOOKING BY RUANGAN
export const getBookingAction = (id) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/bookings/list/${id}`)
    .then((res) => {
      console.log("Booking Data Response:", res.data);
      dispatch({
        type: "GET_BOOKING_DATA_BY_ROOM_ID",
        value: {
          bookings: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch({
        type: "GET_BOOKING_DATA_BY_ROOM_ID",
        value: {
          bookings: [],
        },
      });
      dispatch(setLoading(false));
      console.log("Booking Data Error:", err);
    });
};

// GET RUANG BY NAMA
export const getNamaRuangAction = (nama) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/bookings/list/pesan/${nama}`)
    .then((res) => {
      console.log("Nama Ruang Response:", res.data);
      dispatch({
        type: "GET_RUANG_BY_NAMA",
        value: {
          ruang: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log("Nama Ruang Error:", err);
    });
};

// INSERT BOOKING RUANG
export const insertBookingAction = (form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await getData("token");
    const response = await Axios.post(`${API_HOST.url}/bookings/list/pesan/insert`, form, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.data.meta.code === 200) {
      dispatch({
        type: "INSERT_BOOKING_SUCCESS",
        value: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Berhasil memesan ruang",
        type: "success",
      });
      navigation.navigate("Booking");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "INSERT_BOOKING_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal Memesan Ruangan!, mohon cek kapasitas dll",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// UPDATE BOOKING RUANG
export const updateBookingAction = (id, form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await Axios.post(`${API_HOST.url}/bookings/list/pesan/edit/${id}`, form);

    if (response.data.meta.code === 200) {
      dispatch({
        type: "UPDATE_BOOKING_SUCCESS",
        value: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Booking berhasil diperbarui!",
        type: "success",
      });
      navigation.navigate("Booking");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_BOOKING_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal memperbarui booking, mohon cek data!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// DELETE BOOKING RUANG
export const deleteBooking = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await Axios.delete(`${API_HOST.url}/bookings/list/pesan/delete/${id}`);

      if (response.data.meta.code === 200) {
        dispatch(deleteBookingSuccess(id));
        showMessage({
          message: "Success",
          description: "Booking berhasil dihapus!",
          type: "success",
        });
      } else {
        throw new Error(response.data.meta.message);
      }
    } catch (error) {
      dispatch(deleteBookingFailure(error.message));
      showMessage({
        message: "Error",
        description: "Gagal menghapus booking!",
        type: "danger",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const deleteBookingSuccess = (id) => ({
  type: "DELETE_BOOKING_SUCCESS",
  id,
});

const deleteBookingFailure = (error) => ({
  type: "DELETE_BOOKING_FAILURE",
  payload: error,
});

// GET DATA ZOOM
export const getZoomAction = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/zoom`)
    .then((res) => {
      console.log("Zoom Response:", res.data);
      dispatch({
        type: "GET_ZOOM_DATA",
        value: {
          zooms: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log("Zoom Error:", err);
      showMessage({
        message: "Error",
        description: "Failed to fetch booking data!",
        type: "danger",
      });
    });
};

// GET DATA BOOKING BY ZOOM
export const getBookingZoomAction = (id) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/zoom/list/${id}`)
    .then((res) => {
      console.log("Booking Zoom Data Response:", res.data);
      dispatch({
        type: "GET_ZOOM_PESAN_BY_ID",
        value: {
          isizoom: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Booking Zoom Data Error:", err);
    });
};

// INSERT BOOKING ZOOM
export const insertZoomAction = (form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await getData("token");
    const response = await Axios.post(`${API_HOST.url}/zoom/list/pesan/insert`, form, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.data.meta.code === 200) {
      dispatch({
        type: "INSERT_ZOOM_SUCCESS",
        value: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Zoom berhasil dibuat!",
        type: "success",
      });
      navigation.navigate("Zoom");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "INSERT_ZOOM_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal membuat Zoom, mohon cek kapasitas dll!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// UPDATE BOOKING RUANG
export const updateZoomAction = (id, form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await Axios.post(`${API_HOST.url}/zoom/list/pesan/edit/${id}`, form);

    if (response.data.meta.code === 200) {
      dispatch({
        type: "UPDATE_ZOOM_SUCCESS",
        value: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Zoom berhasil diperbarui!",
        type: "success",
      });
      navigation.navigate("Zoom");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ZOOM_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal memperbarui zoom, mohon cek data!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// DELETE BOOKING ZOOM
export const deleteZoom = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await Axios.delete(`${API_HOST.url}/zoom/list/pesan/delete/${id}`);

      if (response.data.meta.code === 200) {
        dispatch(deleteZoomSuccess(id));
        showMessage({
          message: "Success",
          description: "Zoom berhasil dihapus!",
          type: "success",
        });
      } else {
        throw new Error(response.data.meta.message);
      }
    } catch (error) {
      dispatch(deleteZoomFailure(error.message));
      showMessage({
        message: "Error",
        description: "Gagal menghapus zoom!",
        type: "danger",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const deleteZoomSuccess = (id) => ({
  type: "DELETE_ZOOM_SUCCESS",
  id,
});

const deleteZoomFailure = (error) => ({
  type: "DELETE_ZOOM_FAILURE",
  payload: error,
});

// GET DATA ABSEN
export const getAbsenAction = () => (dispatch) => {
  dispatch(setLoading(true));
  getData("token").then((token) => {
    Axios.get(`${API_HOST.url}/absen`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((res) => {
        console.log("Data Absen Response:", res.data);
        dispatch({
          type: "GET_ABSEN_DATA",
          value: res.data,
        });
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log("Data Absen Error:", err);
        showMessage({
          message: "Error",
          description: "Failed to fetch absen data!",
          type: "danger",
        });
      });
  });
};

// Submit kuesioner action
export const submitKusionerAction = (form) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await getData("token");
    const response = await Axios.post(`${API_HOST.url}/kusioner`, form, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.data.meta.code === 200) {
      dispatch({
        type: "CREATE_KUSIONER_SUCCESS",
        payload: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Kusioner berhasil diisi!",
        type: "success",
      });
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "CREATE_KUSIONER_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal mengisi kusioner , mohon dicoba lagi!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// ABSEN SCAN
export const scanAbsenAction = (locationData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await getData("token");
    const response = await Axios.post(`${API_HOST.url}/scan`, locationData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.data.meta.code === 200) {
      dispatch({
        type: "CREATE_SCAN_SUCCESS",
        payload: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Anda Berhasil Absen!",
        type: "success",
      });
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "CREATE_SCAN_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal Absen , mohon dicoba lagi!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// KRITIK DAN SARAN SUBMIT
export const kritikAction = (form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await getData("token");
    const response = await Axios.post(`${API_HOST.url}/kritik`, form, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.data.meta.code === 200) {
      dispatch({
        type: "CREATE_KRITIK_SUCCESS",
        payload: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Terima kasih!, Kritik & Saran berhasil diisi!",
        type: "success",
      });
      navigation.navigate("Menu");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "CREATE_KRITIK_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal mengisi Kritik & Saran , mohon dicoba lagi!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// GET DATA KRITIK DAN SARAN
export const getKritikAction = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/dataKritik`)
    .then((res) => {
      console.log("Data Kritik Response:", res.data);
      dispatch({
        type: "GET_KRITIK_DATA",
        value: {
          dataKritik: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Data Kritik & Saran Error:", err);
    });
};

// GET DATA PESAN HARIAN
export const pesanHarianAction = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/zoom/listHarian`)
    .then((res) => {
      console.log("Pesan Harian Response:", res.data);
      dispatch({
        type: "GET_PESAN_HARIAN_DATA",
        value: {
          pesanHarian: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log("Pesan Harian Error:", err);
      showMessage({
        message: "Error",
        description: "Failed to fetch Pesan Harian data!",
        type: "danger",
      });
    });
};

// INSERT PESAN HARIAN ZOOM
export const insertPesanHarianAction = (form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = await getData("token");
    const response = await Axios.post(`${API_HOST.url}/zoom/listHarian/insert`, form, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.data.meta.code === 200) {
      dispatch({
        type: "INSERT_PESAN_HARIAN_SUCCESS",
        value: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Pesan Harian berhasil dibuat!",
        type: "success",
      });
      navigation.navigate("ListHarian");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "INSERT_PESAN_HARIAN_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal membuat Pesan Harian, mohon cek waktu dll!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// UPDATE PESAN HARIAN ZOOM
export const updatePesanHarianAction = (id, form, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await Axios.post(`${API_HOST.url}/zoom/listHarian/edit/${id}`, form);

    if (response.data.meta.code === 200) {
      dispatch({
        type: "UPDATE_PESAN_HARIAN_SUCCESS",
        value: response.data.data,
      });
      showMessage({
        message: "Success",
        description: "Pesan Harian berhasil diperbarui!",
        type: "success",
      });
      navigation.navigate("ListHarian");
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_PESAN_HARIAN_FAILURE",
      payload: error.message,
    });
    showMessage({
      message: "Error",
      description: "Gagal memperbarui Pesan Harian, mohon cek data!",
      type: "danger",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// DELETE PESAN HARIAN ZOOM
export const deletePesanHarian = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await Axios.delete(`${API_HOST.url}/zoom/listHarian/delete/${id}`);

      if (response.data.meta.code === 200) {
        dispatch(deletePesanHarianSuccess(id));
        showMessage({
          message: "Success",
          description: "Pesan Harian berhasil dihapus!",
          type: "success",
        });
      } else {
        throw new Error(response.data.meta.message);
      }
    } catch (error) {
      dispatch(deletePesanHarianFailure(error.message));
      showMessage({
        message: "Error",
        description: "Gagal menghapus zoom!",
        type: "danger",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const deletePesanHarianSuccess = (id) => ({
  type: "DELETE_PESAN_HARIAN_SUCCESS",
  id,
});

const deletePesanHarianFailure = (error) => ({
  type: "DELETE_PESAN_HARIAN_FAILURE",
  payload: error,
});

// UPDATE VALUE ZOOM
export const updateValueZoomAction = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await Axios.post(`${API_HOST.url}/zoom/list/pesan/update/${id}`);

      if (response.data.meta.code === 200) {
        dispatch(updateValueZoomSuccess(id));
        showMessage({
          message: "Success",
          description: "Pesan Zoom berhasil dibatalkan!",
          type: "success",
        });
      } else {
        throw new Error(response.data.meta.message);
      }
    } catch (error) {
      dispatch(updateValueZoomFailure(error.message));
      showMessage({
        message: "Error",
        description: "Gagal membatalkan zoom!",
        type: "danger",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const updateValueZoomSuccess = (id) => ({
  type: "UPDATE_VALUE_ZOOM_SUCCESS",
  id,
});

const updateValueZoomFailure = (error) => ({
  type: "UPDATE_VALUE_ZOOM_FAILURE",
  payload: error,
});

// GET DATA LOKASI KANTOR UNIT
export const getLokasiKantorUnit = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/lokasi-unit`)
    .then((res) => {
      console.log("Data Lokasi Kantor Unit Response:", res.data);
      dispatch({
        type: "GET_KANTOR_DATA",
        value: {
          kantor: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Data Lokasi Kantor Unit:", err);
    });
};

// FETCH DATA LOKASI KANTOR UNIT
export const fetchLokasiKantorUnit = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/fetch-data`)
    .then((res) => {
      console.log("Fetch Data Lokasi Kantor Unit Response:", res.data);
      dispatch({
        type: "FETCH_KANTOR_DATA",
        value: {
          fetchKantor: res.data,
        },
      });
      showMessage({
        message: "Data berhasil diperbarui",
        type: "success",
        duration: 2000,
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Fetch Data Lokasi Kantor Unit:", err);
    });
};

// GET DATA LOKASI KANTOR UNIT
export const getLokasiKandang = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/lokasi-kandang`)
    .then((res) => {
      console.log("Data Lokasi Kandang Response:", res.data);
      dispatch({
        type: "GET_KANDANG_DATA",
        value: {
          kandang: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Data Lokasi Kandang:", err);
    });
};

// FETCH DATA LOKASI KANTOR UNIT
export const fetchLokasiKandang = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/fetch-data-kandang`)
    .then((res) => {
      console.log("Fetch Data Lokasi Kandang Response:", res.data);
      dispatch({
        type: "FETCH_KANDANG_DATA",
        value: {
          fetchKandang: res.data,
        },
      });
      showMessage({
        message: "Data berhasil diperbarui",
        type: "success",
        duration: 2000,
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Fetch Data Lokasi Kandang:", err);
    });
};

export const valueAppUpdate = () => (dispatch) => {
  dispatch(setLoading(true));
  Axios.get(`${API_HOST.url}/value`)
    .then((res) => {
      console.log("Value App Response:", res.data);
      dispatch({
        type: "VALUE_APP",
        value: {
          valueApp: res.data,
        },
      });
      dispatch(setLoading(false));
    })
    .catch((err) => {
      // dispatch({
      //   type: "GET_ZOOM_PESAN_BY_ID",
      //   value: {
      //     isizoom: [],
      //   },
      // });
      dispatch(setLoading(false));
      console.log("Value App Response:", err);
    });
};
