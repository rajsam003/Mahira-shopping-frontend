import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {

    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        brand: '',
        size: '',
        type: '',
        color: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const { brand,
        size,
        type,
        color,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData } = values;

    

    //load categories and setform data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    console.log('Clearing values');
                    setValues({
                        ...values,
                        brand: '',
                        size: '',
                        type: '',
                        color: '',
                        photo: '',
                        description: '',
                        quantity: '',
                        price: '',
                        loading: false,
                        createdProduct: data.brand
                    })
                }
            })
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Brand</label>
                <input onChange={handleChange('brand')} type="text" className="form-control" value={brand} />
            </div>
            <div className="form-group">
                <label className="text-muted">Size</label>
                <input onChange={handleChange('size')} type="text" className="form-control" value={size} />
            </div>
            <div className="form-group">
                <label className="text-muted">Type</label>
                <input onChange={handleChange('type')} type="text" className="form-control" value={type} />
            </div>
            <div className="form-group">
                <label className="text-muted">Color</label>
                <input onChange={handleChange('color')} type="text" className="form-control" value={color} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                <option>Please select</option>
                {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}> 
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '': 'none'}}> 
            <h2>Product is added</h2>
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-success"><h2>Loading..</h2></div>)
    )

    return (
        <Layout
            title="Add a new Product"
            description={`Hi ${user.name}!, ready to add new product ?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
}

export default AddProduct;