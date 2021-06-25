import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";

const cookies = new Cookies();

class Edit extends Component {
  state = {
    products: [],
    selectedFile: null,
    redirect: false,
    login: false,
  };

  componentWillMount() {
    if (cookies.get("jwtToken")) this.setState({ login: true });
    const {
      match: { params },
    } = this.props;

    axios
      .get(`http://localhost:3001/product/${params.product_id}`)
      .then((result) => {
        this.setState({
          products: result.data,
        });
      });
  }

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log(this.state.selectedFile);
  };

  kirim(refs) {
    const {
      match: { params },
    } = this.props;
    const self = this;
    const formData = new FormData();

    formData.append("name", refs.name.value);
    formData.append("price", refs.price.value);
    formData.append("description", refs.description.value);
    formData.append("product_image", this.state.selectedFile);

    axios
      .patch(
        `http://localhost:3001/product/edit/${params.product_id}`,
        formData,
        {}
      )
      .then(function (response) {
        console.log(response.data);
        document.getElementById("simple-form").reset();
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
    const formContent = this.state.products.map((item) => {
      let productName = item.name;
      let productImage = item.image_filename;
      let productPrice = item.price;
      let productDescription = item.description;
      return (
        <div>
          {this.renderRedirect()}
          <form className="column-view" id="simple-form" action="#">
            <input
              type="text"
              placeholder="Product Name"
              defaultValue={productName}
              ref="name"
              required
            />
            <input
              type="number"
              placeholder="Price"
              defaultValue={productPrice}
              ref="price"
              required
            />
            <img
              style={{ width: "300px" }}
              className="product-image"
              src={`http://localhost:3001/assets/images/${productImage}`}
              alt=""
            />
            <input type="file" accept="image/*" onChange={this.onFileChange} />
            <input
              type="text"
              defaultValue={productDescription}
              ref="description"
              placeholder="Description"
              required
            />
            <input
              type="button"
              onClick={() => this.kirim(this.refs)}
              value="SUBMIT"
            />
          </form>
        </div>
      );
    });

    return (
      <div>
        <div className="banner-top container-fluid" id="home">
          <Navbar navHome="active" />
        </div>
        <div className="container-fluid">
          <div className="inner-sec-shop px-lg-4 px-3 py-5 my-5">
            <div className="ubah-wrapper">
              <h1>Update Product Menu</h1>
            </div>
            {formContent}
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
