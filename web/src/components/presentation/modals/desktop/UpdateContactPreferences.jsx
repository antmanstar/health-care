import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import ContactPreference from '../../shared/desktop/ContactPreference';
import SmallButton from '../../shared/desktop/SmallButton';

// MODAL - Update Your Contact Preferences
// TODO: Need intial state from contact pref data .. then need to send new state back

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

class UpdateContactPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperless: false,
      email: false,
      text: false,
      call: false
    };

    this.handlers = {
      generateClickHandler: this.generateClickHandler.bind(this)
    };
  }

  generateClickHandler = key => () => {
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
  };

  render() {
    const { paperless, email, text, call } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Update your contact preferences.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <ContactPreference
              text="Paperless"
              toggledOn={paperless}
              handleClick={this.handlers.generateClickHandler('paperless')}
            />
            <ContactPreference
              text="Receive Emails"
              toggledOn={email}
              handleClick={this.handlers.generateClickHandler('email')}
            />
            <ContactPreference
              text="Receive Text Messages"
              toggledOn={text}
              handleClick={this.handlers.generateClickHandler('text')}
            />
            <ContactPreference
              text="Receive Phone Calls"
              toggledOn={call}
              handleClick={this.handlers.generateClickHandler('call')}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

UpdateContactPreferences.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default UpdateContactPreferences;
