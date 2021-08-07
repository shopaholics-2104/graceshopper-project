const React = require("react");
const { connect } = require("react-redux");
import { fetchAllProducts } from "../store/thunk";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    const { allProducts } = this.props;
    return (
      <div>
        <h1>Transfiguration Cookies</h1>
        <div>
          {allProducts.map((product) => (
            <div>{product.name}</div>
          ))}
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  allProducts: state.allProducts,
});
const mapDispatch = () => ({
  fetchAllProducts,
});
export default connect(mapState, mapDispatch)(Product);
