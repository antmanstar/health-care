import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import images from '../../../../utils/images';

// Preference Toggle Cell

const { MobileSectionBackground, MobileContainer } = defaultTheme.components;

const Container = styled(MobileContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};

  p {
    margin: 0;
  }
`;

const Checkbox = styled.div`
  display: flex;
`;

const PreferenceToggle = React.memo(({ id, text, toggleOn, handleClick }) => (
  <MobileSectionBackground onClick={handleClick}>
    <Container>
      <p>{text}</p>
      <Checkbox>
        {toggleOn ? (
          <img src={images["toggle-on"]} alt="toggled on" />
        ) : (
          <img src={images["toggle-off"]} alt="toggled off" />
        )}
      </Checkbox>
    </Container>
  </MobileSectionBackground>
));

PreferenceToggle.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  toggleOn: PropTypes.bool,
  id: PropTypes.string.isRequired
};

PreferenceToggle.defaultProps = {
  toggleOn: false
};

export default PreferenceToggle;
