import React, { Component } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../style/themes';
import { Mobile } from '../../layouts';
import SearchAndFilterBar from '../../presentation/shared/desktop/SearchAndFilterBar';
import ProviderProfile from '../../presentation/providers/desktop/ProviderProfile';
import MobileSectionHeader from '../../presentation/shared/mobile/MobileSectionHeader';

// MOBILE: Provider Lookup
// TODO: Search & Return Providers, Filters: Location Radius, Specialty, Language, Gender
// TODO: Map View / List View Toggle
// TODO: Selecting Provider Brings up individual Provider View

const { MobileContentWrapper, MobileContainer, MobileSectionBackground } = defaultTheme.components;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const Background = styled.div`
  height: 100px;
  margin-bottom: -40px;
  background: ${props => props.theme.gradients.main};
  clip-path: polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 54% 100%, 40% 100%, 0 80%, 0 0);
  z-index: -10;
`;

const Spacer = styled.div`
  padding-top: 108px;
`;

class ProviderLookup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <FixedHeader>
          <Background />
          <MobileContentWrapper>
            <SearchAndFilterBar placeholder="Search Providers" bigShadow />
          </MobileContentWrapper>
        </FixedHeader>
        <Spacer />
        <MobileContentWrapper>
          <MobileSectionHeader subtitle="Tap on a provider for more details." />
          <MobileSectionBackground>
            <MobileContainer>
              <ProviderProfile
                name="Jacob Jefferson, M.D."
                distance="0.8"
                practiceName="Clearstone Family Medicine"
                address="2310 Spring Valley Rd. Plano, TX 75023"
                phone="469-345-9284"
                npiNumber="123456789"
                network="Evry Premier Network"
                specialties={['Family Medicine']}
                languages={['English']}
              />
            </MobileContainer>
          </MobileSectionBackground>
        </MobileContentWrapper>
      </>
    );
  }
}

const reflection = {
  component: ProviderLookup,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Look up a Provider.',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/provider-lookup',
  forAuthorized: true
};

export default ProviderLookup;

export { reflection };
