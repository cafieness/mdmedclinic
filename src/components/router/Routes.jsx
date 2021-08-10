import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  Home,
  About,
  Login,
  Signup,
  Contacts,
  Procedures,
  Procedure,
  Gallery,
  Shop, 
  Product,
  ErrorPage,
  Blog,
  BlogPost,
  Profile,
  Basket,
  Admin,
  Payment
} from "../../pages";

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} exact/>
      <Route path="/signup" component={Signup} exact />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/contacts" component={Contacts} exact></Route>
      <Route path="/procedures/:id" component={Procedures} exact></Route>
      <Route path="/procedure/:name" component={Procedure} exact></Route>
      <Route path="/gallery" component={Gallery} exact></Route>
      <Route exact path="/shop" component={Shop}></Route>
      <Route path="/shop/:id/:name" component={Product} exact></Route>
      <Route path="/blog" component={Blog} exact></Route>
      <Route path="/blog/:id/:name" component={BlogPost} exact></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/basket" component={Basket}></Route>
      <Route to="/payment" component={Payment}></Route>
      <Route to="/admin" component={Admin}></Route>


      <Route component={ErrorPage}></Route>
    </Switch>
  );
}

export default Routes;
