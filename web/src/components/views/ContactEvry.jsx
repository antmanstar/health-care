import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import MobileButton from '../presentation/shared/mobile/MobileButton';
import MobileSectionHeader from '../presentation/shared/mobile/MobileSectionHeader';
import InfoItemWithIcon from '../presentation/shared/mobile/InfoItemWithIcon';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../presentation/shared/Loader/Loader';
import { Helmet } from 'react-helmet-async';

const { fetchEvryContactInfo } = actions;
const { getToken, getEvryContactInfo } = selectors;

// MOBILE: Support - Contact Evry View

const { MobileListTitle, MobileContentWrapper } = defaultTheme.components;

const Spacer = styled.div`
  padding-top: 48px;
`;

const StyledLink = styled.a`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const ContactEvry = ({ evryContactInfo }) => (
  <>
    <Helmet>
      <title>{reflection.layoutProps.navProps.title} - Evry Health</title>
    </Helmet>
    <Spacer />
    <MobileContentWrapper>
      <MobileListTitle>Contact Customer Support</MobileListTitle>
      {!evryContactInfo ? (
        <Loader />
      ) : (
        <>
          <MobileButton
            icon="phone"
            text="Call Now"
            subtitle={`1-${evryContactInfo.phones[0].phone_number}`}
            arrow={false}
          />
          <StyledLink href={`mailto:${evryContactInfo.support_email.email_address}`}>
            <MobileButton
              icon="mail_outline"
              text="Send an Email"
              subtitle={evryContactInfo.support_email.email_address}
            />
          </StyledLink>
        </>
      )}
      <MobileSectionHeader
        title="Evry Health"
        subtitle="Please add an attention to the appropriate representative / dept for all faxes and physical mail."
      />
      {!evryContactInfo ? (
        <Loader />
      ) : (
        <>
          <InfoItemWithIcon
            icon="location_on"
            text={`${evryContactInfo.mailing_address.address1} ${evryContactInfo.mailing_address.city
              }, ${evryContactInfo.mailing_address.state} ${evryContactInfo.mailing_address.zip}`}
          />
          <InfoItemWithIcon
            icon="print"
            text={`1-${evryContactInfo.phones[2].phone_number} (fax)`}
          />
          <StyledLink href="http://www.evryhealth.com">
            <MobileButton icon="web" text="Visit Website" subtitle="www.evryhealth.com" />
          </StyledLink>
        </>
      )}
    </MobileContentWrapper>
  </>
);

const ContactEvryWithData = withStoreData(
  ContactEvry,
  state => ({
    token: getToken(state),
    evryContactInfo: getEvryContactInfo(state)
  }),
  dispatch => ({
    fetchEvryContactInfo: token => dispatch(fetchEvryContactInfo(token))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchEvryContactInfo(stateProps.token);
    },
    shouldFetch: isEmpty(stateProps.evryContactInfo),
    ...stateProps,
    ...ownProps
  })
);

ContactEvry.propTypes = {
  evryContactInfo: PropTypes.shape({}).isRequired
};

const reflection = {
  component: ContactEvryWithData,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Contact Evry',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/contact-evry'
};

export default ContactEvryWithData;

export { reflection };
