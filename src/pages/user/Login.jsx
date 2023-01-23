import React, { Component, createRef } from "react";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { add_user } from "../../stores/reducers/user/usersSlice";
import Loading from "../../components/micro/Loading";
import store from "../../stores/store";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        text: "",
        pass: "",
      },
      navigate: false,
      error: false,
      loading: false,
    };
    this.forms = createRef();
    this.dispatch = createDispatchHook();
  }

  handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    console.log(this.state.login);
    let newLogin = { ...this.state.login };
    newLogin[name] = value;
    console.log(newLogin);
    this.setState({
      login: { ...newLogin },
    });
  };

  validateChecker = () => {
    const valid = this.forms.current.checkValidity();
    Array.from(this.forms.current).forEach((form) => {
      if (!form) {
        form.current.preventDefault();
        form.current.stopPropagation();
        return valid;
      }
    });
    this.forms.current.classList.add("was-validated");
    return valid;
  };

  handleDataLogin = () => {
    this.setState({ loading: true });
    axios
      .get(
        `${process.env.REACT_APP_API}user/${this.state.login.text}&${this.state.login.pass}`
      )
      .then((res) => {
        this.setState({ loading: false, navigate: true });
        console.log(res.data);
        store.dispatch({ type: "users/add_user", payload: res.data });
        localStorage.setItem("data_user", JSON.stringify(res.data));
      })
      .catch((err) => {
        this.setState({ loading: false, error: true });
        console.log(err);
      });
  };

  handleLogin = (e) => {
    return this.validateChecker() && this.handleDataLogin();
  };
  render() {
    return (
      <div className="container-md mx-auto row justify-content-center align-items-center vh-100">
        <div className="col-md-4 mb-5">
          <div className="judul-login text-center">Plombo</div>
          <form
            ref={this.forms}
            className="inner-form p-4 mt-3 needs-validation"
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Email / Username
              </label>
              <input
                onChange={(e) => this.handleOnChange(e)}
                type="text"
                className="form-control"
                id="text"
                required
              />
              <div className="invalid-feedback">
                Silahkan masukkan Email yang benar.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => this.handleOnChange(e)}
                type="password"
                className="form-control"
                id="pass"
                required
              />
              <div className="invalid-feedback">
                Siahkan masukkan password anda.
              </div>
            </div>
            <div className="text-center">
              <p className="p-0 m-0">
                Belum punya akun? daftar{" "}
                <Link className="link" to={"/register"}>
                  disini
                </Link>
              </p>
              <p className="p-0 m-0">
                Atau masuk{" "}
                <Link className="link" to={"/"}>
                  tanpa login
                </Link>
              </p>
            </div>
            {this.state.error && (
              <div className="mt-3">
                <p className="error-message">
                  Login gagal, cek username / password anda
                </p>
              </div>
            )}
            {this.state.navigate && <Navigate to={"/"} />}
            <Loading loading={this.state.loading} />
            <div className="d-flex justify-content-end mt-3">
              <button
                onClick={(e) => this.handleLogin(e)}
                type="button"
                className="btn btn-success"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
