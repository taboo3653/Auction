import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MarketPage, LotPage, LotEditPage, Auth, PersonalPage, Page404 } from './pages'
import { Navbar } from './containers';
import { Loader } from './components';

import { fetchUserData } from './redux/actions'
import { connect } from 'react-redux'

function App({ isAuth, token, fetchUserData }) {

  if (token)
    fetchUserData();

  return (
    (token && !isAuth) ?
      <Loader /> :
      <>
        <Navbar />
        <Switch>
          <Route
            exact
            path='/'
            component={MarketPage}
          />
          <Route
            path='/lots/:id'
            component={LotPage}
          />
          <Route
            path='/lot-edit'
            component={LotEditPage}
          />
          <Route
            exact
            path={["/signin", "/signup"]}
            render={() =>
              isAuth ?
                <Redirect to="/" /> :
                <Auth />
            }
          />
          <Route
            path='/personal'
            render={() =>
              isAuth ?
                <PersonalPage /> :
                <Redirect to="/" />
            }
          />

          <Route path="*" component={Page404} status={404} />

        </Switch>
    </>
  );
}

export default connect(
  ({ user }) => ({
    isAuth: !!user.data,
    token : user.token
  }), { fetchUserData })(App);
