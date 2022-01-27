/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../../../utils/history';
import BigButton from '../../../presentation/shared/BigButton';
import PlanBigButton from '../../../presentation/shared/PlanBigButton';
import buttonData from '../../../../common/button-data';
import actions from '@evry-member-app/shared/store/actions';

const { showModal } = actions;

class BigButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  benefitsClick() {
    alert('Understand my benefits now!');
  }

  careGuideClick() {
    this.props.showModal('CONTACT_CARE_GUIDE');
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
    this.props.showModal('UPDATE_PASSWORD');
  }

  replaceCardClick() {
    this.props.showModal('REQUEST_NEW_MEMBERSHIP_CARD');
  }

  requestInformationClick() {
    this.props.showModal('REQUEST_INFORMATION');
  }

  requestMembershipCardClick() {
    alert('Request Membership Card');
  }

  scheduleAppointmentClick() {
    this.props.showModal('SCHEDULE_APPOINTMENT');
  }

  schedulePhoneCallClick() {
    this.props.showModal('SCHEDULE_PHONE_CALL');
  }

  sendMessageClick() {
    this.props.showModal('SEND_MESSAGE');
  }

  submitRequestClick() {
    this.props.showModal('SUBMIT_NEW_SUPPORT_REQUEST');
  }

  updateQuestionsClick() {
    this.props.showModal('UPDATE_SECURITY_QUESTIONS');
  }

  updateSurveyClick() {
    history.push('/health-assessment');
  }

  uploadDocumentClick() {
    this.props.showModal('UPLOAD_DOCUMENT');
  }

  extractClickFunction(method) {
    return {
      benefitsClick: this.benefitsClick.bind(this),
      careGuideClick: this.careGuideClick.bind(this),
      contactDoctorClick: this.contactDoctorClick.bind(this),
      downloadMembershipCardClick: this.downloadMembershipCardClick.bind(this),
      orderClaimsClick: this.orderClaimsClick.bind(this),
      passwordClick: this.passwordClick.bind(this),
      replaceCardClick: this.replaceCardClick.bind(this),
      requestInformationClick: this.requestInformationClick.bind(this),
      requestMembershipCardClick: this.requestMembershipCardClick.bind(this),
      scheduleAppointmentClick: this.scheduleAppointmentClick.bind(this),
      schedulePhoneCallClick: this.schedulePhoneCallClick.bind(this),
      sendMessageClick: this.sendMessageClick.bind(this),
      submitRequestClick: this.submitRequestClick.bind(this),
      updateQuestionsClick: this.updateQuestionsClick.bind(this),
      updateSurveyClick: this.updateSurveyClick.bind(this),
      uploadDocumentClick: this.uploadDocumentClick.bind(this)
    }[method];
  }

  render() {
    const { buttonKey, view } = this.props;

    return view === 'plans' ? (
      <PlanBigButton
        text={buttonData[buttonKey].text}
        icon={buttonData[buttonKey].icon}
        svgIcon={buttonData[buttonKey].svgIcon}
        onClick={this.extractClickFunction(buttonData[buttonKey].onClick)}
        view={view}
      />
    ) : (
      <BigButton
        text={buttonData[buttonKey].text}
        icon={buttonData[buttonKey].icon}
        svgIcon={buttonData[buttonKey].svgIcon}
        onClick={this.extractClickFunction(buttonData[buttonKey].onClick)}
        view={view}
      />
    );
  }
}

BigButtonContainer.propTypes = {
  buttonKey: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  view: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(null, mapDispatchToProps)(BigButtonContainer);
