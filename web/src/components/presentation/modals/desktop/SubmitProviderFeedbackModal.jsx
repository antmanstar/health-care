import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import ProviderProfile from '../../providers/desktop/ProviderProfile';
import FeedbackSubmission from '../../providers/desktop/FeedbackSubmission';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Submit Provider Feedback

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

class SubmitProviderFeedbackModal extends Component {
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
            <ModalTitle>Submit Provider Feedback.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <ProviderProfile
              name={modalData.provider.name}
              distance={modalData.provider.distance}
              practiceName={modalData.provider.practiceName}
              address={modalData.provider.address}
              phone={modalData.provider.phone}
              npiNumber={modalData.provider.npiNumber}
              network={modalData.provider.network}
              specialties={modalData.provider.specialties}
              languages={modalData.provider.languages}
            />
            <FeedbackSubmission
              choice={feedbackChoice}
              type="provider"
              handleClick={this.handlers.handleClick}
            />
            <FormLabel>How could this provider be better?</FormLabel>
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

SubmitProviderFeedbackModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    feedbackChoice: PropTypes.string,
    provider: PropTypes.shape({})
  }).isRequired
};

export default SubmitProviderFeedbackModal;
