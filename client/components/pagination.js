import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const axios = require("axios");

class Paginate extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  forIdx() {
    return this.props.match.params.idx ? this.props.match.params.idx * 1 : 0;
  }
  async fetchPage() {
    const products = (
      await axios.get(`/api/products/pagination/${this.forIdx()}`)
    ).data.products;
    this.setState({ products });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.idx !== this.props.match.params.idx) {
      this.fetchPage();
    }
  }

  componentDidMount() {
    this.fetchPage();
  }

  render() {
    const { products } = this.state;
    const pageCount = Math.ceil(this.props.total / 4);
    const pages = new Array(pageCount).fill("-").map((_, idx) => {
      return {
        idx,
        text: idx + 1,
      };
    });

    const idx = this.forIdx();

    return (
      <div>
        <div className="product_card">
          {products.map((product) => {
            return (
              <div className="for_Product" key={product.id}>
                <img className="product_img" src={product.imageUrl} />
                <div className="product_detail">
                  <p className="product_title">{product.name}</p>
                  <p className="product_desc">{product.description}</p>
                  <p className="product_price">
                    Price: ${product.single_price}
                  </p>
                  <p className="product_status">Status: {product.status}</p>
                  <div className="product_btn"></div>
                  <Link to={`/products/${product.id}`}>
                    <button className="button_btn">Look Inside</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {pages.map((page) => {
            return (
              <li
                key={page.idx}
                className={page.idx === idx ? "selected" : " "}
              >
                <Link to={`/products/pagination/${page.idx}`}>
                  {" "}
                  {page.text}
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect((state) => state)(Paginate);
