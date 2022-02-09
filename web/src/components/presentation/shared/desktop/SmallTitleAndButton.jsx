import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SmallButton from './SmallButton';
import defaultTheme from '../../../../style/themes';
// This is the Title/Button combo for smaller sections

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media not ${defaultTheme.device.mobile} {
    h3 {
      color: ${props => props.theme.colors.shades.blue};
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }
  }

  @media ${defaultTheme.device.mobile} {
    h3 {
      color: ${props => props.theme.colors.shades.blue};
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
  }
`;

const SmallTitleAndButton = React.memo(({ text, buttonText, onClick }) => (
  <Wrapper>
    <h3 className="small-title-heading">{text}</h3>
    {buttonText && buttonText.length > 0 && <SmallButton text={buttonText} onClick={onClick} />}
  </Wrapper>
));

SmallTitleAndButton.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

SmallTitleAndButton.defaultProps = {
  onClick: null
};

export default SmallTitleAndButton;
