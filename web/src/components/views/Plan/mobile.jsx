import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../style/themes';
import { Mobile } from '../../layouts';
import MobileBigButton from '../../presentation/shared/BigButton/mobile';
import withStoreData from '../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import getCarePlanInfo from '../../../utils/carePlanInfo';

const {
  clearViewDescription,
  clearViewIcon,
  clearViewSubtitle,
  clearViewTitle,
  fetchCarePlan,
  setViewDescription,
  setViewIcon,
  setViewSubtitle,
  setViewTitle
} = actions;
const { getCarePlan, getToken } = selectors;

// MOBILE: Care Plan View

const { MobileContentWrapper } = defaultTheme.components;

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

class Plan extends Component {
  componentDidMount() {
    const { setTitles } = this.props;
    setTitles();
  }

  componentWillUnmount() {
    const { clearTitles } = this.props;
    clearTitles();
  }

  render() {
    return (
      <MobileContentWrapper>
        <StyledLink to="/meet-your-goals">
          <MobileBigButton
            title="Meet Your Goals"
            subtitle="Discounted wellness programs"
            icon="meet-goals"
            svgIcon
          />
        </StyledLink>
        <StyledLink to="/articles-and-resources">
          <MobileBigButton
            title="Educate Yourself"
            subtitle="Helpful articles & resources"
            icon="library_books"
          />
        </StyledLink>
        <StyledLink to="/rewards">
          <MobileBigButton
            title="Earn Rewards"
            subtitle="Learn about our rewards system."
            icon="redeem"
          />
        </StyledLink>
      </MobileContentWrapper>
    );
  }
}

Plan.propTypes = {
  carePlan: PropTypes.shape({}).isRequired,
  setTitles: PropTypes.func,
  clearTitles: PropTypes.func
};

Plan.defaultProps = {
  clearTitles: () => {},
  setTitles: () => {}
};

const ConnectedPlan = withRouter(
  withStoreData(
    Plan,
    (state, ownProps) => ({
      carePlan: getCarePlan(state),
      token: getToken(state)
    }),
    dispatch => ({
      fetchCarePlan: token => dispatch(fetchCarePlan(token)),
      clearTitles: () => {
        dispatch(clearViewDescription());
        dispatch(clearViewIcon());
        dispatch(clearViewSubtitle());
        dispatch(clearViewTitle());
      },
      setTitles: ({ description, icon, subtitle, title }) => {
        dispatch(setViewDescription(description));
        dispatch(setViewIcon(icon));
        dispatch(setViewSubtitle(subtitle));
        dispatch(setViewTitle(title));
      }
    }),
    ({ carePlan, token }, { setTitles, ...dispatchProps }, ownProps) => ({
      fetch: () => {
        dispatchProps.fetchCarePlan(token);
      },
      shouldFetch: isEmpty(carePlan),
      carePlan,
      setTitles: () => {
        const planData = getCarePlanInfo(carePlan.care_plan_id);
        setTitles({
          icon: planData.image,
          description: planData.description,
          subtitle: planData.title
        });
      },
      ...dispatchProps,
      ...ownProps
    })
  )
);

const reflection = {
  component: ConnectedPlan,
  layout: Mobile,
  layoutProps: {
    title: 'My Care Plan',
    titleType: 'big',
    footer: true,
    navProps: {
      left: 'back',
      right: 'menu'
    }
  },
  route: '/plan',
  forAuthorized: true
};

export default Plan;

export { reflection };
