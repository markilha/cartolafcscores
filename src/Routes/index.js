import React from "react";
import {AuthProvider} from '../contexts/contextAuth';
import { Switch,BrowserRouter} from "react-router-dom";
import Signin from "../pages/signin";
import Home from '../pages/Home';

import Route from './Router'

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/home" component={Home} isPrivate />     
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}