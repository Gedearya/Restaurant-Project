import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import "./../styles/Add.css";

const cookies = new Cookies();

class Add extends Component {
  state = {
    selectedFile: null,
    redirect: false,
    login: false,
  };

  componentWillMount() {
    if (cookies.get("jwtToken")) this.setState({ login: true });
  }

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  kirim(refs) {
    const self = this;
    const formData = new FormData();

    formData.append("name", refs.name.value);
    formData.append("price", refs.price.value);
    formData.append("description", refs.description.value);
    formData.append("product_image", this.state.selectedFile);

    axios
      .post("http://localhost:3001/product/add", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) self.setState({ redirect: true });
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

  render() {
    return (
      <div className="form">
        {this.loginRedirect()}
        {this.renderRedirect()}
        <div className="banner-top container-fluid" id="home">
          <Navbar navHome="active" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Post Product Menu
                          </h1>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              className="mt-1"
                              type="text"
                              placeholder="Product Name"
                              ref="name"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              className="mt-1"
                              type="number"
                              placeholder="Price"
                              ref="price"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              className="mt-1"
                              type="text"
                              placeholder="Description"
                              ref="description"
                            />

                            <div className="form-group">
                              <input
                                className="mt-3"
                                type="file"
                                accept="image/*"
                                onChange={this.onFileChange}
                              />
                            </div>
                          </div>
                          <input
                            className="btn btn-success btn-user btn-block"
                            type="button"
                            onClick={() => this.kirim(this.refs)}
                            value="SUBMIT"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
