/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
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

class SubmitClaimFeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackChoice: props.modalData.feedbackChoice,
      message: ''
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleClick: this.handleClick.bind(this)
    };
  }

  handleChange = event => {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  };

  handleClick = choice => {
    this.setState({ feedbackChoice: choice });
  };

  render() {
    const { feedbackChoice, message } = this.state;
    const { hideModal, modalData } = this.props;
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
              handleClick={this.handlers.handleClick}
            />
            <FormLabel>How could we improve?</FormLabel>
            <ModalTextArea
              name="message"
              type="text"
              placeholder="Type your message here."
              onChange={this.handlers.handleChange}
              value={message}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Feedback" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

SubmitClaimFeedbackModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    feedbackChoice: PropTypes.string.isRequired,
    claimNumber: PropTypes.string.isRequired
  }).isRequired
};

export default SubmitClaimFeedbackModal;
