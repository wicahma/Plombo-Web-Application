import { combineReducers, legacy_createStore as createStore } from "redux";
import userReducer from "./user/usersSlice";
import destinasiReducer from "./destinasi/destinasiAPI";
import artikelReducer from "./artikel/artikelAPI";

const rootReducer = combineReducers({
  users: userReducer,
  destinasis: destinasiReducer,
  artikels: artikelReducer,
});

const reducerInitializedStore = createStore(rootReducer);
console.log(reducerInitializedStore.getState());

export default rootReducer;
