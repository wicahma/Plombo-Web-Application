import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";

export const artikelSlice = createSlice({
  name: "artikels",
  initialState: {
    all_data_artikel: null,
    newest_data_artikel: null,
  },
  reducers: {
    get_data_artikel: (state, action) => {
      state[action.payload.state] = action.payload.data;
    },
    update_data_artikel: (state) => {
      state.all_data_artikel = null;
    },
  },
});

export const getDataAPI = async (path, stateName) => {
  const data = await axios
    .get(`${process.env.REACT_APP_API}${path}`)
    .then((res) => {
      console.log("Respon dari reducer Artikel", res);
      return res.data;
    })
    .catch((err) => {
      console.log("Error dari reducer Artikel", err);
      return null;
    });
  store.dispatch({
    type: "artikels/get_data_artikel",
    payload: { state: stateName, data: data },
  });
  // return data;
};

export const { get_data_artikel, update_data_artikel } = artikelSlice.actions;
export const artikel = (state) => state.artikels;
export const selectPostByJenis = (state, jenis) => {
  const data = state.artikels.all_data_artikel;
  if (data) {
    return data.filter((item) => item.jenis === jenis);
  }
  return null;
};

export default artikelSlice.reducer;
