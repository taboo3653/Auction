import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Market } from './pages'
import { LotPage } from './pages'
import { Navbar } from './components';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Switch>
        <Route
          path='/'
          component={LotPage}
        />
      </Switch>
    </div>
  );
}

export default App;
