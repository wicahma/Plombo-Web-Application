import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import FormWisata from "./components/posting/FormWisata";
import Artikel from "./pages/artikel/Artikel";
import Destinasi from "./pages/destinasi/Destinasi";
import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import FormArtikel from "./components/posting/FormArtikel";
import Posting from "./pages/posting/Posting";
import { useSelector } from "react-redux";
import { user } from "./stores/reducers/user/usersSlice";
import DestinasiRead from "./pages/destinasi/DestinasiRead";
import ArtikelRead from "./pages/artikel/ArtikelRead";
import Profile from "./pages/user/profile/Profile";
import CheckData from "./components/profile/CheckData";
import MyProfile from "./components/profile/MyProfile";

function App() {
  const { pathname } = useLocation();
  const { validated, data_user } = useSelector(user);
  return (
    <>
      <Navbar />
      <div className={`${pathname.includes("login") ? "p-0" : "pt-5"}`}>
        <Routes key={pathname}>
          <Route
            path="/"
            element={<Navigate to="/home" replace />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/home"
            element={<Home />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/destinasi"
            element={<Destinasi />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/destinasi/read/:idDestinasi&:namaDestinasi"
            element={<DestinasiRead />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          {validated === true && (
            <Route
              path="/posting"
              element={<Posting />}
              errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
            >
              <Route
                path="wisata"
                element={<FormWisata />}
                errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
              />
              <Route
                path="artikel"
                element={<FormArtikel />}
                errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
              />
              <Route
                path="*"
                element={<Navigate to="/posting/wisata" replace />}
                errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
              />
            </Route>
          )}
          {validated === true && (
            <Route
              path="/profile/:username"
              element={<Profile />}
              errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
            >
              <Route
                path="my-profile"
                element={<MyProfile />}
                errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
              />

              {data_user.type === "admin" && (
                <Route
                  path="admin/check-data"
                  element={<CheckData />}
                  errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
                />
              )}
            </Route>
          )}
          <Route
            path="/artikel"
            element={<Artikel />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/artikel/read/:idArtikel&:namaArtikel"
            element={<ArtikelRead />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/login"
            element={<Login />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/register"
            element={<Register />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
