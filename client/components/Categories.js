import React from "react";
import { connect } from "react-redux";
import { _fetchAllCategoties } from "../store/thunk";
import { Link } from "react-router-dom";

class Cateory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: 'asc'
    }
  }

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  onSort = sortType => {
    this.setState({sortType})
  }

  render() {
    const {sortType} = this.state
    const { allCategories } = this.props;
    const sorted = allCategories.sort( (a, b) => {

      const isReversed = (sortType === 'asc' ) ? 1 : -1
      return isReversed * a.flavor.localeCompare(b.flavor)
    })

    return (
      <div>
        <h1>Category</h1>
        <div className='sort'>
          <div className='row'>
            <div className='col'>
              <button className='sortButton' onClick={()=>this.onSort('asc')}>Sort A-Z</button>
              <button className='sortButton' onClick={()=>this.onSort('desc')}>Sort Z-A</button>
            </div>
          </div>
        </div>

        {sorted.map((category) => (
          <div key={category.id}>
            <Link to={`/categories/${category.id}`}>
              <h3>{category.flavor}</h3>
            </Link>
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
