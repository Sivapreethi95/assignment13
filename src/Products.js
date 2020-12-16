import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

// let PRODUCTS = {
//     '1': {id: 1, category: 'Music', price: '$459.99', name: 'Clarinet'},
//     '2': {id: 2, category: 'Music', price: '$5,000', name: 'Cello'},
//     '3': {id: 3, category: 'Music', price: '$3,500', name: 'Tuba'},
//     '4': {id: 4, category: 'Furniture', price: '$799', name: 'Chaise Lounge'},
//     '5': {id: 5, category: 'Furniture', price: '$1,300', name: 'Dining Table'},
//     '6': {id: 6, category: 'Furniture', price: '$100', name: 'Bean Bag'}
// };

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: {}
        };
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
        // this.handleProductUpdate = this.handleProductUpdate.bind(this)
    }

    componentDidMount() {
        console.log("This runs on component mount")
        fetch("http://localhost:3001/product/get")
        .then(data=>data.json())
        .then((data)=>{
            console.log("Got data from MongoDB");
            console.log(data);
            this.setState({products: data})
        });
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(productAdd) {
        if (!productAdd.productid) {
            productAdd.productid = new Date().getTime()
        }
        console.log("Handling Save")
        console.log("Printing products")
        console.log(productAdd)
        let newproduct = {
            id: productAdd.productid,
            product: productAdd
        }
        console.log(newproduct)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newproduct)
        };
        fetch("http://localhost:3001/product/create", requestOptions)
        // .then(data=>data.json())
        .then((data)=>{
            console.log("Creating a new product");
            console.log(data);
            this.setState((prevState) => {
                let products = prevState.products
                products[productAdd.productid] = newproduct
                return { products }
            })
        });

        
    }

    // handleProductUpdate(productId) {
    //     console.log("Updating the product");
    //     console.log(productId);
    // }
    handleDestroy(productId) {
        console.log("Deleting the below productid")
        console.log(productId);
        const requestOptions = {
            method: 'DELETE',
        };
        fetch("http://localhost:3001/product/delete/" + productId, requestOptions)
        .then((result) => {
            // do what you want with the response here
            console.log(result);
            this.setState((prevState) => {
                let products = prevState.products
                console.log(products);
                let newproducts = [];
                products.forEach((item)=>{
                    console.log(item);
                    if(item.id!==productId){
                        newproducts.push(item);
                    }
                })
                console.log("After deleting");
                console.log(newproducts);
                products = newproducts
                return { products }
            });
          });
        
    }

    render () {
        console.log("Rendering");
        console.log("Printing the state object here");
        console.log(this.state.products)
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    // onEdit={this.handleProductUpdate}
                    onDestroy={this.handleDestroy}></ProductTable>
                <ProductForm
                    onSave={this.handleSave}></ProductForm>
            </div>
        )
    }
}

export default Products