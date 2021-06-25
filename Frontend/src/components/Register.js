import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./../styles/Register.css";

class Register extends Component {
  state = {
    redirect: false,
    register_failed: false,
    error_message: "",
  };

  register(refs) {
    const self = this;
    const formData = new FormData();

    formData.append("username", refs.username.value);
    formData.append("password", refs.password.value);
    formData.append("name", refs.name.value);
    formData.append("email", refs.email.value);
    formData.append("phonenumber", refs.phonenumber.value);

    axios
      .post("http://localhost:3001/auth/register", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) self.setState({ redirect: true });
        else {
          self.setState({
            register_failed: true,
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
      return <Redirect to="/login" />;
    }
  };

  renderRegisterFailed = () => {
    if (this.state.register_failed) {
      return <h6>{this.state.error_message}</h6>;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        {this.renderRegisterFailed()}
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Create an Account!</h5>
                  <form className="form-signin text-left">
                    <div className="form-label-group">
                      <input
                        type="username"
                        id="inputUsername"
                        className="form-control"
                        placeholder="Username"
                        ref="username"
                        required
                        autofocus
                      />
                      <label htmlFor="inputUsername">Username</label>
                    </div>
                    <div className="form-label-group">
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
                    <div className="form-label-group">
                      <input
                        type="name"
                        id="inputName"
                        className="form-control"
                        placeholder="Name"
                        ref="name"
                        required
                        autofocus
                      />
                      <label htmlFor="inputName">Name</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        ref="email"
                        required
                        autofocus
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="phonenumber"
                        id="inputPhoneNumber"
                        className="form-control"
                        placeholder="Phone Number"
                        ref="phonenumber"
                        required
                        autofocus
                      />
                      <label htmlFor="inputPhoneNumber">Phone Number</label>
                    </div>
                    <input
                      className="btn btn-primary btn-user btn-block"
                      type="button"
                      onClick={() => this.register(this.refs)}
                      value="REGISTER ACCOUNT"
                    />
                    <div className="custom-control text-center mt-3">
                      <a className="small" href="#">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="custom-control text-center">
                      <Link to="/login" className="small">
                        Already have an account? Login!
                      </Link>
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

export default Register;
