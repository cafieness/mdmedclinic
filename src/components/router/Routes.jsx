import React from "react";
import { Switch, Route } from "react-router-dom";

import { Home, About, Login, Signup, Contacts, Procedures } from "../../pages";

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} />
      <Route path="/contacts" component={Contacts}></Route>
      <Route
        path="/procedure/skincare"
        component={() => <Procedures t={`Уход за кожей`} />}
      ></Route>
      <Route
        path="/procedure/apparat"
        component={() => <Procedures t={`Аппаратная косметология`} />}
      ></Route>
      <Route
        path="/procedure/inject"
        component={() => <Procedures t={`Инъекционная косметология`} />}
      ></Route>
    </Switch>
  );
}

export default Routes;
