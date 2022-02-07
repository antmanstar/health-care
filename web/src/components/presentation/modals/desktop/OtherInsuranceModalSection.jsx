import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import CollapsibleModalSection from './CollapsibleModalSection';
import ModalMultipleChoiceQuestion from './ModalMultipleChoiceQuestion';
import DatePicker from '../../shared/desktop/DatePicker';

// MODAL - Other Insurance Modal Section

const { Input, ModalHalfColumn, SectionDivider, SpaceBetween } = defaultTheme.components;

const Title = styled.p`
  margin: 0;
  padding: 24px 0 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const DatesContainer = styled(SpaceBetween)`
  padding: 0 0 16px;
`;

const BigDivider = styled.div`
  border-bottom: 2px solid #C1C6CB;
  margin: -15px 0 15px 0;
`;

const OtherInsuranceModalSection = ({ handleChange, handleDateChange, data, minDate, maxDate }) => (
  <>
    <CollapsibleModalSection onChange={handleChange('checked')} visible={data.checked} title="Other Health Coverage" divided>
      <BigDivider />
      <ModalMultipleChoiceQuestion
        handleAnswerClick={handleChange('type')}
        chosenAnswer={data.type}
        question="Type"
        answers={['Individual', 'Group']}
      />
      <SectionDivider />
      <Title>Insurance Carrier</Title>
      <Input
        name="carrier"
        onChange={event => handleChange('carrier')(event.target.value)}
        placeholder="Who do you have other insurance with?"
        type="text"
        value={data.carrier}
      />
      <Input
        name="policyNumber"
        onChange={event => handleChange('policyNumber')(event.target.value)}
        placeholder="What was your policy number?"
        type="text"
        value={data.policyNumber}
      />
      <Title>Coverage Dates</Title>
      <DatesContainer>
        <ModalHalfColumn>
          <DatePicker
            inputName="startDate"
            changeCallback={handleDateChange('startDate')}
            placeholder="Choose Start Date"
            minDateChoice="Jan 1, 1900"
            maxDateChoice={maxDate}
          />
        </ModalHalfColumn>
        <ModalHalfColumn>
          <DatePicker
            inputName="endDate"
            changeCallback={handleDateChange('endDate')}
            placeholder="Choose End Date"
            minDateChoice={minDate}
          />
        </ModalHalfColumn>
      </DatesContainer>
    </CollapsibleModalSection>
  </>
);

OtherInsuranceModalSection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    type: PropTypes.string,
    carrier: PropTypes.string,
    policyNumber: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }).isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired
};

export default OtherInsuranceModalSection;
