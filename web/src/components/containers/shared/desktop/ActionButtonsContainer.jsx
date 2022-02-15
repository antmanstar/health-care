/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import ActionButtons from '../../../presentation/shared/desktop/ActionButtons';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

const ActionButtonsContainer = ({ view, type, isLoading }) => {
  const mapViewToButtons = view => {
    const aliases = {
      account: ['updatePassword', 'talkToADoctor', 'contactCareGuide'],
      claims: ['orderClaimsDocuments', 'talkToADoctor', 'contactCareGuide'],
      coverage: ['understandYourBenefits', 'talkToADoctor', 'contactCareGuide'],
      documents: ['replaceMembershipCard', 'uploadADocument', 'contactCareGuide'],
      plans: ['updateHealthSurvey', 'talkToADoctor', 'contactCareGuide'],
      support: ['replaceMembershipCard', 'submitSupportRequest', 'contactCareGuide']
    }[view];
    return aliases;
  };
  return (
    <ActionButtons buttons={mapViewToButtons(view)} type={type} view={view} isLoading={isLoading} />
  );
};

ActionButtonsContainer.propTypes = {
  view: PropTypes.string.isRequired
};

export default ActionButtonsContainer;
