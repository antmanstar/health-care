import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import defaultTheme from '../../../../style/themes';
// 3 Main Action Buttons on every view just below "SearchBar"

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
  @media ${defaultTheme.device.tablet} {
    gap: 0px;
    justify-content: space-between;
  }
  .big-button {
    width: 100%;
    @media ${defaultTheme.device.mobile} {
      width: 75%;
    }
    @media ${defaultTheme.device.tablet} {
      width: 32.5%;
    }
  }
`;

const ActionButtons = React.memo(({ buttons, view }) => {
  return (
    <Wrapper>
      {buttons &&
        buttons.map((buttonKey, key) => (
          <BigButtonContainer key={key} buttonKey={buttonKey} view={view} />
        ))}
    </Wrapper>
  );
});

ActionButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  view: PropTypes.string
};

export default ActionButtons;
