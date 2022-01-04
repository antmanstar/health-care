import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import defaultTheme from '../../../style/themes';
import { Mobile } from '../../layouts';
import MobileBigButton from '../../presentation/shared/BigButton/mobile';

// MOBILE: Documents View

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

const Documents = () => (
  <>
    <MobileContentWrapper>
      <StyledLink to="/received-documents">
        <MobileBigButton
          title="EOBs & Letters"
          subtitle="See all documents we’ve sent you."
          icon="description"
        />
      </StyledLink>
      <StyledLink to="/download-forms">
        <MobileBigButton
          title="Download Forms"
          subtitle="Download Forms to send to Evry."
          icon="insert_drive_file"
        />
      </StyledLink>
    </MobileContentWrapper>
  </>
);

const reflection = {
  component: Documents,
  layout: Mobile,
  layoutProps: {
    title: 'My Documents',
    subtitle: 'Find your benefit documents or download forms.',
    titleType: 'standard',
    footer: true,
    navProps: {
      left: 'back',
      right: 'menu'
    }
  },
  route: '/documents'
};

export default Documents;

export { reflection };
