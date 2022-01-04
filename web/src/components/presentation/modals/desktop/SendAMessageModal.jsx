import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Send a Message

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  Input,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

class SendAMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.modalData
        ? (props.modalData.claimNumber && `Regarding Claim # ${props.modalData.claimNumber}`) ||
          (props.modalData.requestNumber &&
            `Regarding Support Request # ${props.modalData.requestNumber}`)
        : '',
      message: ''
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  render() {
    const { title, message } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Send a message.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Input
              name="title"
              type="text"
              placeholder="Add a title to your message."
              value={title}
              onChange={this.handlers.handleChange}
            />
            <ModalTextArea
              name="message"
              type="text"
              placeholder="Type your message here."
              value={message}
              onChange={this.handlers.handleChange}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Send Message" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

SendAMessageModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    claimNumber: PropTypes.string,
    requestNumber: PropTypes.string
  })
};

SendAMessageModal.defaultProps = {
  modalData: null
};

export default SendAMessageModal;
