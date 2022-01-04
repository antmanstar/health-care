import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import defaultTheme from '../../../../style/themes';

// Tooltip that displays pop up message on hover

const styles = theme => ({
  lightTooltip: {
    backgroundColor: defaultTheme.colors.shades.blue,
    color: defaultTheme.colors.shades.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    maxWidth: '100%',
    padding: '8px 16px'
  }
});

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
  width: 16px;
  font-weight: 900;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.blue};
  border: 1px solid ${props => props.theme.colors.shades.blue};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.shades.blue};
    color: white;
  }
`;

const Tip = React.memo(({ message, placement, classes }) => {
  const MyTip = props => <Circle {...props}>?</Circle>;
  return (
    <Tooltip
      title={message}
      placement={placement}
      classes={{ tooltip: classes.lightTooltip }}
      disableHoverListener={message === ''}
    >
      <MyTip />
    </Tooltip>
  );
});

Tip.propTypes = {
  message: PropTypes.string,
  placement: PropTypes.string,
  classes: PropTypes.shape({}).isRequired
};

Tip.defaultProps = {
  message: '',
  placement: 'top'
};

export default withStyles(styles)(Tip);
