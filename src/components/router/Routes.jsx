import React from "react";
import { Switch, Route } from "react-router-dom";

import { Home, About } from "../../pages";
import {Signup, Login} from "../../components";

function Routes() {
  return (
    <Switch>
       <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} /> 
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
    </Switch>
  );
}

export default Routes;