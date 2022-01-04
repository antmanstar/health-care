import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';

// 3 Main Action Buttons on every view just below "SearchBar"

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .big-button {
    width: 32.5%;
  }
`;

const ActionButtons = React.memo(({ buttons }) => (
  <Wrapper>
    {buttons &&
      buttons.map((buttonKey, key) => <BigButtonContainer key={key} buttonKey={buttonKey} />)}
  </Wrapper>
));

ActionButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ActionButtons;
