import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import images from '../../../../utils/images';

const ListItem = styled.li`
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px #eee;

  .icon {
    width: 32px;
    height: 24px;
    margin-right: 16px;
    text-align: center;
    position: relative;
    margin-top: -1px;
  }

  .link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 18px 16px;
    border-right: solid 5px ${props => props.theme.colors.shades.white};
    box-sizing: border-box;
    color: ${props => props.theme.colors.shades.mediumGray};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.shades.tealBlue};
      font-weight: bold;
      border-color: ${props => props.theme.colors.shades.tealBlue};
      .icon {
        color: ${props => props.theme.colors.shades.pinkRed};
        filter: none;
      }
    }
  }
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.shades.gray};
`;

const SvgIcon = styled.img`
  filter: grayscale(100%) brightness(141%);
`;

const SideMenuListItem = ({ svgIcon, icon, link, label, onClick }) => (
  <ListItem>
    <RouterLink to={link} className="link" onClick={onClick}>
      {svgIcon ? (
        <SvgIcon src={images[icon]} className="icon" />
      ) : (
        <Icon className="material-icons icon">{icon}</Icon>
      )}
      <span>{label}</span>
    </RouterLink>
  </ListItem>
);

SideMenuListItem.propTypes = {
  svgIcon: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

SideMenuListItem.defaultProps = {
  svgIcon: true,
  onClick: null
};

export default SideMenuListItem;
