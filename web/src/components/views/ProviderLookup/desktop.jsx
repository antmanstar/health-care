import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../style/themes';
import { Standard } from '../../layouts';
import ProviderListItem from '../../presentation/providers/desktop/ProviderListItem';
import ProviderLookupSelectedItem from '../../presentation/providers/desktop/ProviderLookupSelectedItem';
import { Helmet } from 'react-helmet-async';

// "Provider Lookup" View

const { LayoutWrapper } = defaultTheme.components;

const ProviderLookupResults = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  & > div {
    width: 49%;
  }
`;

const ProviderLookup = () => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.title} - Evry Health</title>
    </Helmet>
    <LayoutWrapper>
      <ProviderLookupResults>
        <div>
          <ProviderListItem />
          <ProviderListItem />
          <ProviderListItem />
          <ProviderListItem />
        </div>
        <ProviderLookupSelectedItem />
      </ProviderLookupResults>
    </LayoutWrapper>
  </>
);

const reflection = {
  component: ProviderLookup,
  layout: Standard,
  layoutProps: {
    title: 'Provider Lookup'
  },
  route: '/provider-lookup',
  forAuthorized: true
};

export default ProviderLookup;

export { reflection };
