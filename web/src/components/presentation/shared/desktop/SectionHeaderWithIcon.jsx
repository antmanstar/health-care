import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';

// Icon + Title / Subtitle pair for section headings

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 12px;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
`;

const Icon = styled.i`
  margin-right: 16px;
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

const SvgIcon = styled.img`
  height: 20px;
  margin-right: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.colors.shades.blue};
`;

const SubTitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 12px;
  margin-right: 10px;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const SubTitleTail = styled.text`
  margin: 0;
  font-weight: 700;
  font-size: 16px;
  margin-left: 4px;
  color: ${props => props.theme.colors.shades.blue};
`;

const CollaspeIcon = styled.i`
  color: ${props => props.theme.colors.shades.blue};
  @media ${props => props.theme.device.tablet} {
    display: none;
  }
  cursor: pointer;
`;

const SectionHeaderWithIcon = React.memo(
  ({ title, subTitle, icon, svgIcon, subTitleTail, collapsed, onClick }) => {
    return (
      <Wrapper>
        <div>
          <Inline>
            {svgIcon ? (
              <SvgIcon src={images[icon]} />
            ) : (
              <Icon className="material-icons">{icon}</Icon>
            )}
            <Title>{title}</Title>
          </Inline>
          <SubTitle>
            {subTitle}
            <SubTitleTail>{subTitleTail}</SubTitleTail>
          </SubTitle>
        </div>
        <CollaspeIcon className="material-icons" onClick={onClick}>
          {!collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
        </CollaspeIcon>
      </Wrapper>
    );
  }
);

SectionHeaderWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  subTitleTail: PropTypes.string,
  icon: PropTypes.string.isRequired,
  svgIcon: PropTypes.bool,
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

SectionHeaderWithIcon.defaultProps = {
  subTitle: '',
  svgIcon: false,
  collapsed: false
};

export default SectionHeaderWithIcon;
