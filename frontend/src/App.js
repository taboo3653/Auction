import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MarketPage, LotPage, LotEditPage, Auth, PersonalPage } from './pages'
import { Navbar } from './components';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Switch>
        <Route
          path='/market'
          component={MarketPage}
        />
        <Route
          path='/lot-edit'
          component={LotEditPage}
        />
         <Route
          exact
          path={["/signin", "/signup"]}
          component={Auth}
        />
        <Route
          path='/personal'
          component={PersonalPage}
        />
        <Route
          path='/'
          component={LotPage}
        />
      </Switch>
    </div>
  );
}

export default App;
