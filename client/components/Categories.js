import React from "react";
import { connect } from "react-redux";
import { _fetchAllCategoties } from "../store/thunk";
import { Link } from "react-router-dom";

class Cateory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    const { allCategories } = this.props;

    return (
      <div>
        <h1>Category</h1>

        {allCategories.map((category) => (
          <div key={category.id}>
            <h3>{category.flavor}</h3>
            {category.products.length ? (
              category.products.map((product) => (
                <ul key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <li>{product.name}</li>
                  </Link>
                </ul>
              ))
            ) : (
              <h3>Sold Out</h3>
            )}
          </div>
        ))}
      </div>
    );
  }
}
const mapState = (state) => ({
  allCategories: state.allCategories,
});
const mapDispatch = (dispatch) => ({
  fetchAllCategories: () => {
    dispatch(_fetchAllCategoties());
  },
});
export default connect(mapState, mapDispatch)(Cateory);
