import React from 'react'
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
                <Link to={`/categories/${obj.id}`}>
                    <p>{obj.flavor}</p>
                </Link>
            </div>
        })
        return (
            <div>
                <div>
                    <form>
                        <input type='text' name='search' placeholder='Search...'value={query} onChange= {handleSearchChange} />
                    </form>
                </div>
                <div className='categoriesTitle'>
                    <h2>Flavors</h2>
                </div>
                <div className='categories'>
                    {cat_child}
                </div>
                <div className='productsTitle'>
                    <h2>Cookies</h2>
                </div>
                <div className='products'>
                    {child}
                </div>
            </div>
        )
    }
}


export default Search



