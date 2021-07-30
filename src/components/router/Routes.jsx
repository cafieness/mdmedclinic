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
} from "../../pages";
import { procedures } from "../../procedures";

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/contacts" component={Contacts}></Route>
      <Route path="/procedures/:id" component={Procedures}></Route>
    <Route path="/procedure/:name" component={Procedure}>
    </Route>
    </Switch>
  );
}

export default Routes;
