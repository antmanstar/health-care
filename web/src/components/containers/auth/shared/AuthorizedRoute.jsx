import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';

const { isAuthenticated } = selectors;

const AuthorizedRoute = ({ component: Component, authorized, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

AuthorizedRoute.propTypes = {
  authorized: PropTypes.bool,
  component: PropTypes.func.isRequired
};

AuthorizedRoute.defaultProps = {
  authorized: false
};

const mapStateToProps = state => ({
  authorized: isAuthenticated(state)
});

export default withRouter(connect(mapStateToProps)(AuthorizedRoute));
