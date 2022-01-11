import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';

// Icon + Title / Subtitle pair for section headings

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 16px;
  margin-right: 10px;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const SectionHeaderWithIcon = React.memo(({ title, subTitle, icon, svgIcon }) => (
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
      <SubTitle>{subTitle}</SubTitle>
    </div>
  </Wrapper>
));

SectionHeaderWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.string.isRequired,
  svgIcon: PropTypes.bool
};

SectionHeaderWithIcon.defaultProps = {
  subTitle: '',
  svgIcon: false
};

export default SectionHeaderWithIcon;