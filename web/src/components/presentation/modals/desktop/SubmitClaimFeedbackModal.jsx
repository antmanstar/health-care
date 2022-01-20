/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import FeedbackSubmission from '../../providers/desktop/FeedbackSubmission';

import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Submit Claim Feedback Modal

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

const { createClaimFeedbackCase } = actions;
const { getToken } = selectors;

const SubmitClaimFeedbackModal = ({ 
  modalData, hideModal, token, createClaimFeedbackCase, sendingFeedback
}) => {
  const [ claimFeedback, setClaimFeedback ] = useState({ feedbackChoice: modalData.feedbackChoice, message: '' })
  const { feedbackChoice, message } = claimFeedback;

 

  const handleChange = event => {
    setClaimFeedback({...claimFeedback, message: event.target.value})
  }

  const submitFeedback = () => {
    createClaimFeedbackCase({
      claimNumber: modalData.claimNumber,
      files: false,
      rate: feedbackChoice,
      comment: message,
      token
    })
  }

  const handleClick = choice => {
    setClaimFeedback({ ...claimFeedback, feedbackChoice: choice })
  }

  return (
    <>
      <Scrim onClick={hideModal} />
      <ModalWrapper className="narrow">
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
          <FormLabel>How could we improve?</FormLabel>
          <ModalTextArea
            name="message"
            type="text"
            placeholder="Type your message here."
            onChange={handleChange}
            value={message}
          />
          { sendingFeedback ? <p>Your feedback has been sent successfully</p> : ''}
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <SmallButton text="Submit Feedback" onClick={submitFeedback}/>
          <SmallButton text="Cancel" negative onClick={hideModal} />
        </ModalButtonsRight>
      </ModalWrapper>
    </>
  );
}

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
  }
};

const mapDispatchToProps = dispatch => ({
  createClaimFeedbackCase: args => {
    dispatch(createClaimFeedbackCase(args));
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SubmitClaimFeedbackModal);



