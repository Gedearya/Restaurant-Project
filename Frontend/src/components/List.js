import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "./../styles/List.css";
import swal from "sweetalert";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class List extends Component {
  state = {
    products: [],
    // untuk protect page
    login: false,
  };

  componentWillMount() {
    // harus masuk di componenWillMount untuk protect page
    if (cookies.get("jwtToken")) this.setState({ login: true });

    axios.get("http://localhost:3001/product").then((result) => {
      this.setState({
        products: result.data,
      });
    });
  }

  // untuk protect page
  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  delete_product(product_id) {
    const self = this;
    swal({
      title: "Are you sure want to Delete this menu?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "Produt Menu Sucessfully Deleted!",
          icon: "success",
        });
        axios
          .delete(`http://localhost:3001/product/delete/${product_id}`, {})
          .then(function (response) {
            if (response.data.success)
              self.setState({ products: response.data.products });
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        swal({
          title: "Produt Menu Cancel Deleted!",
        });
      }
    });
  }

  render() {
    const styles = {
      product_image: {
        width: "200px",
        height: "200px",
      },
    };

    const products = this.state.products.map((item, index) => {
      return (
        <tr key={index}>
          {/* untuk protect page */}
          {this.loginRedirect()}
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.price.toLocaleString("id-ID")}</td>
          <td>{item.description}</td>
          <td>
            <img
              src={`http://localhost:3001/assets/images/${item.image_filename}`}
              style={styles.product_image}
            />
          </td>
          <td className="action-buttons">
            <Link to={`/edit/${item.id}`}>
              <button className="far fa-edit btn btn-info">Edit</button>
            </Link>
            <button
              className="far fa-trash-alt btn btn-danger"
              onClick={() => this.delete_product(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <div className="banner-top container-fluid" id="home">
          <Navbar navHome="active" />
        </div>
        <h1>Table Menu</h1>
        <div className="main-table">
          <Header />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IDR</th>
                <th>Description</th>
                <th>Menu Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{products}</tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default List;
