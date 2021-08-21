import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const axios = require("axios");

class Paginate extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      sortType: "asc",
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

  onSort = (sortType) => {
    this.setState({ sortType });
  };
  render() {
    const { products, sortType } = this.state;
    const sorted = products.sort((a, b) => {
      const isReversed = sortType === "asc" ? 1 : -1;
      return isReversed * a.name.localeCompare(b.name);
    });
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
        <div className="pageHeader">
          <h1>All Products</h1>
        </div>
        <div className="sort">
          <div className="row">
            <div className="col">
              <button className="sortButton" onClick={() => this.onSort("asc")}>
                Sort A-Z
              </button>
              <button
                className="sortButton"
                onClick={() => this.onSort("desc")}
              >
                Sort Z-A
              </button>
            </div>
          </div>
        </div>
        <div className="product_card">
          {sorted.map((product) => {
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
        <div className="pagination">
          {pages.map((page) => {
            return (
              <li
                className="page_number"
                key={page.idx}
                id={page.idx === idx ? "selected" : " "}
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
