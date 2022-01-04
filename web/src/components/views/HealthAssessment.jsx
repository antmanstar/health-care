import React, { Component } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Sparse } from '../layouts';
import defaultTheme from '../../style/themes';
import OnboardingProgressBar from '../presentation/registration/desktop/OnboardingProgressBar';
import Button from '../presentation/shared/desktop/Button';
import { Helmet } from 'react-helmet-async';
import images from '../../utils/images';

// DESKTOP: Health Assessment View
// TODO: Show progress bar only if during registration
// TODO: Cancel Button should say "skip" during onboarding and "nevermind" other times
// TODO: Wire up route / implement a HSA flow
// TODO: Need to keep track of if the HSA has been completed and change copy after its been completed once

const OuterWrapper = styled.div`
  position: relative;

  @media ${defaultTheme.device.tablet} {
    margin-top: 32px;
    width: 100%;
  }

  @media ${defaultTheme.device.desktop} {
    background: #f9f9f9;
    margin: 0;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  color: ${props => props.theme.colors.shades.blue};
  max-width: 786px;

  @media ${defaultTheme.device.tablet} {
    position: relative;
    flex-direction: row;
    text-align: left;
  }

  @media ${defaultTheme.device.desktop} {
    max-width: 960px;
  }

  @media ${defaultTheme.device.desktopXL} {
    max-width: 1024px;
  }
`;

const Column = styled.div`
  display: block;
  width: 100%;
  box-sizing: border-box;

  &:first-child {
    margin: 16px 0 16px;
  }

  @media ${defaultTheme.device.tablet} {
    width: 50%;
    height: 100%;

    &:first-child {
      margin: 0;
    }
  }

  @media ${defaultTheme.device.desktop} {
    &:first-child {
      width: 40%;
    }
    &:last-child {
      width: 60%;
    }
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
  margin: 0 0 16px 0;

  @media ${defaultTheme.device.desktop} {
    font-size: 48px;
    margin-bottom: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};

  span {
    font-weight: 400;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }

  @media ${defaultTheme.device.tablet} {
    padding-right: 16px;
  }

  @media ${defaultTheme.device.desktop} {
    padding-right: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 32px;

  button:first-child {
    margin-bottom: 8px;
  }
`;

const StyledLink = styled(RouterLink)`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class HealthAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Helmet>
          <title>{reflection.layoutProps.title} - Evry Health</title>
        </Helmet>
        <OnboardingProgressBar />
        <OuterWrapper>
          <InnerWrapper>
            <Column>
              <IllustrationOuterWrapper>
                <div>
                  <img src={images["health-assessment"]} alt="Health Assessment" />
                </div>
              </IllustrationOuterWrapper>
            </Column>
            <Column>
              <Title>Health Assessment.</Title>
              <Description>
                <p>
                  <span>$100 is waiting for you.</span>
                  {` All you need to do is complete a quick health survey. This survey asks questions
                  that will help us personalize the care plan to meet your specific needs.`}
                </p>
                <p>This survey only takes about 15 minutes to complete.</p>
                <p>
                  <strong>Please Note:</strong>
                  {` This information is only used in the design of your experience. It is not being
                  used to change your premiums, does not impact your claims, and is not shared
                  without your consent.`}
                </p>
              </Description>
            </Column>
          </InnerWrapper>
        </OuterWrapper>
        <ButtonWrapper>
          <Button buttonType="button" text="Begin Assessment" type="action" />
          <StyledLink to="/plan">
            <Button buttonType="button" text="Nevermind" type="negative" />
          </StyledLink>
        </ButtonWrapper>
      </>
    );
  }
}

HealthAssessment.propTypes = {};

const reflection = {
  component: HealthAssessment,
  layout: Sparse,
  layoutProps: {
    title: 'Health Assessment',
    subtitle: 'Got 15 minutes? We’d like to offer you $100 in cold hard cash.',
    fullWidth: true
  },
  route: '/health-assessment',
  forAuthorized: true
};

export default HealthAssessment;

export { reflection };
