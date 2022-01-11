import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import AuthorizedRoute from './containers/auth/shared/AuthorizedRoute';
import defaultTheme from '../style/themes';
import views from './views';
import { isClientMobile } from '../utils/browser';
import ModalContainer from './containers/shared/desktop/ModalContainer';
import selectors from '@evry-member-app/shared/store/selectors';
import SessionTimeout from './views/SessionTimeout';
import { insightsPlugin } from '../insights/microsoft/appInsights';
import { AppInsightsErrorBoundary } from "@microsoft/applicationinsights-react-js";

const { isAuthenticated, getCurrentModal } = selectors;

// Extract global style
const { GlobalStyle } = defaultTheme.components;

const layouts = views.reduce((previous, view) => {
  const { layout: component, route } = view;
  const current = previous.slice();
  let layout = current.find(item => item.component === component);
  if (!layout) {
    layout = {
      component,
      views: [],
      routes: []
    };
    current.push(layout);
  }
  layout.views.push(view);
  layout.routes.push(route);
  return current;
}, []);

const Root = ({ isAuthenticated, currentModal }) => (
  <AppInsightsErrorBoundary
    onError={() => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        //Todo: display better errors dev and production
        console.log('Unhandled exception occured');
      }
      return null;
    }}
    appInsights={insightsPlugin}>
    <ThemeProvider theme={defaultTheme}>
      <>
        {/*
          Fragment is necessary b/c ThemeProvider can only accept a single child component
        */}
        <GlobalStyle />
        <Route
          path="/"
          exact
          render={() => {
            const landing = isClientMobile() ? '/dashboard' : '/plan';
            return <Redirect to={isAuthenticated ? landing : '/sign-in'} />;
          }}
        />
        {layouts &&
          layouts.map(({ component: Layout, routes, views }) => (
            <Route
              key={`(${routes.join('|')})`}
              path={routes}
              render={({ match }) => (
                <Layout
                  {...(views.find(view => pathToRegexp(view.route).exec(match.url)) || {})
                    .layoutProps}
                >
                  {views.map(view => {
                    const ViewRoute = view.forAuthorized ? AuthorizedRoute : Route;
                    return (
                      <ViewRoute key={view.route} path={view.route} component={view.component} />
                    );
                  })}
                </Layout>
              )}
            />
          ))}
        {isAuthenticated && <SessionTimeout />}
        <ModalContainer currentModal={currentModal} />
      </>
    </ThemeProvider>
  </AppInsightsErrorBoundary>
);

Root.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentModal: PropTypes.string
};

Root.defaultProps = {
  currentModal: null
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  currentModal: getCurrentModal(state)
});

export default withRouter(connect(mapStateToProps)(Root));
