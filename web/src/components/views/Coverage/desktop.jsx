import React from 'react';
import isEmpty from 'lodash/isEmpty';
import defaultTheme from '../../../style/themes';
import { Standard } from '../../layouts';
import CoverageSummary from '../../presentation/coverage/desktop/CoverageSummary';
import ClaimsTotals from '../../presentation/shared/desktop/ClaimsTotals';
import MedicalServicesSection from '../../presentation/coverage/desktop/MedicalServicesSection';
import ActionButtonsContainer from '../../containers/shared/desktop/ActionButtonsContainer';
import withStoreData from '../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';

const { fetchBenefitCoverages, fetchAccumulators, fetchMembershipSummary } = actions;
const { getAccumulators, getBenefitCoverages, getMemberId, getToken, getMembership } = selectors;

// DESKTOP: Coverage View
// TODO: Wire up action buttons
// TODO: Fix API Data coming in
// TODO: Display Plan Type based on data
// TODO: Wire Up Filtering for Individual / Family
// TODO: Add Toggle for In/Out of network
// TODO: Add link to Undertand Your Benefits article if available

const { LayoutWrapper } = defaultTheme.components;

const Coverage = () => {
  const CoverageSummaryWithData = withStoreData(
    CoverageSummary,
    state => ({
      token: getToken(state),
      memberId: getMemberId(state),
      accumulators: getAccumulators(state),
      membershipSummary: getMembership(state)
    }),
    dispatch => ({
      fetchAccumulators: (token, id, date, type) =>
        dispatch(fetchAccumulators(token, id, date, type || 1)),
      fetchMembership: token => dispatch(fetchMembershipSummary(token))
    }),
    (stateProps, dispatchProps, ownProps) => ({
      fetch: () => {
        dispatchProps.fetchAccumulators(
          stateProps.token,
          stateProps.memberId,
          new Date().toISOString()
        );
        dispatchProps.fetchMembership(stateProps.token);
      },
      shouldFetch:
        isEmpty(stateProps.accumulators) ||
        Object.keys(stateProps.membershipSummary).reduce(
          (prev, key) =>
            prev ||
            stateProps.membershipSummary[key] == null ||
            stateProps.membershipSummary[key] === false,
          false
        ),
      accumulators: stateProps.accumulators,
      ...stateProps.membershipSummary,
      ...ownProps
    })
  );
  const MedicalServicesSectionWithData = withStoreData(
    MedicalServicesSection,
    state => ({
      token: getToken(state),
      coverages: getBenefitCoverages(state),
      membershipSummary: getMembership(state)
    }),
    dispatch => ({
      fetchBenefitCoverages: token => dispatch(fetchBenefitCoverages(token)),
      fetchMembership: token => dispatch(fetchMembershipSummary(token))
    }),
    (stateProps, dispatchProps, ownProps) => ({
      fetch: () => {
        dispatchProps.fetchBenefitCoverages(stateProps.token);
        dispatchProps.fetchMembership(stateProps.token);
      },
      shouldFetch:
        isEmpty(stateProps.coverages) ||
        Object.keys(stateProps.membershipSummary).reduce(
          (prev, key) =>
            prev ||
            stateProps.membershipSummary[key] == null ||
            stateProps.membershipSummary[key] === false,
          false
        ),
      coverages: stateProps.coverages.pending ? [] : stateProps.coverages,
      ...stateProps.membershipSummary,
      ...ownProps
    })
  );
  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <LayoutWrapper>
        <ActionButtonsContainer type="headerButtons" view="coverage" />
        <CoverageSummaryWithData />
        <ClaimsTotals />
        <MedicalServicesSectionWithData />
      </LayoutWrapper>
    </>
  );
};

const reflection = {
  component: Coverage,
  layout: Standard,
  layoutProps: {
    title: 'My Coverage'
  },
  route: '/coverage',
  forAuthorized: true
};

export default Coverage;

export { reflection };
