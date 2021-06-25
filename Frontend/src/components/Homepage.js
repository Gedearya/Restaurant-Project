import React, { Component } from "react";
import Product from "./Product";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Homepage extends Component {
  state = {
    products: [],
    login: false,
  };

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  componentWillMount() {
    if (cookies.get("jwtToken")) this.setState({ login: true });

    axios.get("http://localhost:3001/product").then((result) => {
      this.setState({
        products: result.data,
      });
    });
  }

  render() {
    console.log(this.state.products);
    return (
      <div>
        {this.loginRedirect()}
        <div className="banner-top container-fluid" id="home">
          <Navbar navHome="active" />
        </div>
        <div className="container-fluid">
          <h1>Welcome to The Resto</h1>
          <div className="inner-sec-shop px-lg-4 px-3 my-5">
            <Product products={this.state.products} />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
