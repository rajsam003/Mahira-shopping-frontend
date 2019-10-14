import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const removeProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    return (
        <Layout title="Manage Products" description="Perform CRUD on products" className="container-fluid">
            <div className="row">
                <div className="col-12 mb-4">
                    <h2 className="text-center">Total {products.length}</h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => {
                            return (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong>{p.brand}</strong>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className="badge badge-warning badge-pill">
                                            Update
                                        </span>
                                    </Link>
                                    <span onClick={() => removeProduct(p._id)} className="badge badge-danger badge-pill">
                                        Delete
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts;