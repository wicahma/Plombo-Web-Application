import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";

export const destinasiSlice = createSlice({
  name: "destinasis",
  initialState: {
    validated_data_destinasi: null,
    user_data_destinasi: null,
    newest_data_destinasi: null,
  },
  reducers: {
    get_data_destinasi: (state, action) => {
      state[action.payload.state] = action.payload.data;
    },
    update_data_destinasi: (state) => {
      state.validated_data_destinasi = null;
    },
  },
});

export const getDataAPI = async (path, stateName) => {
  const data = await axios
    .get(`${process.env.REACT_APP_API}${path}`)
    .then((res) => {
      // console.log("Respon dari reducer", res);
      return res.data;
    })
    .catch((err) => {
      // console.log("Error dari reducer", err);
      return null;
    });
  store.dispatch({
    type: "destinasis/get_data_destinasi",
    payload: { state: stateName, data: data },
  });
  // return data;
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
