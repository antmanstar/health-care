import React, { Component } from 'react';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import MobileSectionHeader from '../presentation/shared/mobile/MobileSectionHeader';
import PreferenceToggle from '../presentation/shared/mobile/PreferenceToggle';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';
import { Helmet } from 'react-helmet-async';

// MOBILE: Contact Preferences
// TODO: Submit new preferences with "Save Changes" button (Paul; endpoint IS in place)

const { MobileContentWrapper, MobileFixedBottomButton } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 48px;
`;

class ContactPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperless: true,
      email: true,
      text: true,
      phone: true,
      changesMade: false
    };
  }

  generateClickHandler = key => () => {
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
    this.setState({ changesMade: true });
  };

  render() {
    const { paperless, email, text, phone, changesMade } = this.state;

    return (
      <>
        <Helmet>
          <title>{reflection.layoutProps.navProps.title} - Evry Health</title>
        </Helmet>
        <EditedMobileContentWrapper>
          <MobileSectionHeader subtitle="Tap to toggle preferences." />
          <PreferenceToggle
            toggleOn={paperless}
            text="Paperless Contact"
            handleClick={this.generateClickHandler('paperless')}
          />
          <PreferenceToggle
            toggleOn={email}
            text="Receive Emails"
            handleClick={this.generateClickHandler('email')}
          />
          <PreferenceToggle
            toggleOn={text}
            text="Receive Text Messages"
            handleClick={this.generateClickHandler('text')}
          />
          <PreferenceToggle
            toggleOn={phone}
            text="Receive Phone Calls"
            handleClick={this.generateClickHandler('phone')}
          />
        </EditedMobileContentWrapper>
        {changesMade && (
          <MobileFixedBottomButton>
            <MobileActionButton text="Save Changes" type="action" />
          </MobileFixedBottomButton>
        )}
      </>
    );
  }
}

const reflection = {
  component: ContactPreferences,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Contact Preferences',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/contact-preferences'
};

export default ContactPreferences;

export { reflection };
