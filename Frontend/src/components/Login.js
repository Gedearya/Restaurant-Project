import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import "./../styles/Login.css";

const cookies = new Cookies();

class Login extends Component {
  state = {
    redirect: false,
    login_failed: false,
    error_message: "",
  };

  login(refs) {
    const self = this;
    const formData = new FormData();

    formData.append("username", refs.username.value);
    formData.append("password", refs.password.value);

    axios
      .post("http://localhost:3001/auth/login", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) {
          cookies.set("jwtToken", response.data.token, { path: "/" });
          self.setState({ redirect: true });
        } else {
          self.setState({
            login_failed: true,
            error_message: response.data.message,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/list" />;
    }
  };

  renderLoginFailed = () => {
    if (this.state.login_failed) {
      return <h4>Sorry, {this.state.error_message}</h4>;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        {this.renderLoginFailed()}
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Login User Area</h5>
                  <form className="form-signin">
                    <div className="form-label-group text-left">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        ref="username"
                        required
                        autofocus
                      />
                      <label htmlFor="inputEmail">Enter Username</label>
                    </div>
                    <div className="form-label-group text-left">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        ref="password"
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember password
                      </label>
                    </div>
                    <input
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      onClick={() => this.login(this.refs)}
                      value="Login"
                    />
                    <hr className="my-4" />
                    <div className="custom-control mt-3">
                      <Link to="/register">Create an Account!</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
