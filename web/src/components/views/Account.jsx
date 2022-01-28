import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import defaultTheme from '../../style/themes';
import { Standard } from '../layouts';
import MyInformationSection from '../presentation/account/desktop/MyInformationSection';
import CoordinationOfBenefitsSection from '../presentation/account/desktop/CoordinationOfBenefitsSection';
import ActionButtonsContainer from '../containers/shared/desktop/ActionButtonsContainer';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import withStoreData from '../containers/base/withStoreData';
import { Helmet } from 'react-helmet-async';


const { fetchAccountInfo, fetchFamilyMemberCOBSummary } = actions;
const {
  getAccountInfo,
  getToken,
  getMemberName,
  getEmail,
  getAddress,
  getFamilyMemberCOBSummary,
  getPCPs,
  getRepresentative,
  getContactPreferences
} = selectors;

const { LayoutWrapper } = defaultTheme.components;

const MyInformationSectionWithData = withStoreData(
  MyInformationSection,
  state => ({
    name: getMemberName(state),
    email: getEmail(state),
    address: getAddress(state),
    pcps: getPCPs(state),
    representative: getRepresentative(state),
    contactPreferences: getContactPreferences(state)
  }),
  dispatch => ({
    fetchAccountInfo: token => dispatch(fetchAccountInfo(token))
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchAccountInfo(token);
    },
    shouldFetch: !stateProps.contactPreferences,
    ...stateProps,
    ...ownProps
  })
);

const CoordinationOfBenefitsSectionWithData = withStoreData(
  CoordinationOfBenefitsSection,
  state => ({
    name: getMemberName(state),
    email: getEmail(state),
    address: getAddress(state),
    token: getToken(state),
    familyMembers: getFamilyMemberCOBSummary(state)
  }),
  dispatch => ({
    fetchFamilyMemberCOBSummary: token => dispatch(fetchFamilyMemberCOBSummary(token))
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchFamilyMemberCOBSummary(token);
    },
    shouldFetch: !stateProps.familyMembers,
    ...stateProps,
    ...ownProps
  })
);

// "Account Settings" View
// TODO: Contact Preferences need to be stored
// TODO: PCP Selection Flow
// TODO: Wire Up Link to Appointed Rep Article
// TODO: Coordination of Benefits Modal needs to be specific to clicked member

const Account = () => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.title} - Evry Health</title>
    </Helmet>
    <LayoutWrapper>
      <ActionButtonsContainer view="account" />
      <MyInformationSectionWithData />
      <CoordinationOfBenefitsSectionWithData />
    </LayoutWrapper>
  </>
);

Account.propTypes = {
  accountInfo: PropTypes.shape({})
};

Account.defaultProps = {
  accountInfo: {}
};

const mapStateToProps = state => ({
  token: getToken(state),
  accountInfo: getAccountInfo(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAccountInfo: token => {
    dispatch(fetchAccountInfo(token));
  }
});

const mergeProps = ({ token, ...stateProps }, { fetchAccountInfo }, ownProps) => ({
  fetch: () => fetchAccountInfo(token),
  shouldFetch: isEmpty(stateProps.accountInfo),
  ...stateProps,
  ...ownProps
});

const ConnectedAccount = withStoreData(Account, mapStateToProps, mapDispatchToProps, mergeProps);

const reflection = {
  component: ConnectedAccount,
  layout: Standard,
  layoutProps: {
    title: 'Account Settings'
  },
  route: '/account',
  forAuthorized: true
};

export default ConnectedAccount;

export { reflection };
