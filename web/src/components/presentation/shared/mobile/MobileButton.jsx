import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Mobile Button w/ Optional Icon & Subtitle

const { MobileContainer } = defaultTheme.components;

const Wrapper = styled.button`
  width: 100%;
  margin: 0 auto 8px;
  padding: 0;
  background: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  text-align: left;
  outline: none;
`;

const Container = styled(MobileContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;

  i {
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.i`
  margin-right: 16px;
`;

const Text = styled.h1`
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};
  margin: ${props => (props.subtitle === undefined ? '0' : '0 0 2px')};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

const MobileButton = React.memo(({ icon, text, subtitle, handleClick, arrow, onKey }) => (
  <Wrapper onClick={handleClick} onKeyDown={onKey || handleClick}>
    <Container>
      <LeftSide>
        {icon !== undefined && <Icon className="material-icons">{icon}</Icon>}
        <div>
          <Text subtitle={subtitle}>{text}</Text>
          {subtitle !== undefined && <Subtitle>{subtitle}</Subtitle>}
        </div>
      </LeftSide>
      {arrow && <i className="material-icons">keyboard_arrow_right</i>}
    </Container>
  </Wrapper>
));

MobileButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  handleClick: PropTypes.func,
  onKey: PropTypes.func,
  arrow: PropTypes.bool
};

MobileButton.defaultProps = {
  icon: undefined,
  subtitle: undefined,
  handleClick: undefined,
  onKey: undefined,
  arrow: true
};

export default MobileButton;
