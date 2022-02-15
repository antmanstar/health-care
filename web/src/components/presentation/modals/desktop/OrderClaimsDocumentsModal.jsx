/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import SmallButton from '../../shared/desktop/SmallButton';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';

const { setModalData, showModal, orderClaimsDocumentCase } = actions;

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalWrapper,
  ModalSectionDivider,
  ModalTitle
} = defaultTheme.components;

const { createClaimFeedbackCase } = actions;
const { getToken } = selectors;

const SubmitClaimFeedbackModal = ({
  modalData,
  showModal,
  hideModal,
  setModalData,
  token,
  orderClaimsDocumentCase
}) => {
  return (
    <>
      <Scrim onClick={hideModal} />
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>Order Claims Documents</ModalTitle>
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <SmallButton text="Submit Request" />
          <SmallButton text="Cancel" negative onClick={hideModal} />
        </ModalButtonsRight>
        {/* {sendingFeedback && <LoadingSpinnerScreen />} */}
      </ModalWrapper>
    </>
  );
};

SubmitClaimFeedbackModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    feedbackChoice: PropTypes.string.isRequired,
    claimNumber: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => {
  return {
    token: getToken(state)
  };
};

const mapDispatchToProps = dispatch => ({
  orderClaimsDocumentCase: args => {
    dispatch(orderClaimsDocumentCase(args));
  },
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const orderClaimsDocumentCase = ({ claimNumber, rate, comment }) => {
    dispatchProps.orderClaimsDocumentCase({ token });
  };

  return {
    ...dispatchProps,
    ...stateProps,
    ...ownProps,
    orderClaimsDocumentCase
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SubmitClaimFeedbackModal);
