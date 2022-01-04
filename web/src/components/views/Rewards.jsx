import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import RewardCard from '../presentation/careplan/mobile/RewardsCard';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import withStoreData from '../containers/base/withStoreData';
import { Helmet } from 'react-helmet-async';

const { fetchRewardBenefits, fetchRewardCategories } = actions;
const { getRewardBenefits, getRewardCategories, getToken } = selectors;

// MOBILE: Care Plan - Rewards View

const { MobileContentWrapper } = defaultTheme.components;

const Rewards = ({ rewardBenefits, rewardCategories }) => {
  const activityRewards = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 1);
  const discountItems = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 2);

  return (
    <MobileContentWrapper>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <RewardCard activityRewards={activityRewards} />
      <RewardCard discount discountItems={discountItems} rewardCategories={rewardCategories} />
    </MobileContentWrapper>
  );
};

Rewards.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  rewardBenefits: getRewardBenefits(state),
  rewardCategories: getRewardCategories(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchRewardBenefits: token => dispatch(fetchRewardBenefits(token)),
  fetchRewardCategories: token => dispatch(fetchRewardCategories(token))
});

const mergeProps = (
  { token, ...stateProps },
  { fetchRewardBenefits, fetchRewardCategories },
  ownProps
) => ({
  fetch: {
    rewardBenefits: () => fetchRewardBenefits(token),
    rewardCategories: () => fetchRewardCategories(token)
  },
  shouldFetch: {
    rewardBenefits: isEmpty(stateProps.rewardBenefits),
    rewardCategories: isEmpty(stateProps.rewardCategories)
  },
  ...stateProps,
  ...ownProps
});

const ConnectedRewards = withStoreData(Rewards, mapStateToProps, mapDispatchToProps, mergeProps);

const reflection = {
  component: ConnectedRewards,
  layout: Mobile,
  layoutProps: {
    title: 'Earn Rewards.',
    subtitle:
      'Explore our library of articles and learning materials specifically curated for you.',
    icon: 'redeem',
    titleType: 'standard',
    navProps: {
      left: 'back'
    }
  },
  route: '/rewards'
};

export default ConnectedRewards;

export { reflection };
