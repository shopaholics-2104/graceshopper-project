import React from "react";
import { connect } from "react-redux";
import { _fetchSingleCategory } from "../store/thunk";
import { Link } from "react-router-dom";

class Cateory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const categoryId = this.props.match.params.categoryId;
    this.props.fetchSingleCategory(categoryId);
  }

  render() {
    const { singleCategory } = this.props;
    const { products } = singleCategory;
    return (
      <div className="flavor_container">
        <h2 className="flavor_names">{singleCategory.flavor} </h2>
        <br></br>
        {products &&
          products.map((product) => (
            <ul key={product.id}>
              <li>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
            </ul>
          ))}
      </div>
    );
  }
}
const mapState = (state) => ({
  singleCategory: state.singleCategory,
});
const mapDispatch = (dispatch) => ({
  fetchSingleCategory: (categoryId) => {
    dispatch(_fetchSingleCategory(categoryId));
  },
});
export default connect(mapState, mapDispatch)(Cateory);
