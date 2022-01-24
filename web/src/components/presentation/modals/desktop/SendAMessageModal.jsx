import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
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

const {
  createSendAMessageToCareCoordinatorCase,
  sendMessageReset,
  completeSendMessageCase
} = actions;

const { getToken, getSendMessageCase } = selectors;

const FormError = styled.p`
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

class SendAMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.modalData
        ? (props.modalData.claimNumber && `Regarding Claim # ${props.modalData.claimNumber}`) ||
          (props.modalData.requestNumber &&
            `Regarding Support Request # ${props.modalData.requestNumber}`)
        : '',
      message: '',
      errorMessage: null
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, message } = event.target.elements;
    if (title.value.trim().length === 0 && message.value.trim().length === 0) {
      const stateObject = {};
      stateObject.errorMessage = '*Form cannot be blank';
      this.setState(stateObject);
      return;
    }
    if (title.value.trim().length === 0) {
      const stateObject = {};
      stateObject.errorMessage = '*Title cannot be blank';
      this.setState(stateObject);
      return;
    }
    if (message.value.trim().length === 0) {
      const stateObject = {};
      stateObject.errorMessage = '*Message cannot be blank';
      this.setState(stateObject);
      return;
    }
    this.props.createCase(event, this.props.token);
  }

  componentDidMount() {
    this.props.resetCase();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.sendMessageCase &&
      prevProps.sendMessageCase.status === null &&
      this.props.sendMessageCase.status === 'OPEN'
    ) {
      this.props.completeCase(this.props.sendMessageCase.id, this.props.token);
    }
    if (
      prevProps.sendMessageCase &&
      prevProps.sendMessageCase.status === 'OPEN' &&
      this.props.sendMessageCase.status === 'COMPLETE'
    ) {
      this.props.hideModal();
    }
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
          <form onSubmit={this.handlers.handleSubmit}>
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
              {this.state.errorMessage && <FormError>{this.state.errorMessage}</FormError>}
            </ModalBody>
            <ModalSectionDivider />
            <ModalButtonsRight>
              <SmallButton text="Send Message" />
              <SmallButton text="Cancel" negative onClick={hideModal} />
            </ModalButtonsRight>
          </form>
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

const mapStateToProps = state => {
  return {
    token: getToken(state),
    sendMessageCase: getSendMessageCase(state)
  };
};

const mapDispatchToProps = dispatch => ({
  createCase: (event, token) => {
    const { message, title } = event.target.elements;
    dispatch(
      createSendAMessageToCareCoordinatorCase({
        message: message.value,
        title: title.value,
        token
      })
    );
  },
  resetCase: () => {
    dispatch(sendMessageReset());
  },
  completeCase: (caseID, token) => {
    dispatch(completeSendMessageCase({ caseID, token }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SendAMessageModal);
