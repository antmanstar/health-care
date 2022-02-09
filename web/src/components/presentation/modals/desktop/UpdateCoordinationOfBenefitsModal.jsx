import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import MedicareModalSection from './MedicareModalSection';
import OtherInsuranceModalSection from './OtherInsuranceModalSection';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';

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
  max-width: 560px;
  max-height: calc(100vh - 32px);
  overflow-y: scroll;
`;

const Container = styled(SpaceBetween)`
  align-items: normal;
  flex-direction: column;

  &:last-child {
    margin-bottom: -16px;
  }
`;

const Row = styled.div`
  
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

class UpdateCoordinationOfBenefitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicare: {
        checked: false,
        checkedPartA: false,
        checkedPartB: false,
        checkedPartC: false,
        checkedPartD: false,
        eligibility: null,
        partA: null,
        partB: null,
        partC: null,
        partD: null
      },
      otherInsurance: {
        checked: false,
        type: null,
        carrier: null,
        policyNumber: null,
        startDate: null,
        endDate: null
      },
      maxDate: "",
      minDate: ""
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

  handleErrors = (errors) => {
    
  }

  completeCase = (response) => {
    this.props.hideModal();
  }

  convertMedicareEligibilityType(eligibilityType) {
    let parsed = (eligibilityType || "").trim().toLowerCase();

    switch (parsed) {
      case "age": return 1;
      case "disability": return 2;
      case "esrd": return 3;
      default: return undefined;
    }
  }

  convertOtherInsuranceType(insuranceType) {
    let parsed = (insuranceType || "").trim().toLowerCase();

    switch (parsed) {
      case "individual": return 1;
      case "group": return 2;
      default: return undefined;
    }
  }

  isValidDate(date) {
    return date.getTime() === date.getTime() && date.getTime() > 0;
  }

  toYMD(dateString) {
    let date = new Date(dateString);

    return this.isValidDate(date) ? date.toJSON().slice(0, 10) : "";
  }

  handleSubmit = () => {
    const payload = {
      token: this.props.authToken,

      member_cob_id: this.props.modalData.member_cob_id,

      has_medicare: this.state.medicare.checked,
      
      medicare_eligibility_type: this.convertMedicareEligibilityType(this.state.medicare.eligibility),

      medicare_part_a: this.state.medicare.checkedPartA,
      medicare_part_b: this.state.medicare.checkedPartB,
      medicare_part_c: this.state.medicare.checkedPartC,
      medicare_part_d: this.state.medicare.checkedPartD,

      medicare_part_a_effective_date: this.toYMD(this.state.medicare.partA) || null,
      medicare_part_b_effective_date: this.toYMD(this.state.medicare.partB) || null,
      medicare_part_c_effective_date: this.toYMD(this.state.medicare.partC) || null,
      medicare_part_d_effective_date: this.toYMD(this.state.medicare.partD) || null,

      has_other_health_coverage: this.state.otherInsurance.checked,

      other_insurance_type: this.convertOtherInsuranceType(this.state.otherInsurance.type),
      other_insurance_carrier_name: this.state.otherInsurance.carrier,
      other_insurance_policy_number: this.state.otherInsurance.policyNumber,
      other_insurance_coverage_from: this.toYMD(this.state.otherInsurance.startDate) || null,
      other_insurance_coverage_through: this.toYMD(this.state.otherInsurance.endDate) || null
    };

    apis.createCaseCoordinationOfBenefits(payload).then(this.completeCase).catch(this.handleErrors);
  }

  render() {
    const { medicare, otherInsurance, maxDate, minDate } = this.state;
    const { hideModal, locked, modalData } = this.props;

    let whoseName = modalData ? `${modalData.name.first} ${modalData.name.last}'s` : "";

    return (
      <>
        <Scrim onClick={hideModal} />
        <Wrapper>
          <ModalHeader>
            <SpaceBetween>
              <ModalTitle>{`Update ${whoseName} Coordination of Benefits`}</ModalTitle>
            </SpaceBetween>
          </ModalHeader>
          <ModalBody>
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
                <Container>
                  <Row>
                    <MedicareModalSection
                      handleChange={this.handlers.handleMedicareStateChange}
                      data={medicare}
                    />
                  </Row>
                  <Row>
                    <OtherInsuranceModalSection
                      data={otherInsurance}
                      handleChange={this.handlers.handleOtherInsuranceStateChange}
                      handleDateChange={this.handlers.handleOtherInsuranceDateChange}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </Row>
                </Container>
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
              <SmallButton text="Submit Changes" onClick={this.handleSubmit} />
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
