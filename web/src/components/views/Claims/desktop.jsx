import React from 'react';
import defaultTheme from '../../../style/themes';
import { Standard } from '../../layouts';
import ClaimsTotals from '../../presentation/shared/desktop/ClaimsTotals';
import ClaimsHistorySection from '../../presentation/claims/desktop/ClaimsHistorySection';
import InformationSection from '../../presentation/shared/desktop/InformationSection';
import ActionButtonsContainer from '../../containers/shared/desktop/ActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

// DESKTOP: Claims View
// TODO: Wire up action buttons
// TODO: fix data coming in
// TODO: Wire up download EOB action
// TODO: Wire up link to contact care guide (WAITING: Jong/Evry endpoint for this)
// TODO: Fix date formatting
// TODO: What should be displayed when claim data is absent?
// TODO: Wire up pagination controls (Paul)
// TODO: Wire up search / filters for claims history (also Paul, goes with pagination)

const { LayoutWrapper } = defaultTheme.components;

const Claims = () => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.title} - Evry Health</title>
    </Helmet>
    <LayoutWrapper>
      <ActionButtonsContainer type="headerButtons" view="claims" />
      <InformationSection
        title="Summary"
        subTitle="The summary below reflects the current benefit year. The claims displayed below are only medical claims. Pharmacy claims are not displayed."
        icon="bar_chart"
      />
      <ClaimsTotals />
      <ClaimsHistorySection />
    </LayoutWrapper>
  </>
);

const reflection = {
  component: Claims,
  layout: Standard,
  layoutProps: {
    title: 'My Claims'
  },
  route: '/claims',
  forAuthorized: true
};

export default Claims;

export { reflection };
