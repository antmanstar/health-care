import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// MOBILE - Title and Paragraphs Card

const { MobileContainer, MobileSectionBackground, SectionDivider } = defaultTheme.components;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
`;

const Content = styled.div`
  color: ${props => props.theme.colors.shades.darkGray};

  p {
    margin: 0 0 1em;
    font-size: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TitleAndParagraphCard = React.memo(({ title, content }) => (
  <MobileSectionBackground>
    <MobileContainer>
      <Title>{title}</Title>
    </MobileContainer>
    <SectionDivider />
    <MobileContainer>
      <Content>
        {content.map(item => (
          <p>{item}</p>
        ))}
      </Content>
    </MobileContainer>
  </MobileSectionBackground>
));

TitleAndParagraphCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TitleAndParagraphCard;
