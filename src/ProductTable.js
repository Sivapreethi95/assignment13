import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleDestroy = this.handleDestroy.bind(this)
        // this.handleEdit = this.handleEdit.bind(this)
    }

    handleDestroy(id) {
        this.props.onDestroy(id)
    }

    // handleEdit(id) {
    //     this.props.onEdit(id);
    // }
    
    render () {
        console.log("ProductTable.js Rendering")
        console.log(this.props.products);
        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid])
        // let productsArray = this.props.products;
        // console.log(typeof(this.props.products))
        // console.log("Products Array is ")
        // console.log(productsArray);
        // console.log("Products Array -------- ")
        let rows = []

        productsArray.forEach((product) => {
            console.log(product);
            if (product.product.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={product.product} 
                    key={product.product.productid} 
                    // onEdit={this.handleEdit}
                    onDestroy={this.handleDestroy}></ProductRow>
            )
        })

        return (
            <div>
                <table class="table table-striped table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            {/* <th>&nbsp;</th> */}
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable