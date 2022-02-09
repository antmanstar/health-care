import React from 'react';
import defaultTheme from '../../../style/themes';
import { Standard } from '../../layouts';
import MyMembershipSection from '../../presentation/documents/desktop/MyMembershipSection';
import MyDocumentsSection from '../../presentation/documents/desktop/MyDocumentsSection';
import ActionButtonsContainer from '../../containers/shared/desktop/ActionButtonsContainer';
import withStoreData from '../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';

const { fetchMembershipSummary, showModal } = actions;
const { getToken, getMembership, getMembershipLoadingStatus } = selectors;

// DESKTOP: Document Center View
// TODO: Update Styling / Markup for Member Info Section
// TODO: API needs to supply membership docs

const { LayoutWrapper } = defaultTheme.components;

const Documents = () => {
  const MyMembershipSectionWithData = withStoreData(
    MyMembershipSection,
    state => ({
      token: getToken(state),
      membershipSummary: getMembership(state)
    }),
    dispatch => ({
      fetchMembership: token => dispatch(fetchMembershipSummary(token)),
      showModal: () => dispatch(showModal('REQUEST_NEW_MEMBERSHIP_CARD'))
    }),
    (stateProps, dispatchProps, ownProps) => ({
      fetch: () => dispatchProps.fetchMembership(stateProps.token),
      shouldFetch: Object.keys(stateProps.membershipSummary).reduce(
        (prev, key) =>
          prev ||
          stateProps.membershipSummary[key] == null ||
          stateProps.membershipSummary[key] === false,
        false
      ),
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
        <ActionButtonsContainer type="headerButtons" view="documents" />
        <MyMembershipSectionWithData />
        <MyDocumentsSection />
      </LayoutWrapper>
    </>
  );
};

const reflection = {
  component: Documents,
  layout: Standard,
  layoutProps: {
    title: 'Document Center'
  },
  route: '/documents',
  forAuthorized: true
};

export default Documents;

export { reflection };
