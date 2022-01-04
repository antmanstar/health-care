import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dial from '../../coverage/desktop/Dial';
import NoDeductibleMessage from '../../coverage/desktop/NoDeductibleMessage';

// MOBILE - Mobile Dial and Numbers for Claims View

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: ${props => props.theme.colors.shades.white};
  width: 200px;
  height: 129px;
  margin-top: -64px;
  padding: 56px 16px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  text-align: center;
`;

const Label = styled.h2`
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.blue};
`;

const Sublabel = styled.h4`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.gray};
`;

const NumberProgress = styled.h3`
  margin: 0 0 4px;
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.blue};

  span {
    font-weight: 400;
    font-size: 14px;
  }
`;

const MobileDialAndNumbers = React.memo(
  ({ label, currentValue, maxValue, sublabel, color, noDeductible }) => (
    <Container>
      <Dial percentage={noDeductible ? 200 : (currentValue / maxValue) * 100} color={color} />
      <Box>
        {noDeductible ? (
          <NoDeductibleMessage />
        ) : (
          <>
            <NumberProgress>
              {`$${currentValue}`}
              <span>{` / $${maxValue}`}</span>
            </NumberProgress>
            <Label>{label}</Label>
            <Sublabel>{sublabel}</Sublabel>
          </>
        )}
      </Box>
    </Container>
  )
);

MobileDialAndNumbers.propTypes = {
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  noDeductible: PropTypes.bool
};

MobileDialAndNumbers.defaultProps = {
  noDeductible: false
};

export default MobileDialAndNumbers;
