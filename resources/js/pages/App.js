import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";

function App() {
    return (
        <>
            <Router>
                <div className="container mt-2">
                    <Switch>
                        <Route
                            path="/products/:id"
                            component={ProductDetails}
                        />
                        <Route path="/products" component={ProductList} />
                        <Redirect to="products" />
                    </Switch>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
