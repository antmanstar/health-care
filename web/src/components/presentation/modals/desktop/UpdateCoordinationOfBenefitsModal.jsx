import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import MedicareModalSection from './MedicareModalSection';
import OtherInsuranceModalSection from './OtherInsuranceModalSection';

// MODAL - Update Coordination of Benefits

const {
  Scrim,
  ModalBody,
  ModalButtonsCenter,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const Wrapper = styled(ModalWrapper)`
  max-width: 993px;
  max-height: calc(100vh - 32px);
  overflow-y: scroll;
`;

const FormSpaceBetween = styled(SpaceBetween)`
  align-items: flex-start;

  &:last-child {
    margin-bottom: -16px;
  }
`;

const Column = styled.div`
  min-width: 432px;

  &:first-child {
    margin-right: 16px;
  }
  &:last-child {
    margin-left: 16px;
  }
`;

const VerticalDivider = styled.div`
  align-self: stretch;
  width: 1px;
  min-height: 100%;
  background: ${props => props.theme.colors.shades.nearlyWhite};
`;

const LockedNote = styled.div`
  color: ${props => props.theme.colors.roles.danger};

  div {
    display: flex;
    align-items: center;

    > * {
      margin: 0;
    }

    i {
      margin-right: 8px;
    }

    h3 {
      font-weight: 500;
    }
  }

  p {
    color: ${props => props.theme.colors.shades.darkGray};
  }
`;

const Notice = styled.p`
  span {
    font-weight: 500;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

class UpdateCoordinationOfBenefitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicare: {
        eligibility: null,
        partA: null,
        partB: null,
        partC: null,
        partD: null
      },
      otherInsurance: {
        type: null,
        carrier: null,
        policyNumber: null,
        startDate: null,
        endDate: null
      },
      maxDate: null,
      minDate: null
    };

    this.handlers = {
      handleMedicareStateChange: this.handleMedicareStateChange.bind(this),
      handleOtherInsuranceStateChange: this.handleOtherInsuranceStateChange.bind(this),
      handleOtherInsuranceDateChange: this.handleOtherInsuranceDateChange.bind(this)
    };
  }

  handleMedicareStateChange = key => value => {
    const { medicare } = this.state;
    medicare[key] = value;
    this.setState({ medicare });
  };

  handleOtherInsuranceStateChange = key => value => {
    const { otherInsurance } = this.state;
    otherInsurance[key] = value;
    this.setState({ otherInsurance });
  };

  handleOtherInsuranceDateChange = key => value => {
    const { otherInsurance } = this.state;
    otherInsurance[key] = Moment(value).format('MMM D, YYYY');

    if (key === 'startDate') {
      this.setState({ minDate: value });
    } else if (key === 'endDate') {
      this.setState({ maxDate: value });
    }

    this.setState({ otherInsurance });
  };

  render() {
    const { medicare, otherInsurance, maxDate, minDate } = this.state;
    const { hideModal, locked, modalData } = this.props;
    return (
      <>
        <Scrim onClick={hideModal} />
        <Wrapper>
          <ModalHeader>
            <SpaceBetween>
              <ModalTitle>Update Coordination of Benefits</ModalTitle>
            </SpaceBetween>
          </ModalHeader>
          <ModalBody>
            {modalData && (
              <Notice>
                {`You are updating info for `}
                <span>{`${modalData.name.first} ${modalData.name.last}`}</span>
                {`.`}
              </Notice>
            )}
            {locked ? (
              <LockedNote>
                <div>
                  <i className="material-icons">info_outline</i>
                  <h3>Unable to make changes at this time.</h3>
                </div>
                <p>
                  A recent change request has been submitted. Please check back later or call
                  1-800-555-1234 with any questions or concerns.
                </p>
              </LockedNote>
            ) : (
              <>
                <FormSpaceBetween>
                  <Column>
                    <MedicareModalSection
                      handleChange={this.handlers.handleMedicareStateChange}
                      data={medicare}
                    />
                  </Column>
                  <VerticalDivider />
                  <Column>
                    <OtherInsuranceModalSection
                      data={otherInsurance}
                      handleChange={this.handlers.handleOtherInsuranceStateChange}
                      handleDateChange={this.handlers.handleOtherInsuranceDateChange}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </Column>
                </FormSpaceBetween>
              </>
            )}
          </ModalBody>
          <ModalSectionDivider />
          {locked ? (
            <ModalButtonsCenter>
              <SmallButton text="Cancel" negative onClick={hideModal} />
            </ModalButtonsCenter>
          ) : (
            <ModalButtonsRight>
              <SmallButton text="Submit Changes" />
              <SmallButton text="Cancel" negative onClick={hideModal} />
            </ModalButtonsRight>
          )}
        </Wrapper>
      </>
    );
  }
}

UpdateCoordinationOfBenefitsModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    name: PropTypes.shape({})
  }).isRequired,
  locked: PropTypes.bool
};

UpdateCoordinationOfBenefitsModal.defaultProps = {
  locked: false
};

export default UpdateCoordinationOfBenefitsModal;
