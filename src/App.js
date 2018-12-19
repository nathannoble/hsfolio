import React, { Component, Fragment } from "react";
import { withAuthenticator } from 'aws-amplify-react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import Main from './containers/Main'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
        <div>Hello</div>
          <Route
            path="/"
            render={({ location }) => (
              <Fragment>
                <Tabs value={location.pathname}>
                  <Tab label="Item One" value="/" component={Link} to="/" />
                  <Tab label="Item Two" value="/tab2" component={Link} to="/tab2" />
                  <Tab
                    value="/tab3"
                    label="Item Three"
                    component={Link}
                    to="/tab3"
                  />
                </Tabs>
                <Switch>
                  <Route path="/tab2" render={() => <div>Tab 2</div>} />
                  <Route path="/tab3" render={() => <div>Tab 3</div>} />
                  <Route path="/" render={() => <Main></Main>} />
                </Switch>
              </Fragment>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
  