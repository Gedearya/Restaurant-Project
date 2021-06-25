import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export class page extends Component {
  state = {
    // untuk protect page
    login: false,
  };

  componentWillMount() {
    // harus masuk di componenWillMount untuk protect page
    if (cookies.get("jwtToken")) this.setState({ login: true });
  }

  // untuk protect page
  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div>
        {/* untuk protect page */}
        {this.loginRedirect()}
      </div>
    );
  }
}

export default page;
