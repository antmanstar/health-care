import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Update Your Password

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  Input,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

class UpdateYourPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
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

  submitModal = e => {
    
  }

  render() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Update your password.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Input
              name="oldPassword"
              type="password"
              placeholder="Enter your current password."
              value={oldPassword}
              onChange={this.handlers.handleChange}
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="Enter a new password."
              value={newPassword}
              onChange={this.handlers.handleChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password."
              value={confirmPassword}
              onChange={this.handlers.handleChange}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" onClick={this.submitModal} />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

UpdateYourPasswordModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default UpdateYourPasswordModal;
