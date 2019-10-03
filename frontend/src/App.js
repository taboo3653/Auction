import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MarketPage, LotPage, LotEditPage, Auth, PersonalPage, Page404 } from './pages'
import { Navbar } from './components';

function App() {
  return (
    <div className="wrapper">
      <Navbar />

      <Switch>
        <Route
          exact 
          path='/'
          component={MarketPage}
        />
        <Route
          path='/lot/:id'
          component={LotPage}
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

        <Route path="*" component={Page404} status={404} />

      </Switch>
    </div>
  );
}

export default App;
