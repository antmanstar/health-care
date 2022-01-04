import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import images from '../../../../utils/images';

// Contact Preferences - Clickable if you pass handleClick

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  p {
    margin: 0;
  }

  button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: none;
    border: none;
    outline: none;
  }
`;

const ContactPreference = React.memo(({ toggledOn, text, handleClick }) => (
  <Wrapper>
    <p>{text}</p>
    {handleClick ? (
      <button type="button" onClick={handleClick}>
        <img
          src={toggledOn ? images["toggle-on"] : images["toggle-off"]}
          alt={toggledOn ? 'toggled on' : 'toggled off'}
        />
      </button>
    ) : (
      <img
        src={toggledOn ? {toggleOnImg} : {toggleOffImg}}
        alt={toggledOn ? 'toggled on' : 'toggled off'}
      />
    )}
  </Wrapper>
));

ContactPreference.propTypes = {
  text: PropTypes.string.isRequired,
  toggledOn: PropTypes.bool,
  handleClick: PropTypes.func
};

ContactPreference.defaultProps = {
  toggledOn: false,
  handleClick: null
};

export default ContactPreference;
