import { React, useEffect } from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import AlternativeLogin from '../alternativeLogin';
import Register from '../register';

import * as action from '../../actions/creators';

function App() {
  const dispatch = useDispatch();
  const redirect = useSelector((store) => store.authReducers.redirect);
  useEffect(() => {
    action.redirect(dispatch, false);
  });
  return redirect ? (
    <Redirect to={redirect} />
  ) : (
    <Switch>
      <Route exact path="/login" component={AlternativeLogin} />
      <Route exact path="/register">
        <div className="register-box">
          <Register />
        </div>
      </Route>
      <Route path="/">
        <div className="wrapper">
          <NavBar />
          <SideBar />
          <ContentWrapper />
          <Footer />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
