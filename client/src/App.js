import React, { } from 'react'
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import BaseRouter from './containers/routes/BaseRouter';
import HOC from './hocs/HOC';
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <HOC>
          <Switch>
            <BaseRouter />
          </Switch>
        </HOC>
      </Router>
    </Provider>
  );
}

export default App;
