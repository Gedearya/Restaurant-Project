import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import "./../styles/Header.css";

const cookies = new Cookies();

class Header extends Component {
  state = {
    login: true,
    user_detail: {},
  };

  componentWillMount() {
    const token = cookies.get("jwtToken");

    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log(result);
        this.setState({
          user_detail: result.data.user_detail,
        });
      });
  }

  logout() {
    cookies.remove("jwtToken");

    this.setState({
      login: false,
    });
  }

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div>
        {this.loginRedirect()}
        <div className="margin_atas">
          Welcome back, {this.state.user_detail.name}!<br />
        </div>
      </div>
    );
  }
}

export default Header;
