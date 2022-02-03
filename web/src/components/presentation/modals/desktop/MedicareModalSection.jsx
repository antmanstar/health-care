import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import CollapsibleModalSection from './CollapsibleModalSection';
import ModalMultipleChoiceQuestion from './ModalMultipleChoiceQuestion';
import DatePicker from '../../shared/desktop/DatePicker';

// MODAL - Medicare Modal Section

const { ModalHalfColumn, SectionDivider, SpaceBetween } = defaultTheme.components;

const Title = styled.p`
  margin: 0;
  padding: 24px 0 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const DateLabel = styled.p`
  margin: 0;
`;

const BigDivider = styled.div`
  border-bottom: 2px solid #C1C6CB;
  margin: -15px 0 15px 0;
`;

const MedicareModalSection = ({ handleChange, data }) => (
  <>
    <CollapsibleModalSection title="Medicare" divided>
      <BigDivider />
      <ModalMultipleChoiceQuestion
        handleAnswerClick={handleChange('eligibility')}
        chosenAnswer={data.eligibility}
        question="What eligibility condition do you meet?"
        answers={['Age', 'Disability', 'ESRD']}
      />
      <SectionDivider />
      <Title>Medicare Coverage</Title>
      <SectionDivider />
      <CollapsibleModalSection title="Part A" textClass="light">
        <SpaceBetween>
          <DateLabel>Part A Effective Date</DateLabel>
          <ModalHalfColumn>
            <DatePicker inputName="partA" changeCallback={handleChange('partA')} />
          </ModalHalfColumn>
        </SpaceBetween>
      </CollapsibleModalSection>
      <SectionDivider />
      <CollapsibleModalSection title="Part B" textClass="light">
        <SpaceBetween>
          <DateLabel>Part B Effective Date</DateLabel>
          <ModalHalfColumn>
            <DatePicker inputName="partB" changeCallback={handleChange('partB')} />
          </ModalHalfColumn>
        </SpaceBetween>
      </CollapsibleModalSection>
      <SectionDivider />
      <CollapsibleModalSection title="Part C" textClass="light">
        <SpaceBetween>
          <DateLabel>Part C Effective Date</DateLabel>
          <ModalHalfColumn>
            <DatePicker inputName="partC" changeCallback={handleChange('partC')} />
          </ModalHalfColumn>
        </SpaceBetween>
      </CollapsibleModalSection>
      <SectionDivider />
      <CollapsibleModalSection title="Part D" textClass="light">
        <SpaceBetween>
          <DateLabel>Part D Effective Date</DateLabel>
          <ModalHalfColumn>
            <DatePicker inputName="partD" changeCallback={handleChange('partD')} />
          </ModalHalfColumn>
        </SpaceBetween>
      </CollapsibleModalSection>
    </CollapsibleModalSection>
  </>
);

MedicareModalSection.propTypes = {
  data: PropTypes.shape({
    medicare: {
      eligibility: PropTypes.string.isRequired,
      partA: PropTypes.string.isRequired,
      partB: PropTypes.string.isRequired,
      partC: PropTypes.string.isRequired,
      partD: PropTypes.string.isRequired
    }
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default MedicareModalSection;
