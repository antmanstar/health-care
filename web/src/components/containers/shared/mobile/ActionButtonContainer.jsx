/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../../../presentation/shared/BigButton';
import buttonData from '../../../../common/button-data';

class ActionButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  benefitsClick() {
    alert('Understand my benefits now!');
  }

  careGuideClick() {
    alert('Contact care guide!');
  }

  contactDoctorClick() {
    alert('Contact my doc!');
  }

  downloadMembershipCardClick() {
    alert('Download Membership Card');
  }

  orderClaimsClick() {
    alert('Order Claims!');
  }

  passwordClick() {
    alert('Update Password!');
  }

  replaceCardClick() {
    alert('Get me a new card!');
  }

  requestInformationClick() {
    alert('Request Info');
  }

  requestMembershipCardClick() {
    alert('Request Membership Card');
  }

  scheduleAppointmentClick() {
    alert('Schedule an Appointment');
  }

  schedulePhoneCallClick() {
    alert('Schedule a Phone Call');
  }

  sendMessageClick() {
    alert('Send a Message');
  }

  submitRequestClick() {
    alert('Submit a new support request!');
  }

  updateQuestionsClick() {
    alert('Update questions!');
  }

  updateSurveyClick() {
    alert('Update my health survey!');
  }

  uploadDocumentClick() {
    alert('Here is my new document!');
  }

  extractClickFunction(method) {
    return {
      benefitsClick: this.benefitsClick,
      careGuideClick: this.careGuideClick,
      contactDoctorClick: this.contactDoctorClick,
      downloadMembershipCardClick: this.downloadMembershipCardClick,
      orderClaimsClick: this.orderClaimsClick,
      passwordClick: this.passwordClick,
      replaceCardClick: this.replaceCardClick,
      requestMembershipCardClick: this.requestMembershipCardClick,
      scheduleAppointmentClick: this.scheduleAppointmentClick,
      schedulePhoneCallClick: this.schedulePhoneCallClick,
      sendMessageClick: this.sendMessageClick,
      submitRequestClick: this.submitRequestClick,
      updateQuestionsClick: this.updateQuestionsClick,
      updateSurveyClick: this.updateSurveyClick,
      uploadDocumentClick: this.uploadDocumentClick
    }[method];
  }

  render() {
    const { buttonKey } = this.props;
    return (
      <BigButton
        text={buttonData[buttonKey].text}
        icon={buttonData[buttonKey].icon}
        svgIcon={buttonData[buttonKey].svgIcon}
        onClick={this.extractClickFunction(buttonData[buttonKey].onClick)}
      />
    );
  }
}

ActionButtonContainer.propTypes = {
  buttonKey: PropTypes.string.isRequired
};

export default ActionButtonContainer;
