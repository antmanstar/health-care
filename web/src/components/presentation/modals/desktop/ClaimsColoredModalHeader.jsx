import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import selectors from '@evry-member-app/shared/store/selectors';

const { getSupportPhoneNumber } = selectors;

// Colored Modal Header

const Wrapper = styled.div`
  margin: -48px -48px 0;
  padding: 0 48px;
  font-size: 16px;
  line-height: 56px;
  background: ${props => props.theme.colors.roles.success};
  color: ${props => props.theme.colors.shades.white};
  border-radius: 4px 4px 0 0;
  text-shadow: 0 1px rgba(0, 0, 0, 0.1);
`;

const SpaceBetween = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 20px;
  }

  p {
    margin: 0 0 0 8px;
  }
`;

const ClaimsColoredModalHeader = React.memo(({ status, phoneNumber }) => (
  <Wrapper>
    <SpaceBetween>
      <Title>{status === 'DENY' ? 'DENIED' : status}</Title>
      {phoneNumber && (
        <PhoneNumber>
          <i className="material-icons">phone</i>
          <p>{`1-${phoneNumber}`}</p>
        </PhoneNumber>
      )}
    </SpaceBetween>
  </Wrapper>
));

ClaimsColoredModalHeader.propTypes = {
  status: PropTypes.oneOf(['APPROVED', 'DENY', 'CLOSED']).isRequired,
  phoneNumber: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  phoneNumber: getSupportPhoneNumber(state)
});

export default connect(mapStateToProps)(ClaimsColoredModalHeader);
