/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../../../utils/history';
import BigButton from '../../../presentation/shared/BigButton/desktop';
import HeaderBigButton from '../../../presentation/shared/HeaderBigButton';
import buttonData from '../../../../common/button-data';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { showModal, error500Test, downloadUnderstandYourBenefits } = actions;
const { getToken } = selectors;

const BigButtonContainer = ({
  buttonKey,
  view,
  type,
  showModal,
  token,
  downloadUnderstandYourBenefits,
  error500Test
}) => {
  const benefitsClick = () => {
    downloadUnderstandYourBenefits(token);
  };

  const careGuideClick = () => {
    showModal('CONTACT_CARE_GUIDE');
  };

  const contactDoctorClick = () => {
    //showModal('ERROR_500');
    error500Test();
    alert('Contact my doc!!');
  };

  const downloadMembershipCardClick = () => {
    alert('Download Membership Card');
  };

  const orderClaimsClick = () => {
    alert('Order Claims!');
  };

  const passwordClick = () => {
    showModal('UPDATE_PASSWORD');
  };

  const replaceCardClick = () => {
    showModal('REQUEST_NEW_MEMBERSHIP_CARD');
  };

  const requestInformationClick = () => {
    showModal('REQUEST_INFORMATION');
  };

  const requestMembershipCardClick = () => {
    showModal('REQUEST_MAILED_CARD');
  };

  const scheduleAppointmentClick = () => {
    showModal('SCHEDULE_APPOINTMENT');
  };

  const schedulePhoneCallClick = () => {
    showModal('SCHEDULE_PHONE_CALL');
  };

  const sendMessageClick = () => {
    showModal('SEND_MESSAGE');
  };

  const submitRequestClick = () => {
    showModal('SUBMIT_NEW_SUPPORT_REQUEST');
  };

  const updateQuestionsClick = () => {
    showModal('UPDATE_SECURITY_QUESTIONS');
  };

  const updateSurveyClick = () => {
    history.push('/health-assessment');
  };

  const uploadDocumentClick = () => {
    showModal('UPLOAD_DOCUMENT');
  };

  const extractClickFunction = method => {
    const methods = {
      benefitsClick: benefitsClick,
      careGuideClick: careGuideClick,
      contactDoctorClick: contactDoctorClick,
      downloadMembershipCardClick: downloadMembershipCardClick,
      orderClaimsClick: orderClaimsClick,
      passwordClick: passwordClick,
      replaceCardClick: replaceCardClick,
      requestInformationClick: requestInformationClick,
      requestMembershipCardClick: requestMembershipCardClick,
      scheduleAppointmentClick: scheduleAppointmentClick,
      schedulePhoneCallClick: schedulePhoneCallClick,
      sendMessageClick: sendMessageClick,
      submitRequestClick: submitRequestClick,
      updateQuestionsClick: updateQuestionsClick,
      updateSurveyClick: updateSurveyClick,
      uploadDocumentClick: uploadDocumentClick
    };
    return methods[method];
  };

  return type === 'headerButtons' ? (
    <HeaderBigButton
      text={buttonData[buttonKey].text}
      icon={buttonData[buttonKey].icon}
      svgIcon={buttonData[buttonKey].svgIcon}
      isComing={buttonData[buttonKey].isComing}
      onClick={() => extractClickFunction(buttonData[buttonKey].onClick)()}
      view={view}
    />
  ) : (
    <BigButton
      text={buttonData[buttonKey].text}
      icon={buttonData[buttonKey].icon}
      svgIcon={buttonData[buttonKey].svgIcon}
      isComing={buttonData[buttonKey].isComing}
      onClick={() => extractClickFunction(buttonData[buttonKey].onClick)()}
      view={view}
    />
  );
};
BigButtonContainer.propTypes = {
  buttonKey: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  view: PropTypes.string
};

const mapStateToProps = state => ({
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    dispatch(showModal(modal));
  },
  error500Test: () => {
    dispatch(error500Test());
  },
  downloadUnderstandYourBenefits: token => {
    dispatch(downloadUnderstandYourBenefits(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BigButtonContainer);
