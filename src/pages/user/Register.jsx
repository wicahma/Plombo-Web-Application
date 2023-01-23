import axios from "axios";
import React, { Component, createRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/micro/Loading";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: {},
      username_validation: false,
      email_validation: false,
      loading: false,
      error: false,
      navigate: false,
    };
    this.forms = createRef();
    this.input_username = createRef();
    this.input_email = createRef();
  }

  handleOnChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (
      id === "username" &&
      value.length >= 5 &&
      value.length <= 10 &&
      !/\s/g.test(value)
    ) {
      this.input_username.current.classList.remove("is-invalid");
      this.input_username.current.classList.add("is-valid");
      this.checkUsername(value) &&
        this.setState({
          register: { ...this.state.register, [id]: value },
          error: false,
        });
    } else if (id === "username") {
      this.input_username.current.classList.remove("is-valid");
      this.input_username.current.classList.add("is-invalid");
      this.setState({
        username_validation: true,
        error: false,
      });
    } else {
      id === "email" && this.checkEmail(value);
      console.log("jalan");
      this.setState({
        register: { ...this.state.register, [id]: value },
        error: false,
      });
    }
  };

  checkUsername = async (value) => {
    return await axios
      .get(`${process.env.REACT_APP_API}user/username/${value}`)
      .then((res) => {
        this.setState(
          {
            username_validation: false,
          },
          () => {
            this.input_username.current.classList.remove("is-invalid");
            this.input_username.current.classList.add("is-valid");
          }
        );
        return false;
      })
      .catch((err) => {
        this.setState(
          {
            username_validation: true,
          },
          () => {
            this.input_username.current.classList.remove("is-valid");
            this.input_username.current.classList.add("is-invalid");
          }
        );
        return true;
      });
  };

  checkEmail = (value) => {
    axios
      .get(`${process.env.REACT_APP_API}user/email/${value}`)
      .then((res) =>
        this.setState(
          {
            email_validation: false,
          },
          () => {
            this.input_email.current.classList.remove("is-invalid");
            this.input_email.current.classList.add("is-valid");
          }
        )
      )
      .catch((err) =>
        this.setState(
          {
            email_validation: true,
          },
          () => {
            this.input_email.current.classList.remove("is-valid");
            this.input_email.current.classList.add("is-invalid");
          }
        )
      );
  };

  handleDataRegist = () => {
    this.setState({ loading: true });
    axios
      .post(`${process.env.REACT_APP_API}user`, this.state.register)
      .then((res) => {
        console.log(res);
        this.setState({ loading: false, register: {}, navigate: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, error: true, register: {} });
      });
  };

  handleRegist = (e) => {
    const valid = this.forms.current.checkValidity();
    this.forms.current.classList.add("was-validated");
    return valid && !this.state.username_validation && this.handleDataRegist();
  };

  render() {
    return (
      <div className="container-md mx-auto row align-items-center justify-content-center vh-100">
        <div className="col-md-4 mb-5">
          <div className="judul-login text-center">Plombo</div>
          <Loading loading={this.state.loading} />
          <form
            className="inner-form needs-validation p-4 mt-3 mb-5"
            ref={this.forms}
            noValidate
          >
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                onChange={(e) => this.handleOnChange(e)}
                type="text"
                className="form-control"
                id="nama"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Username
              </label>
              <input
                onChange={(e) => {
                  this.handleOnChange(e);
                }}
                ref={this.input_username}
                type="text"
                className="form-control"
                id="username"
                required
              />
              <div
                className={`${
                  this.state.username_validation
                    ? "invalid-feedback-true"
                    : "invalid-feedback"
                }  `}
              >
                {
                  "Panjang username harus > 5 dan < 10 Kata. Username sudah digunakan, silahkan gunakan username lain!."
                }
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="kelamin" className="form-label">
                Jenis Kelamin
              </label>
              <select
                defaultValue={""}
                className="form-select form-control"
                name="kelamin"
                id="kelamin"
                required
                onChange={(e) => this.handleOnChange(e)}
              >
                <option value="" disabled>
                  None
                </option>
                <option value="laki-laki">Laki Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                ref={this.input_email}
                onChange={(e) => this.handleOnChange(e)}
                className="form-control"
                id="email"
                required
              />
              <div
                className={`${
                  this.state.email_validation
                    ? "invalid-feedback-true"
                    : "invalid-feedback"
                }  `}
              >
                Email sudah digunakan, silahkan gunakan username lain!.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => this.handleOnChange(e)}
                className="form-control"
                id="password"
                required
              />
            </div>
            {this.state.error && (
              <div>
                <p className="error-message">
                  Registrasi gagal, coba lagi nanti.
                </p>
              </div>
            )}
            {this.state.navigate && <Navigate to={"/login"} />}
            <div className="d-flex gap-3 justify-content-end">
              <Link to={"/login"} type="submit" className="btn btn-primary">
                Login
              </Link>
              <button
                onClick={() => this.handleRegist()}
                type="button"
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
