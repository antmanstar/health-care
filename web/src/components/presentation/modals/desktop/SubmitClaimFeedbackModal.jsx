/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import FeedbackSubmission from '../../providers/desktop/FeedbackSubmission';

import SmallButton from '../../shared/desktop/SmallButton';
import { useEffect } from 'react';

const { setModalData, showModal, clearSendingFeedback } = actions;

// MODAL - Submit Claim Feedback Modal

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle
} = defaultTheme.components;

const { createClaimFeedbackCase } = actions;
const { getToken } = selectors;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 95%;
  padding: 48px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 20px 30px rgb(0 0 0 / 15%);
  box-sizing: border-box;
  z-index: 100;
  @media (min-width: 760px) {
    width: 467px;
  }
`;

const ModalTextArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 8px;
  padding: 0 16px;
  line-height: 48px;
  font-size: 16px;
  font-weight: 300;
  background: #f4f4f4;
  color: rgba(149, 149, 149, 1);
  font-family: 'Roboto';
  border: 1px solid transparent;
  border-radius: 4px;
  margin-top: 16px;
`;

const FormLabel = styled.div`
  margin-top: 32px;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 18.75px;
  color: rgba(0, 38, 58, 1);
`;

const SubmitClaimFeedbackModal = ({
  modalData,
  showModal,
  hideModal,
  token,
  createClaimFeedbackCase,
  sendingFeedback
}) => {
  const [claimFeedback, setClaimFeedback] = useState({
    feedbackChoice: modalData.feedbackChoice,
    message: ''
  });
  const { feedbackChoice, message } = claimFeedback;

  useEffect(() => {
    if (sendingFeedback) {
      hideModal();
      showModal('SUBMIT_CLAIM_FEEDBACK_SUCCESS');
    }
  }, [sendingFeedback]);

  const handleChange = event => {
    setClaimFeedback({ ...claimFeedback, message: event.target.value });
  };

  const submitFeedback = () => {
    createClaimFeedbackCase({
      claimNumber: modalData.claimNumber,
      files: false,
      rate: feedbackChoice,
      comment: message,
      token
    });
  };

  const handleClick = choice => {
    setClaimFeedback({ ...claimFeedback, feedbackChoice: choice });
  };

  return (
    <>
      <Scrim onClick={hideModal} />
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>Submit Claim Feedback.</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <FeedbackSubmission
            choice={feedbackChoice}
            type="claim"
            claimNumber={modalData.claimNumber}
            handleClick={handleClick}
          />
          <FormLabel>How could this claim be better?</FormLabel>
          <ModalTextArea
            name="message"
            type="text"
            placeholder="Type your message here."
            onChange={handleChange}
            value={message}
          />
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <SmallButton text="Submit" onClick={submitFeedback} />
          <SmallButton text="Cancel" negative onClick={hideModal} />
        </ModalButtonsRight>
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
    sendingFeedback: state.user.sendingFeedback,
    token: getToken(state)
  };
};

const mapDispatchToProps = dispatch => ({
  createClaimFeedbackCase: args => {
    dispatch(createClaimFeedbackCase(args));
  },
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const createClaimFeedbackCase = ({ claimNumber, rate, comment }) => {
    dispatchProps.createClaimFeedbackCase({ claimNumber, rate, comment, token });
  };

  return {
    ...dispatchProps,
    ...stateProps,
    ...ownProps,
    createClaimFeedbackCase
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SubmitClaimFeedbackModal);
