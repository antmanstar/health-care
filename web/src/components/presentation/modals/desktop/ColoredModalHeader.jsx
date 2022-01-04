import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import selectors from '@evry-member-app/shared/store/selectors';

const { getSupportPhoneNumber } = selectors;

// Colored Modal Header (Action Required, Pending, Completed)

const { SpaceBetween } = defaultTheme.components;

const Wrapper = styled.div`
  margin: -48px -48px 0;
  padding: 0 48px;
  font-size: 16px;
  line-height: 56px;
  background: ${props =>
    (props.color === 'action required' && props.theme.colors.roles.danger) ||
    (props.color === 'pending' && props.theme.colors.roles.pending) ||
    props.theme.colors.roles.success};
  color: ${props => props.theme.colors.shades.white};
  border-radius: 4px 4px 0 0;
  text-shadow: 0 1px rgba(0, 0, 0, 0.1);
`;

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

const ColoredModalHeader = React.memo(({ status, phoneNumber }) => (
  <Wrapper color={status}>
    <SpaceBetween>
      <Title>{status}</Title>
      <PhoneNumber>
        <i className="material-icons">phone</i>
        <p>{`1-${phoneNumber}`}</p>
      </PhoneNumber>
    </SpaceBetween>
  </Wrapper>
));

ColoredModalHeader.propTypes = {
  status: PropTypes.oneOf(['action required', 'pending', 'completed']).isRequired,
  phoneNumber: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  phoneNumber: getSupportPhoneNumber(state)
});

export default connect(mapStateToProps)(ColoredModalHeader);
