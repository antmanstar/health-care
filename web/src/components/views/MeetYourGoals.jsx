import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty, find } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import RewardNotice from '../presentation/careplan/mobile/RewardNotice';
import MobileBigButton from '../presentation/shared/BigButton/mobile';
import Loader from '../presentation/shared/Loader/Loader';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';

const { fetchWellnessGoals } = actions;
const { getToken, getWellnessGoals } = selectors;

// MOBILE: Care Plan - Meet Your Goals View

const { MobileListTitle, MobileContentWrapper } = defaultTheme.components;

const ContentWrapper = styled(MobileContentWrapper)`
  padding-bottom: 16px;
`;

const StyledLink = styled(RouterLink)`
  display: block;
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const MeetYourGoals = React.memo(({ wellnessGoals }) => {
  const organizeGoals = goals => {
    const newGoals = Object.values(goals).reduce((acc, goal) => {
      const section = goal.wellness_goal_categories[0].wellness_goal_category_name;

      if (acc.length !== 0) {
        acc.map(item => item.sectionTitle === section && item.programs.push(goal));
      }

      if (!find(acc, { sectionTitle: section })) {
        return acc.concat({ sectionTitle: section, programs: [goal] });
      }

      return acc;
    }, []);

    return newGoals;
  };

  const goals = organizeGoals(wellnessGoals);

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <RewardNotice />
      <ContentWrapper>
        {!goals ? (
          <Loader />
        ) : (
          goals.map(goal => (
            <React.Fragment key={goal.sectionTitle}>
              <MobileListTitle>{goal.sectionTitle}</MobileListTitle>
              {goal.programs.map(program => (
                <React.Fragment key={program.wellness_goal_id}>
                  <StyledLink to={`/wellness-program/${program.wellness_goal_id}`}>
                    <MobileBigButton
                      title={program.wellness_goal_name}
                      subtitle={program.wellness_goal_description}
                    />
                  </StyledLink>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))
        )}
      </ContentWrapper>
    </>
  );
});

const MeetYourGoalsWithData = withStoreData(
  MeetYourGoals,
  state => ({
    token: getToken(state),
    wellnessGoals: getWellnessGoals(state)
  }),
  dispatch => ({
    fetchWellnessGoals: token => dispatch(fetchWellnessGoals(token))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchWellnessGoals(stateProps.token);
    },
    shouldFetch: isEmpty(stateProps.wellnessGoals),
    wellnessGoals: stateProps.wellnessGoals,
    ...ownProps
  })
);

MeetYourGoals.propTypes = {
  wellnessGoals: PropTypes.shape({}).isRequired
};

const reflection = {
  component: MeetYourGoalsWithData,
  layout: Mobile,
  layoutProps: {
    title: 'Meet Your Goals.',
    subtitle:
      'We have partnered with amazing programs to provide the best resources at a discount.',
    icon: 'meet-your-goals',
    svgIcon: true,
    titleType: 'standard',
    navProps: {
      left: 'back'
    }
  },
  route: '/meet-your-goals'
};

export default MeetYourGoalsWithData;

export { reflection };
