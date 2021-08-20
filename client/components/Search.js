import React, { useState, useEffect } from "react";
import axios from "axios";
import { _fetchAllProducts } from "../store/thunk";
import { Link } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: [],
      query: "",
      filtered: [],
      catData: [],
      filtered_cat: [],
    };
  }

  componentDidMount() {
    axios
      .get("../api/products")
      .then(({ data }) => {
        this.setState({
          datum: data,
          filtered: data,
        });
      })
      .catch((err) => {});

    axios
      .get("../api/categories")
      .then(({ data }) => {
        this.setState({
          catData: data,
          filtered_cat: data,
        });
      })
      .catch((err) => {});
  }

  handleSearchChange = (event) => {
    const { datum, catData } = this.state;
    const newFilter = [...datum].filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    const newCat = [...catData].filter((cat) =>
      cat.flavor.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      query: event.target.value,
      filtered: newFilter,
      filtered_cat: newCat,
    });
  };

  render() {
    const { query } = this.state;
    const { handleSearchChange } = this;
    const { filtered, fltered_cat } = this.state;
    const child = this.state.filtered.map((obj, idx) => {
      return (
        <div key={idx}>
          <Link to={`/products/${obj.id}`}>
            <p className="Item_title">{obj.name}</p>
            <br />
            <img className="product_img" src={obj.imageUrl}></img>
          </Link>
        </div>
      );
    });
    const cat_child = this.state.filtered_cat.map((obj, idx) => {
      return (
        <div key={idx}>
          <p className="item-categories">{obj.flavor}</p>
        </div>
      );
    });
    return (
      <div>
        <div>
          <form>
            <input
              type="text"
              name="search"
              value={query}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        <div>
          <div>
            <div>{child}</div>
            <div>{cat_child}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
