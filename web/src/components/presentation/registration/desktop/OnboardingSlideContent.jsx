import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

//  Onboarding Slide Copy

const Column = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  &:first-child {
    margin: 32px 0 16px;
  }

  @media ${defaultTheme.device.tablet} {
    width: 50%;
    height: 100%;
    text-align: left;

    &:first-child {
      margin: 0;
    }
  }

  @media ${defaultTheme.device.desktop} {
    text-align: left;
  }
`;

const IllustrationOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    height: 300px;
    width: 300px;

    @media ${defaultTheme.device.desktop} {
      height: 360px;
      width: 360px;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;

  @media ${defaultTheme.device.desktop} {
    font-size: 48px;
    margin-bottom: 24px;
  }
`;

const Description = styled.p`
  max-width: 448px;
  margin: 0 auto 16px;
  padding: 0 16px;
  font-size: 13px;
  line-height: 1.6em;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};

  @media ${defaultTheme.device.tablet} {
    font-size: 14px;
    padding: 0 16px 0 0;
    margin-left: 0;
  }

  @media ${defaultTheme.device.desktop} {
    padding: 0;
    text-align: left;
  }
`;

const OnboardingSlideContent = React.memo(({ slide }) => (
  <>
    <Column>
      <IllustrationOuterWrapper>
        <div>
          <img src={slide.imgSrc} alt={`${slide.title} Illustration`} />
        </div>
      </IllustrationOuterWrapper>
    </Column>
    <Column>
      <Title>{slide.title}</Title>
      <Description dangerouslySetInnerHTML={{ __html: slide.description }} />
    </Column>
  </>
));

OnboardingSlideContent.propTypes = {
  slide: PropTypes.shape({}).isRequired
};

export default OnboardingSlideContent;
