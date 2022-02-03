/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import defaultTheme from '../../../../style/themes';

const { setModalData, showModal } = actions;

const Wrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 8px;
  background: #fafafa;
  border-width: 0 0 0 2px;
  border-style: solid;

  &.on-hold {
    border-color: ${props => props.theme.colors.shades.mediumGray};
    color: ${props => props.theme.colors.shades.mediumGray};
  }
  &.escalated {
    border-color: ${props => props.theme.colors.roles.actionRequired};
    color: ${props => props.theme.colors.roles.actionRequired};
  }
  &.submitted,
  &.created {
    border-color: ${props => props.theme.colors.roles.pending};
    color: ${props => props.theme.colors.roles.pending};
  }
  &.closed,
  &.completed {
    border-color: ${props => props.theme.colors.roles.success};
    color: ${props => props.theme.colors.roles.success};
  }
`;

const SystemNote = styled.span`
  margin-right: 16px;
  color: ${props => props.theme.colors.roles.actionRequired};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;

  @media ${props => props.theme.device.tabletXL} {
    margin-right: 32px;
  }
`;

// const SupportSummary = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 16px;
//   justify-content: center;
//   flex-wrap: wrap;
//   flex-direction: column;
//   @media ${props => props.theme.device.tablet} {
//     flex-direction: row;
//   }
// `;
const SupportSummary = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;
const TextPortion = styled.div`
  flex-basis: 100%;
  @media ${defaultTheme.device.tablet} {
    flex-grow: 2;
    flex-basis: 0%;
  }
`;
const InnerContent = styled.div`
  /* &:first-child {
    width: auto;
    margin-right: 24px;
    @media ${props => props.theme.device.desktop} {
      margin-right: 32px;
    }
  }

  &.middle-content {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */

  /* &:last-child {
    margin-top: 10px;

    @media ${props => props.theme.device.tablet} {
      margin-left: auto;
      margin-top: 0px;
    }
  } */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 8px;
  @media ${defaultTheme.device.tablet}{
    margin-top: 0px
  }
  /* @media ${props => props.theme.device.tablet} {
    justify-content: center;
  } */
`;

const Text = styled.h4`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};
  font-size: 10px;
  @media ${defaultTheme.device.mobile} {
    font-size: 16px;
  }
  @media ${defaultTheme.device.desktop} {
    font-size: 18px;
  }

  &.bold {
    font-weight: 500;
  }

  &.title {
    text-align: center;
    @media ${defaultTheme.device.tablet} {
      flex-grow: 2;
      margin-left: 24px;
      text-align: left;
    }
  }
`;
const StatusText = styled.span`
  margin-right: 0px;
  font-size: 10px;
  font-weight: 700;
  @media ${defaultTheme.device.tablet} {
    margin-right: 16px;
    font-size: 14px;
  }
`;

const Number = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.gray};
`;

class SupportRequest extends Component {
  constructor(props) {
    super(props);

    this.handlers = {
      handleContactCustomerSupportClick: this.handleContactCustomerSupportClick.bind(this)
    };
  }

  handleContactCustomerSupportClick = data => {
    this.props.setModalData(data);
    this.props.showModal('SUPPORT_REQUEST');
  };

  render() {
    const { status, date, title, requestNumber, caseType } = this.props;
    let systemNote;

    //submitted/new case, on hold, escalated, closed
    if (status === 'on-hold') {
      systemNote = 'on hold';
    } else {
      systemNote = '';
    }

    let statusText;
    switch (status) {
      case 'on-hold':
        statusText = 'On Hold';
        break;
      case 'submitted':
        statusText = 'Submitted';
        break;
      case 'created':
        statusText = 'Created';
        break;
      case 'escalated':
        statusText = 'Escalated';
        break;
      case 'closed':
        statusText = 'Closed';
        break;
      case 'completed':
        statusText = 'Completed';
        break;
      default:
        statusText = '';
    }

    return (
      <Wrapper className={status}>
        <SupportSummary>
          <TextPortion>
            {/* <InnerContent>
              <Text>{date}</Text>
            </InnerContent>
            <InnerContent className="middle-content">
              <div>
                <Text className="bold">{title}</Text>
                <Number>{`Request # ${requestNumber}`}</Number>
              </div>
              {systemNote && <SystemNote className="support-system-note">{systemNote}</SystemNote>}
            </InnerContent>
            <InnerContent>
              <StatusText className={status}>{statusText.toUpperCase()}</StatusText>
            </InnerContent> */}
            <InnerContent>
              <Text>{date}</Text>
              <Text className="bold title">{title ? title : caseType}</Text>
              {/* {systemNote && <SystemNote className="support-system-note">{systemNote}</SystemNote>} */}
              <StatusText className={status}>{statusText.toUpperCase()}</StatusText>
            </InnerContent>
          </TextPortion>
          <InnerContent>
            <SmallButton
              text="Contact Customer Support"
              onClick={() =>
                this.handlers.handleContactCustomerSupportClick({
                  requestNumber,
                  title,
                  status
                })
              }
            />
          </InnerContent>
        </SupportSummary>
      </Wrapper>
    );
  }
}

SupportRequest.propTypes = {
  status: PropTypes.oneOf([
    'completed',
    'pending',
    'actionRequired',
    'created',
    'on-hold',
    'escalated',
    'submitted'
  ]).isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  requestNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showModal: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired
};

SupportRequest.defaultProps = {};

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
)(SupportRequest);
