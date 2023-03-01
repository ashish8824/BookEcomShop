import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Core/Home";
import PrivateRoute from "./auth/PrivateRoutes";
import DashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AdminRoute from "./auth/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./Core/Shop";
import Product from "./Core/Product";



const Routes = () => {
    return (
        <BrowserRouter>
            
            <Switch>
                <Route path="/" exact component={Home} />
                <Route  path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={DashBoard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <Route path="/product/:productId" exact component={Product} />
            </Switch>
        </BrowserRouter>
    );

};

export default Routes;