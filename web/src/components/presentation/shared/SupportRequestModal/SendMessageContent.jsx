import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import MobileActionButton from '../mobile/MobileActionButton';
import SubmissionResponse from './SubmissionResponse';

const {
  MobileModalFlexColumn,
  MobileFixedBottomButton,
  MobileModalDivider,
  MobileModalTitleWrapper,
  MobileModalTitle,
  MobileInput,
  MobileModalListTitle,
  MobileTextArea
} = defaultTheme.components;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  padding: 0 0 16px;
`;

class SendMessageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      submitted: false,
      submissionStatus: 'pending',
      title: '',
      message: ''
    };
  }

  handleChange = event => {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  };

  checkCanSubmit = () => {
    const { title, message } = this.state;
    if (title === '' || message === '') {
      return;
    }
    this.setState({ canSubmit: true });
  };

  handleSubmit = () => {
    // TODO: Send submission to API, display pending Submission Response Component
    // TODO: When submission response is received, display success/failure Submission Response Component

    // Placeholder
    this.setState({ submitted: true, submissionStatus: 'success' });
  };

  render() {
    const { canSubmit, submitted, submissionStatus, title, message } = this.state;
    const { handleClose } = this.props;

    !canSubmit && this.checkCanSubmit();

    return (
      <>
        {!submitted ? (
          <MobileModalFlexColumn>
            <MobileModalTitleWrapper>
              <MobileModalTitle>Send us a message.</MobileModalTitle>
              <i className="material-icons">chat</i>
            </MobileModalTitleWrapper>
            <MobileModalDivider />
            <MobileModalListTitle>Tap on field to edit it.</MobileModalListTitle>
            <MobileInput
              name="title"
              placeholder="Add a message title."
              value={title}
              onChange={this.handleChange}
            />
            <MobileTextArea
              name="message"
              placeholder="Type your message here."
              rows="10"
              value={message}
              onChange={this.handleChange}
            />
            {canSubmit ? (
              <StyledMobileFixedBottomButton>
                <MobileActionButton
                  text="Submit Request"
                  type="inverse"
                  onClick={this.handleSubmit}
                />
                <MobileActionButton
                  text="Cancel"
                  type="negative-transparent"
                  onClick={handleClose}
                />
              </StyledMobileFixedBottomButton>
            ) : (
              <StyledMobileFixedBottomButton>
                <MobileActionButton text="Cancel" type="negative" onClick={handleClose} />
              </StyledMobileFixedBottomButton>
            )}
          </MobileModalFlexColumn>
        ) : (
          <SubmissionResponse status={submissionStatus} handleClose={handleClose} />
        )}
      </>
    );
  }
}

SendMessageContent.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default SendMessageContent;
