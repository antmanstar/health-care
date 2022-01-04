import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import Moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import BigButton from '../presentation/shared/BigButton';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';
import getCarePlanInfo from '../../utils/carePlanInfo';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../presentation/shared/Loader/Loader';
import getGreetingTime from '../../utils/time';

const { clearViewSubtitle, clearViewTitle, fetchCarePlan, setViewSubtitle, setViewTitle } = actions;
const { getCarePlan, getToken, getMemberName } = selectors;

// MOBILE: Dashboard View

const { MobileContentWrapper, SectionDivider } = defaultTheme.components;

const StyledLink = styled(RouterLink)`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const MobileSectionDivider = styled(SectionDivider)`
  border-color: #ebebeb;
  margin: 8px 0 16px;
`;

const handleClick = () => {
  alert('Send User to Telehealth.');
};

class Dashboard extends Component {
  componentDidMount() {
    const { setTitles } = this.props;
    setTitles();
  }

  componentWillUnmount() {
    const { clearTitles } = this.props;
    clearTitles();
  }

  render() {
    const { carePlan } = this.props;
    const plan = getCarePlanInfo(carePlan && carePlan.care_plan_id);
    return (
      <>
        <MobileContentWrapper>
          {!carePlan ? (
            <Loader />
          ) : (
            <>
              <StyledLink to="/plan">
                <BigButton
                  title="My Care Plan"
                  subtitle="Meet your health goals. Get Rewards."
                  icon={plan.image}
                  svgIcon
                />
              </StyledLink>
              <StyledLink to="/claims">
                <BigButton
                  title="My Claims"
                  subtitle="Stay on top of your medical expenses."
                  icon="claims-circle"
                  svgIcon
                />
              </StyledLink>
              <StyledLink to="/support">
                <BigButton
                  title="Customer Support"
                  subtitle="Let us make your life easy."
                  icon="customer-support-circle"
                  svgIcon
                />
              </StyledLink>
            </>
          )}
        </MobileContentWrapper>
        <MobileSectionDivider />
        <MobileContentWrapper>
          <MobileActionButton text="Talk to a Doctor" type="action" onClick={handleClick} />
        </MobileContentWrapper>
      </>
    );
  }
}

Dashboard.propTypes = {
  carePlan: PropTypes.shape({}).isRequired,
  clearTitles: PropTypes.func,
  setTitles: PropTypes.func
};

Dashboard.defaultProps = {
  clearTitles: () => {},
  setTitles: () => {}
};

const ConnectedDashboard = withRouter(
  withStoreData(
    Dashboard,
    (state, ownProps) => ({
      carePlan: getCarePlan(state),
      memberName: getMemberName(state),
      token: getToken(state)
    }),
    dispatch => ({
      fetchCarePlan: token => dispatch(fetchCarePlan(token)),
      clearTitles: () => {
        dispatch(clearViewSubtitle());
        dispatch(clearViewTitle());
      },
      setTitles: ({ subtitle, title }) => {
        dispatch(setViewSubtitle(subtitle));
        dispatch(setViewTitle(title));
      }
    }),
    ({ carePlan, memberName, token }, { setTitles, ...dispatchProps }, ownProps) => ({
      fetch: () => {
        dispatchProps.fetchCarePlan(token);
      },
      shouldFetch: isEmpty(carePlan),
      carePlan,
      setTitles: () => {
        const greetingTime = getGreetingTime(Moment());
        const subtitle =
          greetingTime === 'morning' ? "Let's kick things off right." : 'How can we help, today?';
        setTitles({ subtitle, title: `Good ${greetingTime}, ${memberName.first}!` });
      },
      ...dispatchProps,
      ...ownProps
    })
  )
);

const reflection = {
  component: ConnectedDashboard,
  layout: Mobile,
  layoutProps: {
    titleType: 'standard',
    footer: true,
    navProps: {
      left: 'logo',
      right: 'menu'
    }
  },
  route: '/dashboard',
  forAuthorized: true
};

export default Dashboard;

export { reflection };
