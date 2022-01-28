import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import MobileBigButton from '../presentation/shared/BigButton/mobile';
import { Helmet } from 'react-helmet-async';

// MOBILE: Member Tools View
// TODO: Add links to Formulary Lookup & Expense Calculator

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

const MemberTools = () => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.title} - Evry Health</title>
    </Helmet>
    <MobileContentWrapper>
      <StyledLink to="/provider-lookup">
        <MobileBigButton
          title="Provider Lookup"
          subtitle="Find a doctor."
          icon="provider-lookup"
          svgIcon
        />
      </StyledLink>
      <StyledLink to="/">
        <MobileBigButton
          title="Prescription Formulary"
          subtitle="Find prescriptions and see costs."
          icon="formulary"
          svgIcon
        />
      </StyledLink>
      <StyledLink to="/">
        <MobileBigButton
          title="Expense Calculator"
          subtitle="Find out how much procedures cost."
          icon="expense-calculator"
          svgIcon
        />
      </StyledLink>
      <StyledLink to="/">
        <MobileBigButton
          title="Pharmacy Lookup"
          subtitle="Find pharmacy location."
          icon="local-pharmacy-black"
          svgIcon
        />
      </StyledLink>
      <StyledLink to="/">
        <MobileBigButton
          title="Out-of-Area Provider Lookup"
          subtitle="Find a provider on a map."
          icon="medical-services-black"
          svgIcon
        />
      </StyledLink>
    </MobileContentWrapper>
  </>
);

const reflection = {
  component: MemberTools,
  layout: Mobile,
  layoutProps: {
    title: 'Member Tools',
    subtitle: 'Search for providers, prescriptions, or expenses.',
    titleType: 'standard',
    footer: true,
    navProps: {
      left: 'back',
      right: 'menu'
    }
  },
  route: '/member-tools'
};

export default MemberTools;

export { reflection };
