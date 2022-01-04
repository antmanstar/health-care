import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import defaultTheme from '../../../../style/themes';
import OnboardingSlideContent from './OnboardingSlideContent';
import images from '../../../../utils/images';

//  Individual Onboarding Slide - Has illustration & Description of a feature

const OuterWrapper = styled.div`
  position: relative;

  .fade-enter {
    opacity: 0;
    transform: translateY(2%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all 250ms ease-in-out;
  }
  .fade-exit,
  .fade-exit-active {
    position: absolute;
    opacity: 0;
  }

  @media ${defaultTheme.device.tablet} {
    width: 100%;
    background: #f9f9f9;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: ${props => props.theme.colors.shades.blue};
  max-width: 786px;

  @media ${defaultTheme.device.tablet} {
    position: relative;
    flex-direction: row;
  }

  @media ${defaultTheme.device.desktop} {
    max-width: 960px;
  }
`;

const OnboardingSlide = React.memo(({ slide }) => {
  const slides = {
    1: {
      title: 'Care Plans',
      description:
        'At Evry, we want to do more than just pay for bills when you get sick. In a moment we’re going to ask you a handful of questions to place you into a Care Plan that’s right for you. <br /><br /> These Care Plans are our way of providing a range of free resources and rewards above and beyond your normal plan benefits that are personalized to match your specific health needs. You’ll find more information on your wellness programs, Evry Rewards Card, educational materials and more in the My Care Plan section.',
      imgSrc: images["care-plan-illustration"]
    },
    2: {
      title: 'Care Guides',
      description:
        'As part of your membership, we’ve assigned a nurse to serve as your personal care guide. You can think of your Evry care guide as your personal healthcare quarterback. It’s their job to fight for you and help you with all aspects of your health. This is a completely free resource and you’ll find a list of the various ways your guide can help in the Customer Support section.',
      imgSrc: images["care-guides-illustration"]
    },
    3: {
      title: 'Telemedicine',
      description:
        'You never need to worry about when you can talk to a doctor. Through our Member Portal and Mobile App, you have 24/7 access to thousands of doctors across dozens of specialties right at your fingertips. These virtual visits are entirely free for you and your family.',
      imgSrc: images["telemedicine-illustration"]
    },
    4: {
      title: 'Earn Rewards',
      description:
        'We want to reward you for your hard work! You’ll be receiving an Evry branded gift card in the mail. When you or your family use this card at Walmart and Sam’s Club locations nationwide (and online!), Evry will help pay for groceries, fitness equipment, and more. Visit the My Care Plan section for more details',
      imgSrc: images["rewards-illustration"]
    }
  };

  return (
    <OuterWrapper>
      <TransitionGroup>
        <CSSTransition
          classNames="fade"
          key={slide}
          timeout={{ enter: 150, exit: 0 }}
          unmountOnExit
        >
          <InnerWrapper>
            <OnboardingSlideContent slide={slides[slide]} />
          </InnerWrapper>
        </CSSTransition>
      </TransitionGroup>
    </OuterWrapper>
  );
});

OnboardingSlide.propTypes = {
  slide: PropTypes.number.isRequired
};

export default OnboardingSlide;
