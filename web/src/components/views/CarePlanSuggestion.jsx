import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { Sparse } from '../layouts';
import OnboardingProgressBar from '../presentation/registration/desktop/OnboardingProgressBar';
import CarePlanSuggestionSlide from '../presentation/registration/desktop/CarePlanSuggestionSlide';
import { carePlans } from '../../content';
import getCarePlanInfo from '../../utils/carePlanInfo';
import history from '../../utils/history';
import Interpolation from '../../utils/Interpolation';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';
import LoadingSpinnerScreen from '../presentation/shared/Loader/LoadingSpinnerScreen';

const { assignCarePlan } = actions;
const {
  getSelectedCarePlanId,
  getSuggestedCarePlanId,
  getToken,
  isAssigningCarePlan,
  isOnboardingComplete,
  isAuthenticated,
  successfulCarePlanAssignment
} = selectors;

const Wrapper = styled.div`
  margin: 40px auto 80px;
  width: 100%;
  color: ${props => props.theme.colors.shades.blue};
  text-align: center;

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.device.tabletXL} {
    width: 100%;
  }

  @media ${props => props.theme.device.desktop} {
    width: 960px;
  }

  @media ${props => props.theme.device.desktopXL} {
    width: 960px;
  }
`;

// ChooseCarePlan

const CarePlanSuggestion = ({
  selectedCarePlanId,
  successfulCarePlanAssignment,
  suggestedCarePlanId,
  isAssigningCarePlan,
  isOnboardingComplete,
  isAuthenticated,
  token,
  assignCarePlan,
  handleAccept,
  handleDecline
}) => {
  const [carePlanSelection, setCarePlanSelection] = useState(
    carePlans.find(carePlan => carePlan.id === selectedCarePlanId)
  );
  const [carePlanSuggestion, setCarePlanSuggestion] = useState(
    carePlans.find(carePlan => carePlan.id === suggestedCarePlanId)
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('sign-in');
    }
    if (isOnboardingComplete) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (successfulCarePlanAssignment) {
      history.push('/plan');
    }
  }, [successfulCarePlanAssignment]);

  return (
    <>
      <Helmet>
        <title>
          {selectedCarePlanId === suggestedCarePlanId ? 'Keep Current Plan' : 'Change Plan?'} - Evry
          Health
        </title>
      </Helmet>
      <OnboardingProgressBar progressStep={4} />
      <Wrapper>
        <CarePlanSuggestionSlide
          handleAccept={handleAccept}
          handleDecline={handleDecline}
          carePlanSelection={carePlanSelection}
          carePlanSuggestion={carePlanSuggestion}
          isAssigningCarePlan={isAssigningCarePlan}
        />
        {isAssigningCarePlan && <LoadingSpinnerScreen />}
      </Wrapper>
    </>
  );
};

CarePlanSuggestion.propTypes = {
  handleAccept: PropTypes.func,
  handleDecline: PropTypes.func,
  selectedCarePlanId: PropTypes.number,
  successfulCarePlanAssignment: PropTypes.bool,
  suggestedCarePlanId: PropTypes.number
};

CarePlanSuggestion.defaultProps = {
  handleAccept: () => {},
  handleDecline: () => {},
  selectedCarePlanId: null,
  successfulCarePlanAssignment: false,
  suggestedCarePlanId: null,
  isOnboardingComplete: false
};

const mapStateToProps = state => ({
  selectedCarePlanId: getSelectedCarePlanId(state),
  successfulCarePlanAssignment: successfulCarePlanAssignment(state),
  suggestedCarePlanId: getSuggestedCarePlanId(state),
  isAssigningCarePlan: isAssigningCarePlan(state),
  isAuthenticated: isAuthenticated(state),
  isOnboardingComplete: isOnboardingComplete(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  assignCarePlan: ({ from = moment.utc(), id, to = null, token }) =>
    dispatch(assignCarePlan({ from, id, to, token }))
});

const mergeProps = ({ token, ...stateProps }, { assignCarePlan }, ownProps) => ({
  handleAccept: () => assignCarePlan({ id: stateProps.suggestedCarePlanId, token }),
  handleDecline: () => assignCarePlan({ id: stateProps.selectedCarePlanId, token }),
  ...stateProps,
  ...ownProps
});

const ConnectedCarePlanSuggestion = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CarePlanSuggestion);

const reflection = {
  component: ConnectedCarePlanSuggestion,
  layout: Sparse,
  layoutProps: {
    title: new Interpolation([
      state =>
        getSelectedCarePlanId(state) === getSuggestedCarePlanId(state)
          ? 'Keep Current Plan'
          : 'Change Plan?'
    ]),
    subtitle: new Interpolation([
      'Based on your selections, we suggest you consider choosing the ',
      state =>
        getSuggestedCarePlanId(state) ? getCarePlanInfo(getSuggestedCarePlanId(state)).title : ''
    ]),
    fullWidth: true
  },
  route: '/change-plan'
};

export default ConnectedCarePlanSuggestion;

export { reflection };
