import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';

// Select Input

const Wrapper = styled.div`
  position: relative;
  display: block;
`;

const StyledSelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  padding: 0 16px;
  height: 50px;
  line-height: 17px;
  font-size: 16px;
  font-weight: 400;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  color: ${props => props.theme.colors.shades.blue};
  border: 1px solid transparent;
  border-radius: 4px;
  appearance: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  option:disabled {
    /* TODO: this doesn't work and I don't know why ... dev tools show the right color assigned */
    color: ${props => props.theme.colors.shades.gray};
  }

  &:hover {
    border-color: ${props => props.theme.colors.shades.mediumGray};
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.shades.darkGray};
  }

  &.mobile {
    height: auto;
    box-sizing: border-box;
    margin-bottom: 0;
    padding: 16px;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    background: ${props => props.theme.colors.shades.white};
    color: ${props => props.theme.colors.shades.blue};
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

    ::placeholder {
      font-weight: 300;
      color: ${props => props.theme.colors.shades.gray};
    }

    &:hover {
      border-color: ${props => props.theme.colors.shades.mediumGray};
    }

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.shades.darkGray};
    }

    &.error {
      border-color: ${props => props.theme.colors.roles.danger};
    }
  }
`;

const Icon = styled.img`
  position: absolute;
  pointer-events: none;
  top: 24px;
  right: 14px;
  transform: translateY(-50%);
`;

const Select = React.memo(({ name, placeholder, icon, children, onChange, value, mobile }) => (
  <Wrapper>
    <StyledSelect className={mobile && 'mobile'} name={name} value={value} onChange={onChange}>
      <option value="" selected disabled hidden>
        {placeholder}
      </option>
      {children}
    </StyledSelect>
    <Icon src={images[`${icon}-select`]} />
  </Wrapper>
));

//  TODO: fix these
Select.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  mobile: PropTypes.bool
};

Select.defaultProps = {
  name: null,
  children: 'You should not be seeing this',
  icon: 'arrow',
  onChange: null,
  mobile: false
};

export default Select;
