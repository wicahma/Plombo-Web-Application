import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";

export const destinasiSlice = createSlice({
  name: "destinasis",
  initialState: {
    validated_data_destinasi: null,
    unvalidated_data_destinasi: null,
    user_data_destinasi: null,
    newest_data_destinasi: null,
    loading: false,
    result: null,
  },
  reducers: {
    get_data_destinasi: (state, action) => {
      state[action.payload.state] = action.payload.data;
    },
    update_data_destinasi: (state) => {
      state.validated_data_destinasi = null;
    },
    start_loading: (state) => {
      state.loading = true;
    },
    end_loading: (state, action) => {
      state.loading = false;
      state.result = action.payload;
    },
  },
});

export const getDataAPI = async (path, stateName) => {
  store.dispatch({ type: "destinasis/start_loading" });
  const data = await axios
    .get(`${process.env.REACT_APP_API}${path}`)
    .then((res) => {
      console.log("Respon dari reducer Destinasi", res);
      store.dispatch({ type: "destinasis/end_loading", payload: true });
      return res.data;
    })
    .catch((err) => {
      console.log("Error dari reducer Destinasi", err);
      store.dispatch({ type: "destinasis/end_loading", payload: false });
      return null;
    });
  store.dispatch({
    type: "destinasis/get_data_destinasi",
    payload: { state: stateName, data: data },
  });
  // return data;
};

export const sendDataAPI = async (path, dataAPI) => {
  store.dispatch({ type: "destinasis/start_loading" });
  const data = await axios
    .post(`${process.env.REACT_APP_API}${path}`, dataAPI)
    .then((res) => {
      console.log("Hasil dari Pengiriman data destinasi", res);
      store.dispatch({ type: "destinasis/end_loading", payload: true });
    })
    .catch((err) => {
      console.log("Error dari pengiriman data destinasi", err);
      store.dispatch({ type: "destinasis/end_loading", payload: false });
    });
  return data;
};

export const { get_data_destinasi, update_data_destinasi } =
  destinasiSlice.actions;
export const destinasi = (state) => state.destinasis;
export const selectPostByJenis = (state, jenis) => {
  const data = state.destinasis.validated_data_destinasi;
  if (data) {
    return data.filter((item) => item.jenis === jenis);
  }
  return null;
};

export default destinasiSlice.reducer;
