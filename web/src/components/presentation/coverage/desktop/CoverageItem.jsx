import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Coverage List Items (Shared)

const Wrapper = styled.div`
  margin: 0 -16px;
  background: ${props => (props.alt ? props.theme.colors.shades.white : '#fafafa')};

  @media ${props => props.theme.device.tablet} {
    margin: 0 -32px;
  }
`;

const Container = styled.div`
  padding: 0 16px;

  @media ${props => props.theme.device.tablet} {
    padding: 0 32px;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 16px 0;

  @media ${props => props.theme.device.tablet} {
    display: flex;
  }

  &.collapsed {
    padding-top: 0;
  }
`;

const Label = styled.div`
  width: 100%;
  font-weight: 300;
  margin-bottom: 12px;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.darkGray};
  &.hide {
    display: none;
  }

  @media ${props => props.theme.device.tablet} {
    color: ${props => props.theme.colors.shades.blue};
    width: 50%;
    font-size: 16px;
    margin-bottom: 0;
    &.hide {
      display: block;
    }
  }
`;

const Coverage = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.tablet} {
    width: 50%;
    font-size: 16px;
  }
`;

const CoverageItem = React.memo(({ alt, label, coverage, note }) => (
  <Wrapper alt={alt}>
    <Container>
      <Item className={!label && 'collapsed'}>
        <Label className={!label && 'hide'}>{label}</Label>
        <Coverage>
          {coverage}
          {note && ` - ${note}`}
        </Coverage>
      </Item>
    </Container>
  </Wrapper>
));

CoverageItem.propTypes = {
  alt: PropTypes.bool,
  label: PropTypes.string.isRequired,
  coverage: PropTypes.string.isRequired,
  note: PropTypes.string
};

CoverageItem.defaultProps = {
  alt: false,
  note: null
};

export default CoverageItem;
