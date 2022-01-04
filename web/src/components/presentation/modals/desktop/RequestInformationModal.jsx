import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Request Information

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

class RequestInformationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
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
    const { type, message } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="extra-narrow">
          <ModalHeader>
            <ModalTitle>Request Information.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Select
              name="type"
              placeholder="Information Type"
              value={type}
              onChange={this.handlers.handleChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Select>
            <ModalTextArea
              name="message"
              type="text"
              placeholder="Type a message here."
              value={message}
              onChange={this.handlers.handleChange}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Request" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

RequestInformationModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default RequestInformationModal;
