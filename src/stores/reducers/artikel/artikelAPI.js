import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";

export const artikelSlice = createSlice({
  name: "artikels",
  initialState: {
    validated_data_artikel: null,
    unvalidated_data_artikel: null,
    all_data_artikel: null,
    user_data_artikel: null,
    newest_data_artikel: null,
    loading: false,
    result: null,
  },
  reducers: {
    get_data_artikel: (state, action) => {
      state[action.payload.state] = action.payload.data;
    },
    update_data_artikel: (state) => {
      state.validated_data_artikel = null;
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
  store.dispatch({ type: "artikels/start_loading" });
  const data = await axios
    .get(`${process.env.REACT_APP_API}${path}`)
    .then((res) => {
      console.log("Respon dari reducer Artikel", res);
      store.dispatch({ type: "artikels/end_loading", payload: true });
      return res.data;
    })
    .catch((err) => {
      console.log("Error dari reducer Artikel", err);
      store.dispatch({ type: "artikels/end_loading", payload: false });
      return null;
    });
  store.dispatch({
    type: "artikels/get_data_artikel",
    payload: { state: stateName, data: data },
  });
  // return data;
};

export const sendDataAPI = async (path, dataAPI) => {
  store.dispatch({ type: "artikels/start_loading" });
  const data = await axios
    .post(`${process.env.REACT_APP_API}${path}`, dataAPI)
    .then((res) => {
      console.log("Hasil dari Pengiriman data Artikel", res);
      store.dispatch({ type: "artikels/end_loading", payload: true });
    })
    .catch((err) => {
      console.log("Error dari pengiriman data Artikel", err);
      store.dispatch({ type: "artikels/end_loading", payload: false });
    });
  return data;
};

export const { get_data_artikel, update_data_artikel } = artikelSlice.actions;
export const artikel = (state) => state.artikels;
export const selectPostByJenis = (state, jenis) => {
  const data = state.artikels.validated_data_artikel;
  if (data) {
    return data.filter((item) => item.jenis === jenis);
  }
  return null;
};

export default artikelSlice.reducer;
