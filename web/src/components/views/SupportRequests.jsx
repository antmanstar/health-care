import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import SearchAndFilterBar from '../presentation/shared/desktop/SearchAndFilterBar';
import ListSupportRequest from '../presentation/support/mobile/ListSupportRequest';
import actions from '@evry-member-app/shared/store/actions';

const { openNewSupportRequestModal } = actions;

// MOBILE: Support Requests List
// TODO: Pull in support requests from API (WAITING on Jong)
// TODO: Wire up routes to individual support requests (PREREQUISITE: Jong's endpoints)
// TODO: Wite up search / filters (PREREQUISITE: Jong's endpoints)
// TODO: New button should go to New Support Request Flow (PREREQUISITE: Jong's endpoints)

const { MobileContentWrapper, MobileListTitle, TrimmedHeader } = defaultTheme.components;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const ColoredTrimmedHeader = styled(TrimmedHeader)`
  margin-bottom: -40px;
  background: ${props => props.theme.gradients.main};
`;

const Spacer = styled.div`
  padding-top: 128px;
`;

const InstructionWrapper = styled.div`
  h2 {
    margin: 8px 0;
  }

  p {
    margin: 0 0 16px;
    font-size: 14px;
    color: ${props => props.theme.colors.shades.gray};
  }
`;

const StyledLink = styled(RouterLink)`
  display: block;
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class SupportRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Remove when real data is available
    const requests = [
      {
        title: 'Information Request',
        requestNumber: '1234567',
        dateSent: '04/18/2018',
        status: 'action required'
      },
      {
        title: 'Schedule Appointment',
        requestNumber: '1234565',
        dateSent: '04/13/2018',
        status: 'pending'
      },
      {
        title: 'Order Cupcakes',
        requestNumber: '1234563',
        dateSent: '04/01/2018',
        status: 'completed'
      }
    ];

    return (
      <>
        <FixedHeader>
          <ColoredTrimmedHeader />
          <MobileContentWrapper>
            <SearchAndFilterBar placeholder="Search Requests" bigShadow />
          </MobileContentWrapper>
        </FixedHeader>
        <Spacer />
        <MobileContentWrapper>
          <InstructionWrapper>
            <p>Tap on a request to follow up.</p>
          </InstructionWrapper>
          {requests.map(request => (
            <StyledLink
              to={{
                pathname: '/support-request',
                state: { request }
              }}
            >
              <ListSupportRequest
                title={request.title}
                requestNumber={request.requestNumber}
                dateSent={request.dateSent}
                status={request.status}
              />
            </StyledLink>
          ))}
        </MobileContentWrapper>
      </>
    );
  }
}

SupportRequests.propTypes = {};

SupportRequests.defaultProps = {};

const reflection = {
  component: SupportRequests,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      right: 'support',
      title: 'Support Requests',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/support-requests',
  forAuthorized: true
};

export default SupportRequests;

export { reflection };
