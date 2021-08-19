import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { _fetchAllProducts } from '../store/thunk'
import { Link } from 'react-router-dom'

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datum: [],
            query: '',
            filtered: [],
            catData: [],
            filtered_cat: []
        }
    }
    
    componentDidMount(){
        axios.get('../api/products').then(({ data }) => {
            this.setState({
                datum: data,
                filtered: data
            })
        }).catch((err) => {})

        axios.get('../api/categories').then(({ data }) => {
            this.setState({
                catData: data,
                filtered_cat: data
            })
        }).catch((err) => {})
    }

    handleSearchChange = (event) => {
        const { datum, catData } = this.state
        const newFilter = [...datum].filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()))
        const newCat = [...catData].filter(cat => cat.flavor.toLowerCase().includes(event.target.value.toLowerCase()))
        this.setState({
            query: event.target.value,
            filtered: newFilter,
            filtered_cat: newCat
        })

    }

    render(){
        const { query } = this.state
        const {handleSearchChange} = this
        console.log(this.state.datum)
        console.log(`filtered: ${this.state.filtered}`)
        console.log(this.state.query)
        const child = this.state.filtered.map((obj, idx) => {
            return <div key={idx}>
                <Link to={`/products/${obj.id}`}>
                    <p>{obj.name}</p>
                    <br />
                    <img src={obj.imageUrl}></img>
                </Link>
            </div>
        })
        const cat_child = this.state.filtered_cat.map((obj, idx) => {
            return <div key={idx}>
                <p>{obj.flavor}</p>
            </div>
        })
        return (
            <div>
                <div>
                    <form>
                        <input type='text' name='search' value={query} onChange= {handleSearchChange} />
                    </form>
                </div>
                <div className='products'>
                    {child}
                </div>
                <div className='categories'>
                    {cat_child}
                </div>
            </div>
        )
    }
}


export default Search


/*import React from "react";
import { connect } from "react-redux";
import { _fetchAllProducts } from "../store/thunk";
import { Link } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  getSearchTerm() {
      return {}

  }

  render() {
    const { allProducts } = this.props;
    return (
      <div>
        <h1>Transfiguration Cookies</h1>
        <div className="ui search">
            <div className='ui icon input'>
                <input type='text' placeholder='Search Cookies...' className='prompt' value={props.term} onChange={getSearchTerm} />    
            </div>
        </div>

        {allProducts.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              {" "}
              <img src={product.imageUrl}></img>
            </Link>
            <div>{product.name}</div> <p>{product.description}</p>
            <span>
              Single Price: {product.single_price} Dozen Price:{" "}
              {product.dozen_price} Status: {product.status}
            </span>
          </div>
        ))}
      </div>
    );
  }
}
const mapState = (state) => ({
  allProducts: state.allProducts,
});
const mapDispatch = (dispatch) => ({
  fetchAllProducts: () => {
    dispatch(_fetchAllProducts());
  },
});
export default connect(mapState, mapDispatch)(Search)


/*import React, {useState} from 'react'
import { connect } from "react-redux";
import { _fetchAllProducts } from "../store/thunk";
import { Link } from "react-router-dom";
import axios from 'axios'






const retrieveProducts = async() => {
    const products = await axios.get('../api/products')
    return products.data
}

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const {fetched} = retrieveProducts()
    console.log(fetched)

    return (
        <div className='SearchArea'>
            <hr />
        </div>
    )
*/


/*

function Search(){
    const [data, setData] = useState([]) 
    useEffect(() => {
        axios.get('../api/products').then(json => setData(json.data))
    }, [])
    //const data = await axios.get('/api/products')
    //console.log({data})
    return (
        <div className='SearchArea'>
            <input
                type='text'
                placeholder='Search...'
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}
            />
            {data.filter((val) => {
                if (searchTerm == '') {
                    return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {
                return (
                    <div className='product' key={key}>
                        <p>{val.name}</p>
                    </div>
                )
            })}
            
        </div>
    )
}
/*
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this)
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    render(){
        const { search } = this.state
        const { onChange } = this
        console.log(search)
        return(
            <div>
                <form className='form-inline my-2 my-lg-0'>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>

        )
    }
}


export default Search

*/
