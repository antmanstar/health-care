import React from 'react';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import MobileMemberInfo from '../presentation/shared/mobile/MobileMemberInfo';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import withStoreData from '../containers/base/withStoreData';

const { fetchAccountInfo } = actions;
const { getAddress, getEmail, getMemberName } = selectors;

// MOBILE: Personal Information Settings

const { MobileContentWrapper } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 48px);
`;

const MobileMemberInfoWithData = withStoreData(
  MobileMemberInfo,
  state => ({
    name: getMemberName(state),
    email: getEmail(state),
    address: getAddress(state)
  }),
  dispatch => ({
    fetchAccountInfo: token => dispatch(fetchAccountInfo(token))
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchAccountInfo(token);
    },
    shouldFetch: !stateProps.address,
    ...stateProps,
    ...ownProps
  })
);

const PersonalInformation = () => (
  <EditedMobileContentWrapper>
    <MobileMemberInfoWithData />
  </EditedMobileContentWrapper>
);

const reflection = {
  component: PersonalInformation,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Personal Information',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/personal-info',
  forAuthorized: true
};

export default PersonalInformation;

export { reflection };
