import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import ContactPreference from '../../shared/desktop/ContactPreference';
import SmallButton from '../../shared/desktop/SmallButton';
import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';
import actions from '@evry-member-app/shared/store/actions';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';

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

  submitChanges = () => {
    this.props.handleSubmit({
      token: this.props.token,
      paperless: this.state.paperless,
      receive_emails: this.state.email,
      receive_text_messages: this.state.text,
      receive_phone_calls: this.state.call
    });

    this.props.hideModal();
  }

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
            <SmallButton text="Submit Changes" onClick={this.submitChanges} />
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

const mapStateToProps = state => ({
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: payload => {
    dispatch(actions.updateContactPreferences(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactPreferences);
