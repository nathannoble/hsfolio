import React, { Component, Fragment } from "react";
import { withAuthenticator } from 'aws-amplify-react';
import { connect } from 'react-redux';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Main from './containers/Main'
import SchoolView from "./containers/SchoolView";

class App extends Component {
  render() {

    var school = this.props.school.currentSchool
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            path="/"
            render={({ location }) => (
              <Fragment>
                <Tabs value={location.pathname}>
                  <Tab label="My Schools" value="/" component={Link} to="/" />
                  {school.name ? <Tab label={school.name} value="/schoolView" component={Link} to="/schoolView" /> : ''}

                  <Tab
                    value="/tab3"
                    label="Reports"
                    component={Link}
                    to="/tab3"
                  />
                </Tabs>
                <Switch>
                  <Route path="/schoolView" render={() => <SchoolView></SchoolView>} />
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

const mapStateToProps = state => {
  return {
    school: state.school
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onInitSchoolList: schoolList => dispatch({ type: 'INIT_SCHOOL_LIST', schoolList: schoolList }),
  };
};

export default withAuthenticator((connect(
  mapStateToProps,
  mapDispatchToProps
)(App)), { includeGreetings: true })

// export default withStyles(styles, { withTheme: true })(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Layout))
