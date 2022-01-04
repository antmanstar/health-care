/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import defaultTheme from '../../../../style/themes';
import ProviderProfile from './ProviderProfile';
import Button from '../../shared/desktop/Button';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';

const { setModalData, showModal } = actions;

// Map & Info for the Selected Item in the Provider Lookup Results List
// TODO: Use real provider data and tidy up

const { SectionDivider, FormLabel } = defaultTheme.components;

const Wrapper = styled.div`
  width: 463px;
  margin-bottom: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Map = styled.img`
  height: 292px;
  width: 100%;
  border-radius: 4px 4px 0 0;
  object-fit: cover;
`;

const Padding = styled.div`
  padding: 16px 32px;
`;

const EditedFormLabel = styled(FormLabel)`
  margin-top: 0;
`;

const ButtonWrapper = styled.div`
  padding: 16px 32px;

  button {
    width: 100%;
    font-size: 14px;
    @media ${props => props.theme.device.desktop} {
      font-size: 16px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FeedbackButton = styled.button`
  width: 32%;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: ${props => props.theme.colors.shades.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  img {
    background: #fff;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: all 200 ease-in-out;
  }

  @media ${props => props.theme.device.tablet} {
    border: 1px solid ${props => props.theme.colors.roles.warning};
    box-shadow: none;

    &:hover {
      background: ${props => props.theme.colors.roles.warning};
    }

    &.active {
      background: ${props => props.theme.colors.roles.warning};
    }

    &:first-child {
      border-color: ${props => props.theme.colors.roles.success};
      &:hover {
        background: ${props => props.theme.colors.roles.success};
      }

      &.active {
        background: ${props => props.theme.colors.roles.success};
      }
    }

    &:last-child {
      border-color: ${props => props.theme.colors.roles.danger};
      &:hover {
        background: ${props => props.theme.colors.roles.danger};
      }

      &.active {
        background: ${props => props.theme.colors.roles.danger};
      }
    }
  }
`;

class ProviderLookupSelectedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlers = {
      handleFeedbackClick: this.handleFeedbackClick.bind(this)
    };
  }

  handleFeedbackClick = data => {
    this.props.setModalData(data);
    this.props.showModal('SUBMIT_PROVIDER_FEEDBACK');
  };

  render() {
    return (
      <Wrapper>
        <Map src={images["mock_map"]} />
        <Padding>
          <ProviderProfile
            name="Jacob Jefferson, M.D."
            distance="0.8"
            practiceName="Clearstone Family Medicine"
            address="2310 Spring Valley Rd. Plano, TX 75023"
            phone="469-345-9284"
            npiNumber="123456789"
            network="Evry Premier Network"
            specialties={['Family Medicine']}
            languages={['English']}
          />
        </Padding>
        <Padding>
          <EditedFormLabel>How do you feel about this provider?</EditedFormLabel>
          <Buttons>
            <FeedbackButton
              onClick={() =>
                this.handlers.handleFeedbackClick({
                  feedbackChoice: 'positive',
                  provider: {
                    name: 'Jacob Jefferson, M.D.',
                    distance: '0.8',
                    practiceName: 'Clearstone Family Medicine',
                    address: '2310 Spring Valley Rd. Plano, TX 75023',
                    phone: '469-345-9284',
                    npiNumber: '123456789',
                    network: 'Evry Premier Network',
                    specialties: ['Family Medicine'],
                    languages: ['English']
                  }
                })
              }
            >
              <img src={images["feedback-positive"]} alt="positive response" />
            </FeedbackButton>
            <FeedbackButton
              onClick={() =>
                this.handlers.handleFeedbackClick({
                  feedbackChoice: 'neutral',
                  provider: {
                    name: 'Jacob Jefferson, M.D.',
                    distance: '0.8',
                    practiceName: 'Clearstone Family Medicine',
                    address: '2310 Spring Valley Rd. Plano, TX 75023',
                    phone: '469-345-9284',
                    npiNumber: '123456789',
                    network: 'Evry Premier Network',
                    specialties: ['Family Medicine'],
                    languages: ['English']
                  }
                })
              }
            >
              <img src={images["feedback-neutral"]} alt="neutral response" />
            </FeedbackButton>
            <FeedbackButton
              onClick={() =>
                this.handlers.handleFeedbackClick({
                  feedbackChoice: 'negative',
                  provider: {
                    name: 'Jacob Jefferson, M.D.',
                    distance: '0.8',
                    practiceName: 'Clearstone Family Medicine',
                    address: '2310 Spring Valley Rd. Plano, TX 75023',
                    phone: '469-345-9284',
                    npiNumber: '123456789',
                    network: 'Evry Premier Network',
                    specialties: ['Family Medicine'],
                    languages: ['English']
                  }
                })
              }
            >
              <img src={images["feedback-negative"]} alt="negative response" />
            </FeedbackButton>
          </Buttons>
        </Padding>
        <SectionDivider />
        <ButtonWrapper>
          <Button text="Schedule an Appointment" />
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

ProviderLookupSelectedItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired
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
)(ProviderLookupSelectedItem);
