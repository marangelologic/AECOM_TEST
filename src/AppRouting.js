import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPageComponent from './pages/LandingPageComponent';
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

class AppRouting extends Component {

  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={LandingPageComponent} />
        <Route exact path="/landing-page" component={LandingPageComponent} />
      </Router>
    );
  }
}

export default AppRouting;
