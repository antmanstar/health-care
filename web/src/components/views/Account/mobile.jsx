import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Mobile } from '../../layouts';
import defaultTheme from '../../../style/themes';
import MobileButton from '../../presentation/shared/mobile/MobileButton';

// MOBILE: Account Settings
// TODO: Wire Up Links

const { MobileListTitle, MobileContentWrapper } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

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

const Account = () => (
  <EditedMobileContentWrapper>
    <MobileListTitle>Account Settings</MobileListTitle>
    <StyledLink to="/personal-info">
      <MobileButton text="Personal Information" />
    </StyledLink>
    <StyledLink to="/contact-preferences">
      <MobileButton text="Contact Preferences" />
    </StyledLink>
    <StyledLink to="/update-password">
      <MobileButton text="Update Password" />
    </StyledLink>
    <MobileListTitle>Plan Settings</MobileListTitle>
    <MobileButton text="Choose Primary Care Physician" />
    <MobileButton text="Coordination of Benefits" />
  </EditedMobileContentWrapper>
);

const reflection = {
  component: Account,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Settings',
      permanentTitle: true,
      right: 'menu',
      permanentBg: true
    }
  },
  route: '/account',
  forAuthorized: true
};

export default Account;

export { reflection };
