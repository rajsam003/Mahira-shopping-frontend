import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [run, setRun] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items </h2>
                <hr />
                {items.map((p, i) => (
                    <Card
                        key={i}
                        product={p}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2> Your cart is empty <br />
            <Link to="/shop">Continue shopping</Link>
        </h2>
    )

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout and continue shopping"
            className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout setRun={setRun} products={items} />
                </div>
            </div>

        </Layout>
    )
}

export default Cart;