import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';

// Icon + Title / Subtitle pair for section headings

const Wrapper = styled.div`
  display: flex;
  margin-left: 12px;
  background: #fff;
  margin: 19px 0;
  padding: 8px 27px 16px 14px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  @media ${props => props.theme.device_up.tablet} {
    margin-left: 0px;
  }
  .content-information {
    margin-left: 8.62px;
    @media screen and (min-width: 1200px) {
      margin-left: 22px;
    }
  }
  @media screen and (min-width: 1200px) {
    padding: 37px 0 25px 43px;
  }
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
`;

const Icon = styled.i`
  background: #f9423a;
  color: #fff;
  background: ${props => props.theme.colors.shades.pinkOrange};
  border-radius: 4px;
  @media screen and (min-width: 1200px) {
    margin-right: 16px;
  }
`;

const SvgIcon = styled.img`
  height: 20px;
  margin-right: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  color: ${props => props.theme.colors.shades.blue};
  @media ${props => props.theme.device_up.tablet} {
    font-size: 16px;
  }
  @media screen and (min-width: 1200px) {
    margin-right: 24px;
  }
`;

const SubTitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 10px;
  margin-right: 10px;
  line-height: 18.75px;
  font-size: 16px;
  color: #4a4a4b;
  @media ${props => props.theme.device_up.tablet} {
    font-size: 13px;
    color: ${props => props.theme.colors.shades.gray};
  }
  @media screen and (min-width: 1200px) {
    font-size: 16px;
    max-width: 800px;
  }
`;

const CollaspeIcon = styled.i`
  color: ${props => props.theme.colors.shades.blue};
  @media ${props => props.theme.device.tablet} {
    display: none;
  }
  cursor: pointer;
`;

const InformationSection = React.memo(({ title, subTitle, icon, svgIcon, collapsed, onClick }) => {
  return (
    <Wrapper>
      <div>
        {svgIcon ? <SvgIcon src={images[icon]} /> : <Icon className="material-icons">{icon}</Icon>}
      </div>
      <div className="content-information">
        <Inline>
          <Title>{title}</Title>
        </Inline>
        <SubTitle>{subTitle}</SubTitle>
      </div>
    </Wrapper>
  );
});

InformationSection.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.string.isRequired,
  svgIcon: PropTypes.bool,
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

InformationSection.defaultProps = {
  subTitle: '',
  svgIcon: false,
  collapsed: false
};

export default InformationSection;
