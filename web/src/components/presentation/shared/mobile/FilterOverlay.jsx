import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: end;
  top: 0;
  left: 0;
  position: fixed;
  background: linear-gradient(to bottom right, rgba(2, 38, 57, 0.98), rgba(0, 60, 92, 0.98));
  color: ${props => props.theme.colors.shades.white};
  padding: 8px 16px;
  min-height: 100vh;
  z-index: 1000;
`;

const CloseWrapper = styled.div`
  display: inline-block;
  width: 100%;
  text-align: right;
  cursor: pointer;
  i {
    padding: 8px;
    font-size: 26px;
    color: ${props => props.theme.colors.white};
  }
`;

const Icon = styled.i`
  color: ${props => props.theme.colors.shades.white};
`;

class FilterOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onClose, children } = this.props;
    return (
      <Wrapper>
        {onClose ? (
          <CloseWrapper onClick={onClose} onKeyDown={onClose}>
            <Icon className="material-icons">close</Icon>
          </CloseWrapper>
        ) : null}
        {children}
      </Wrapper>
    );
  }
}

FilterOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

FilterOverlay.defaultProps = {
  children: 'There is nothing here. Something should be.',
  onClose: null
};

export default FilterOverlay;
