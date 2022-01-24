/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';

const { setModalData, showModal } = actions;

const Wrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 8px;
  background: #fafafa;
  border-width: 0 0 0 2px;
  border-style: solid;
  &.on-hold {
    border-color: ${props => props.theme.colors.roles.actionRequired};
  }
  &.submitted,
  &.created,
  &.escalated {
    border-color: ${props => props.theme.colors.roles.pending};
  }
  &.closed {
    border-color: ${props => props.theme.colors.roles.success};
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

const SupportSummary = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const InnerContent = styled.div`
  &:first-child {
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
  }

  &:last-child {
    margin-top: 10px;
    @media (min-width: 550px) {
      margin-left: auto;
      margin-top: 0px;
    }
  }
`;

const Text = styled.h4`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};
  font-size: 16px;

  @media ${props => props.theme.device.desktop} {
    font-size: 18px;
  }

  &.bold {
    font-weight: 500;
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
    const { status, date, title, requestNumber } = this.props;
    let systemNote;

    if (status === 'on-hold') {
      systemNote = 'on hold';
    } else {
      systemNote = '';
    }
    return (
      <Wrapper className={status}>
        <SupportSummary>
          <InnerContent>
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
  status: PropTypes.oneOf(['completed', 'pending', 'actionRequired']).isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  requestNumber: PropTypes.string.isRequired,
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
