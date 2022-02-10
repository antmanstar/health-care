import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Sparse } from '../layouts';
import OnboardingProgressBar from '../presentation/registration/desktop/OnboardingProgressBar';
import CarePlanSelectionSlide from '../presentation/registration/desktop/CarePlanSelectionSlide';
import history from '../../utils/history';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';
import LoadingSpinnerScreen from '../presentation/shared/Loader/LoadingSpinnerScreen';

const { getLastQuestionnaireOrCreate } = actions;
const {
  isQuestionnaireLoaded,
  getToken,
  isChoosingCarePlan,
  isOnboardingComplete,
  isAuthenticated
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

const CarePlanSelectionSlideWithData = withStoreData(
  CarePlanSelectionSlide,
  state => ({
    token: getToken(state)
  }),
  dispatch => ({
    handleCarePlanSelection: args => dispatch(getLastQuestionnaireOrCreate(args))
  }),
  ({ token }, { handleCarePlanSelection }, ownProps) => ({
    handleCarePlanSelection: id => handleCarePlanSelection({ id, token }),
    ...ownProps
  })
);

class ChooseCarePlan extends Component {
  componentDidUpdate() {
    const { isQuestionnaireLoaded } = this.props;
    console.log(isQuestionnaireLoaded);
    if (isQuestionnaireLoaded) {
      history.push('/care-plan-questions');
    }
  }

  componentDidMount() {
    this.checkOnboardingStatus();
  }

  checkOnboardingStatus() {
    const { isOnboardingComplete, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      history.push('/sign-in');
    } else {
      if (isOnboardingComplete) {
        history.push('/plan');
      }
    }
  }

  render() {
    const { isChoosingCarePlan } = this.props;

    return (
      <>
        <Helmet>
          <title>{reflection.layoutProps.title} - Evry Health</title>
        </Helmet>
        <OnboardingProgressBar progressStep={2} />
        <Wrapper>
          <CarePlanSelectionSlideWithData isChoosingCarePlan={isChoosingCarePlan} />
          {isChoosingCarePlan && <LoadingSpinnerScreen />}
        </Wrapper>
      </>
    );
  }
}

ChooseCarePlan.propTypes = {
  isChoosingCarePlan: PropTypes.bool,
  isOnboardingComplete: PropTypes.bool,
  isQuestionnaireLoaded: PropTypes.bool
};

ChooseCarePlan.defaultProps = {
  isOnboardingComplete: false
};

const mapStateToProps = state => ({
  isChoosingCarePlan: isChoosingCarePlan(state),
  isAuthenticated: isAuthenticated(state),
  isOnboardingComplete: isOnboardingComplete(state),
  isQuestionnaireLoaded: isQuestionnaireLoaded(state)
});

const ConnectedChooseCarePlan = connect(mapStateToProps)(ChooseCarePlan);

const reflection = {
  component: ConnectedChooseCarePlan,
  layout: Sparse,
  layoutProps: {
    title: 'Choose a Care Plan',
    subtitle:
      'Your Care Plan offers personalized resources and advice to help you reach your health goals.',
    fullWidth: true
  },
  route: '/choose-a-care-plan'
};

export default ChooseCarePlan;

export { reflection };
