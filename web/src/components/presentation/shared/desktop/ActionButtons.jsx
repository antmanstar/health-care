import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BigButtonContainer from '../../../containers/shared/desktop/BigButtonContainer';
import defaultTheme from '../../../../style/themes';
// 3 Main Action Buttons on every view just below "SearchBar"

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: ${props => (props.type === 'headerButtons' ? 'space-between' : 'center')};
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: ${props => (props.view === 'plans' ? '0px' : '4px')};

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

  .header-big-button {
    width: 32.5%;
    @media screen and (max-width: 660px) {
      width: 49.4%;
      gap: 10px;
      text-align: left;
      margin-top: 5px;
      min-height: 80px;
      &:last-child {
        width: 100%;
      }
    }
  }
`;

const ActionButtons = React.memo(({ buttons, view, type }) => {
  return (
    <Wrapper view={view} type={type}>
      {buttons &&
        buttons.map((buttonKey, key) => (
          <BigButtonContainer key={key} buttonKey={buttonKey} view={view} type={type} />
        ))}
    </Wrapper>
  );
});

ActionButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  view: PropTypes.string
};

export default ActionButtons;
