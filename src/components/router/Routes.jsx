import { gql } from "graphql-request";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { send_simple_query } from "../../api";
import { GuardedRoute } from "react-router-guards";

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
  Payment,
  Education,
} from "../../pages";
import { Fragment } from "react";
import Scroll from "./Scroll";
const admin_check = gql`
  {
    adminCheck
  }
`;

const adminGuard = async (to, from, next) => {
  if (to.meta.admin) {
    const data = await send_simple_query(admin_check);
    if (data.adminCheck === null) {
      next.redirect("/login?reauth=true&from=/admin/");
      return;
    }
    if (data.adminCheck) {
      next();
    }
    next.redirect("/");
  }
};

function Routes() {
  return (
    <Fragment>
      <Scroll></Scroll>
      <Switch>
        <Route path="/login" component={Login} exact />
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
        <Route path="/profile" component={Profile} exact></Route>
        <Route path="/basket" component={Basket} exact></Route>

        <Route path="/payment" component={Payment} exact></Route>
        <GuardedRoute
          path="/admin/:tab?"
          component={Admin}
          exact
          meta={{ admin: true }}
        ></GuardedRoute>
        <Route path="/education" component={Education}></Route>

        <Route component={ErrorPage}></Route>
      </Switch>
    </Fragment>
  );
}

export default Routes;

export { adminGuard };
