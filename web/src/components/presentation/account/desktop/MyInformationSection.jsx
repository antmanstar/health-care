/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SmallTitleAndButton from '../../shared/desktop/SmallTitleAndButton';
import InfoItem from '../../shared/desktop/InfoItem';
import ContactPreference from '../../shared/desktop/ContactPreference';
import HelpArticleLink from '../../shared/desktop/HelpArticleLink';
import actions from '@evry-member-app/shared/store/actions';
import Loader from '../../shared/Loader/Loader';

const { setModalData, showModal } = actions;

// This is the My Information Section from the Account Settings View

const { SectionBackground, Container, SectionDivider, TwoColumnRow } = defaultTheme.components;

const SmallContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
  @media ${props => props.theme.device.tabletXL} {
    width: 48%;
    margin-bottom: 0;
  }
`;

const AppointedIndividualName = styled.h5`
  font-size: 16px;
  font-weight: 500;
  margin: 24px 0 16px 0;
  ${props => props.theme.colors.shades.blue}
`;

const HelpArticleWrapper = styled.div`
  margin-top: 16px;
`;

const WrapContainer = styled(TwoColumnRow)`
  flex-wrap: wrap;
  margin-bottom: 0;
  @media ${props => props.theme.device.tabletXL} {
    flex-wrap: nowrap;
    margin-bottom: 32px;
  }
`;

const SmallTitle = styled.h3`
  color: ${props => props.theme.colors.shades.blue};
  align-items: center;
  margin-bottom: 16px;
  font-weight: 700;
  margin: 0;

  @media not ${defaultTheme.device.mobile} {
    font-size: 16px;
  }

  @media ${defaultTheme.device.mobile} {
    font-size: 24px;
  }
`;

const EmptyLabel = styled.div`
  margin-top: 15px;
  color: #405565;
  font-weight: 400;
`;

const FadedInfoItem = styled.div`
  line-height: 48px;
  font-size: 16px;
  font-weight: 300;
  color: #ccc;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

class MyInformationSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleUpdatePersonalClick = () => {
    this.props.showModal('UPDATE_PERSONAL_INFORMATION');
  }

  handleContactPreferencesClick = () => {
    // this.props.setModalData({ contactPreferences: this.props.contactPreferences });
    this.props.showModal('UPDATE_CONTACT_PREFERENCES');
  }

  handleAppointRepClick = () => {
    this.props.showModal('APPOINT_REPRESENTATIVE');
  }

  handleUpdateEmailClick = () => {
    this.props.showModal('UPDATE_EMAIL');
  }

  isLoading = () => {
    return !this.props.contactPreferences.hasOwnProperty("paperless");
  }

  renderContactPreferences = () => {
    let contactPrefs = this.props.contactPreferences;

    if (this.isLoading()) {
      return <Loader />;
    }

    return (
      <>
        <ContactPreference text="Paperless" toggledOn={contactPrefs.paperless} />
        <ContactPreference text="Receive Emails" toggledOn={contactPrefs.receive_emails} />
        <ContactPreference text="Receive Text Messages" toggledOn={contactPrefs.receive_text_messages} />
        <ContactPreference text="Receive Phone Calls" toggledOn={contactPrefs.receive_phone_calls} />
      </>
    )
  }

  extractPhoneNumber = (array, phoneType) => {
    const numbers = array.filter(item => item.phone_type === phoneType);

    return numbers[0] !== undefined ? numbers[0].phone_number : undefined;
  };

  renderPhoneNumber = (array, phoneType, backup) => {
    let number = this.extractPhoneNumber(array, phoneType);

    if (number) {
      return <InfoItem text={`${number} (${phoneType})`} />;
    } else {
      return <FadedInfoItem>{backup}</FadedInfoItem>;
    }
  }

  renderInformation = () => {
    const address = this.props?.address;
    const phoneNumbers = this.props?.accountInfo?.phones || [];

    if (this.isLoading()) {
      return <Loader />;
    }

    return (
      <>
        <InfoItem text={String(address) || 'No address'} />

        {this.renderPhoneNumber(phoneNumbers, "Cell Phone", "You have not entered a cell phone number.")}
        {this.renderPhoneNumber(phoneNumbers, "Work Phone", "You have not entered a work phone number.")}
        {this.renderPhoneNumber(phoneNumbers, "Home Phone", "You have not entered a home phone number.")}
      </>
    )
  }

  renderPCPs = () => {
    const pcps = this.props.pcps;

    if (this.isLoading()) {
      return <Loader />;
    }

    return (
      <>
        {(!pcps || pcps.length === 0) && (
          <>
            <EmptyLabel>No Primary Care Physician Selected.</EmptyLabel>
          </>
        )}

        {pcps && pcps.length > 0 && (
          <>
            <AppointedIndividualName>{`${pcps[0].provider_name}`}</AppointedIndividualName>
            <InfoItem text={`${(pcps[0].provider_addresses || [])[0]}`} />
            <InfoItem
              text={`${((pcps[0].provider_phones || [])[0] || {}).phone_number || ''}`}
            />
          </>
        )}
      </>
    )
  }

  renderRepresentative = () => {
    const representative = this.props.representative;

    if (this.isLoading()) {
      return <Loader />;
    }

    return (
      <>
        <AppointedIndividualName>
          {(representative && representative.name) || 'No representative selected'}
        </AppointedIndividualName>
        {representative && (
          <>
            <InfoItem text={representative.address} />
            <InfoItem
              text={
                representative.phones &&
                representative.phones.length > 0 &&
                representative.phones[0].phone_number
              }
            />
          </>
        )}
      </>
    )
  }

  renderEmail = () => {
    const email = this.props?.email;

    if (this.isLoading()) {
      return <Loader />;
    }

    return (
      <InfoItem text={email} />
    );
  }

  render() {
    return (
      <SectionBackground>
        <Container>
          <SectionHeaderWithIcon
            icon="account_circle"
            title="My Information"
            subTitle="Update your personal info, contact preferences, or appointed individuals."
          />
        </Container>
        <SectionDivider />
        <Container>
          <WrapContainer>
            <SmallContainer>
              <SmallTitleAndButton text={String(this.props.name)} buttonText="Update" onClick={this.handleUpdatePersonalClick} />
              {this.renderInformation()}
            </SmallContainer>
            <SmallContainer>
              <SmallTitleAndButton text="Contact Preferences" buttonText="Update" onClick={this.handleContactPreferencesClick} />
              {this.renderContactPreferences()}
            </SmallContainer>
          </WrapContainer>
          <WrapContainer>
            <SmallContainer>
              <SmallTitle>Primary Care Physician</SmallTitle>
              {this.renderPCPs()}
            </SmallContainer>
            <SmallContainer>
              <SmallTitleAndButton text="Appointed Repesentative" buttonText="Update" onClick={this.handleAppointRepClick} />
              {this.renderRepresentative()}
              <HelpArticleWrapper>
                <HelpArticleLink text="Learn about Appointed Representatives" />
              </HelpArticleWrapper>
            </SmallContainer>
          </WrapContainer>
          <WrapContainer>
            <SmallContainer>
              <SmallTitleAndButton text="Update Email" buttonText="Update" onClick={this.handleUpdateEmailClick} />
              {this.renderEmail()}
            </SmallContainer>
          </WrapContainer>
          <WrapContainer>
            <SmallContainer></SmallContainer>        
          </WrapContainer>
        </Container>
      </SectionBackground>
    );
  }
}

MyInformationSection.propTypes = {
  address: PropTypes.shape({
    line1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postal: PropTypes.string
  }),
  email: PropTypes.string,
  name: PropTypes.shape({
    first: PropTypes.string,
    middle: PropTypes.string,
    last: PropTypes.string
  }),
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      type: PropTypes.string
    })
  ),
  pcps: PropTypes.arrayOf(PropTypes.shape({})),
  representative: PropTypes.shape({}),
  contactPreferences: PropTypes.shape({}),
  showModal: PropTypes.func.isRequired
};

MyInformationSection.defaultProps = {
  address: {},
  email: '',
  name: {},
  phoneNumbers: [],
  pcps: [],
  representative: {},
  contactPreferences: {}
};

const mapDispatchToProps = dispatch => ({
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MyInformationSection);
