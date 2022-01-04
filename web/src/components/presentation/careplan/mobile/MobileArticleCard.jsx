import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import truncate from '../../../../utils/string';

// MOBILE - Article Card

const { MobileContainer, MobileSectionBackground, SectionDivider } = defaultTheme.components;

const Thumbnail = styled.img`
  width: 100%;
  max-height: 128px;
  border-radius: 4px 4px 0 0;
  object-fit: cover;
  object-position: center;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
`;

const Preview = styled.p`
  width: 100%;
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.gray};
`;

const ReadArticleButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  color: ${props => props.theme.colors.shades.blue};
`;

const MobileArticleCard = React.memo(({ image, title, desc, link }) => (
  <MobileSectionBackground>
    {image && <Thumbnail src={image} />}
    <MobileContainer>
      <Title>{title}</Title>
      <Preview>{truncate(130, 4)(desc)}</Preview>
    </MobileContainer>
    <SectionDivider />
    <ReadArticleButton
      onClick={() => {
        window.open(link);
      }}
    >
      <p>Read Article</p>
      <i className="material-icons">keyboard_arrow_right</i>
    </ReadArticleButton>
  </MobileSectionBackground>
));

MobileArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default MobileArticleCard;
