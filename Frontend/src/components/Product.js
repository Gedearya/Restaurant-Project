import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../styles/Product.css";

class Product extends Component {
  render() {
    const products = this.props.products.map((item, index) => {
      return (
        <div className="col-md-3 product-men women_two">
          <div className="product-googles-info googles">
            <div className="men-pro-item">
              <Link to={`/detail/${item.id}`}>
                <div className="men-thumb-item">
                  <img
                    src={`http://localhost:3001/assets/images/${item.image_filename}`}
                    className="img-fluid"
                    alt=""
                    style={{ maxHeight: "300px", maxWidth: "270px" }}
                  />
                  <span className="product-new-top">New</span>
                </div>
              </Link>
              <div className="item-info-product">
                <div className="info-product-price">
                  <div className="grid_meta">
                    <div className="product_price">
                      <h4 className="nama_item">{item.name}</h4>
                      <div className="grid-price mt-2">
                        <span className="money ">
                          IDR {item.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="starts">
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="row">{products}</div>
      </div>
    );
  }
}

export default Product;
