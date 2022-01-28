import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// Benefit Breakdown on Claim Entries in the "ClaimsHistorySection"

const { SpaceBetween, SectionDivider } = defaultTheme.components;

const Bold = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props =>
    props.green ? props.theme.colors.roles.success : props.theme.colors.shades.black};
`;

const FlexLeft = styled.div`
  display: flex;
  align-items: center;

  h3 {
    margin-right: 8px;
  }
`;

const Regular = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};
`;

const Padding16 = styled.div`
  padding: 16px;
`;

const BlueBackground = styled.div`
  background: ${props => props.theme.gradients.main};
  border-radius: 0 0 4px 4px;

  h3 {
    color: ${props => props.theme.colors.shades.white};
    font-weight: 500;
  }
`;

const BenefitBreakdown = ({ totalBilled, discounts, payment, owed }) => (
  <>
    <Padding16>
      <SpaceBetween>
        <Bold>Total Billed</Bold>
        <Bold>{`$${totalBilled}`}</Bold>
      </SpaceBetween>
    </Padding16>
    <SectionDivider />
    <Padding16>
      <SpaceBetween>
        <FlexLeft>
          <Regular>Discounts & Reductions</Regular>
        </FlexLeft>
        <Bold green>{`${discounts != '0.00' ? '-' : ''} $${discounts}`}</Bold>
      </SpaceBetween>
    </Padding16>
    <SectionDivider />
    <Padding16>
      <SpaceBetween>
        <Regular>Evry&apos;s Payment</Regular>
        <Bold green>{`${payment != '0.00' ? '-' : ''} $${payment}`}</Bold>
      </SpaceBetween>
    </Padding16>
    <SectionDivider />
    <BlueBackground>
      <Padding16>
        <SpaceBetween>
          <Bold>You May Owe</Bold>
          <Bold>{`$${owed}`}</Bold>
        </SpaceBetween>
      </Padding16>
    </BlueBackground>
  </>
);

export default BenefitBreakdown;
