/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButtons from '../../../presentation/shared/desktop/ActionButtons';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

class ActionButtonsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mapViewToButtons(view) {
    const aliases = {
      account: ['updatePassword', 'talkToADoctor', 'contactCareGuide'],
      claims: ['orderClaimsDocuments', 'talkToADoctor', 'contactCareGuide'],
      coverage: ['understandYourBenefits', 'talkToADoctor', 'contactCareGuide'],
      documents: ['replaceMembershipCard', 'uploadADocument', 'contactCareGuide'],
      plans: ['updateHealthSurvey', 'talkToADoctor', 'contactCareGuide'],
      support: ['replaceMembershipCard', 'submitSupportRequest', 'contactCareGuide']
    }[view];
    return aliases;
  }

  render() {
    const { view } = this.props;

    return <ActionButtons buttons={this.mapViewToButtons(view)} />;
  }
}

ActionButtonsContainer.propTypes = {
  view: PropTypes.string.isRequired
};

export default ActionButtonsContainer;
