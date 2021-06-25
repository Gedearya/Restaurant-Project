import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./../styles/Navbar.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Navbar extends Component {
  state = {
    login: true,
  };
  componentWillMount() {
    const token = cookies.get("jwtToken");
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className={`nav-link ${this.props.navHome}`} to="/">
                  <h4>Home</h4>
                </Link>
              </li>
            </ul>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="search-bar">
                <form action="">
                  <div className="search_wrap search_wrap_4">
                    <div className="search_box">
                      <div className="btn btn_common">
                        <i className="fas fa-search" />
                      </div>
                      <input
                        type="text"
                        className="input"
                        placeholder="Search Your Favorite Menu?"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${this.props.navAbout}`} to="/add">
                    <h4>Add</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${this.props.navAbout}`}
                    to="/list"
                  >
                    <h4>List</h4>
                  </Link>
                </li>

                <li className="nav-item dropdown mt-1 ml-1 mr-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="profile-picture">
                      <img
                        src="http://localhost:3001/assets/images/arya.jpg"
                        alt=""
                      />
                    </span>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Manage Account
                    </a>
                    <a className="dropdown-item" href="#">
                      Setting
                    </a>
                    <div className="dropdown-divider" />
                    <a
                      className="dropdown-item"
                      onClick={() => this.logout()}
                      value="Logout"
                    >
                      Sign out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
