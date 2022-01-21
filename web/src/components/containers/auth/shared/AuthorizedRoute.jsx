import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';

const { isAuthenticated, getIsEmailVerified, isOnboardingComplete } = selectors;

function getComponent(Component, props, authorized, emailVerified, onboardingComplete) {
  if (authorized && emailVerified && onboardingComplete) {
    return <Component {...props} />;
  } else if (authorized && !emailVerified) {
    return <Redirect to={{ pathname: '/email-verification-sent', state: { from: props.location } }} />;
  } else if (authorized && !onboardingComplete) {
    return <Redirect to={{ pathname: '/onboarding', state: { from: props.location } }} />;
  } else {
    return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />;
  }
}

const AuthorizedRoute = ({ component: Component, authorized, emailVerified, onboardingComplete, ...rest }) => (
  <Route {...rest} render={props => getComponent(Component, props, authorized, emailVerified, onboardingComplete)} />
);

AuthorizedRoute.propTypes = {
  authorized: PropTypes.bool,
  emailVerified: PropTypes.bool,
  component: PropTypes.func.isRequired
};

AuthorizedRoute.defaultProps = {
  authorized: false,
  emailVerified: false
};

const mapStateToProps = state => ({
  authorized: isAuthenticated(state),
  emailVerified: getIsEmailVerified(state),
  onboardingComplete: isOnboardingComplete(state)
});

export default withRouter(connect(mapStateToProps)(AuthorizedRoute));
