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

const SmallTitle = styled.div`
  color: ${props => props.theme.colors.shades.blue};
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const EmptyLabel = styled.div`
  margin-top: 15px;
  color: #405565;
  font-weight: 400;
`;

class MyInformationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlers = {
      handleUpdatePersonalClick: this.handleUpdatePersonalClick.bind(this),
      handleContactPreferencesClick: this.handleContactPreferencesClick.bind(this),
      handleAppointRepClick: this.handleAppointRepClick.bind(this)
    };
  }

  handleUpdatePersonalClick() {
    this.props.showModal('UPDATE_PERSONAL_INFORMATION');
  }

  handleContactPreferencesClick() {
    // this.props.setModalData({ contactPreferences: this.props.contactPreferences });
    this.props.showModal('UPDATE_CONTACT_PREFERENCES');
  }

  handleAppointRepClick() {
    this.props.showModal('APPOINT_REPRESENTATIVE');
  }

  render() {
    const {
      name,
      email,
      address,
      phoneNumbers,
      pcps,
      representative,
      contactPreferences
    } = this.props;

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
              <SmallTitleAndButton
                text={String(name)}
                buttonText="Update"
                onClick={this.handlers.handleUpdatePersonalClick}
              />
              <InfoItem text={email} />
              <InfoItem text={String(address) || 'No address'} />
              {phoneNumbers.map(({ phone_type: type, phone_number: number }) => (
                <InfoItem text={`${number} (${type})`} />
              ))}
            </SmallContainer>
            <SmallContainer>
              <SmallTitleAndButton
                text="Contact Preferences"
                buttonText="Update"
                onClick={this.handlers.handleContactPreferencesClick}
              />
              <ContactPreference text="Paperless" toggledOn={contactPreferences.paperless} />
              <ContactPreference text="Receive Emails" toggledOn={contactPreferences.receive_emails} />
              <ContactPreference
                text="Receive Text Messages"
                toggledOn={contactPreferences.receive_text_messages}
              />
              <ContactPreference
                text="Receive Phone Calls"
                toggledOn={contactPreferences.receive_phone_calls}
              />
            </SmallContainer>
          </WrapContainer>
          <WrapContainer>
            <SmallContainer>
              <SmallTitle>Primary Care Physician</SmallTitle>

              {(!pcps || pcps.length === 0) && (
                <>
                  <EmptyLabel>Nothing here yet!</EmptyLabel>
                </>
              )}

              {pcps && pcps.length > 0 && (
                <>
                  <AppointedIndividualName>{`${pcps[0].provider_name}`}</AppointedIndividualName>
                  {/*
                  <InfoItem text="Clearstone Family Medicine, LLC" />
                  */}
                  <InfoItem text={`${(pcps[0].provider_addresses || [])[0]}`} />
                  <InfoItem
                    text={`${((pcps[0].provider_phones || [])[0] || {}).phone_number || ''}`}
                  />
                </>
              )}
            </SmallContainer>
            <SmallContainer>
              <SmallTitleAndButton
                text="Appointed Repesentative"
                buttonText="Update"
                onClick={this.handlers.handleAppointRepClick}
              />
              <AppointedIndividualName>
                {(representative && representative.name) || 'No representative selected'}
              </AppointedIndividualName>
              {representative && (
                <>
                  {/*
                  <InfoItem text="greg.williamson@abclaw.com" />
                  */}
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
              <HelpArticleWrapper>
                <HelpArticleLink text="Learn about Appointed Representatives" />
              </HelpArticleWrapper>
            </SmallContainer>
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
