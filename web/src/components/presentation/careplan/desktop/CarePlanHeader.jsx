import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import getCarePlanInfo from '../../../../utils/carePlanInfo';
import Loader from '../../shared/Loader/Loader';
import images from '../../../../utils/images';

// DESKTOP: Care Plan Icon, Title, and Subtitle on Care Plan View

const { SectionBackground, Container, SectionDivider } = defaultTheme.components;
const StyledSectionBackground = styled(SectionBackground)`
  @media ${props => props.theme.device_up.tablet} {
    margin: 0 auto 16px;
  }
`;

const StyledContainer = styled(Container)`
  @media ${props => props.theme.device_up.tablet} {
    padding: 38px 20px 28px 10px;
  }
`;

const StyledSectionDivider = styled(SectionDivider)`
  margin-top: -20px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 115px;
  padding-right: 32px;

  @media ${props => props.theme.device_up.tablet} {
    padding-left: 68px;
  }
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.colors.shades.blue};

  &.sm {
    font-size: 12px;
    line-height: 0px;
  }
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.darkGray};

  @media ${props => props.theme.device_up.tablet} {
    font-size: 12px;
  }

  &.sm {
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.colors.shades.tealBlue};
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  text-decoration: underline;
`;

const CarePlanIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 32px;
  @media ${props => props.theme.device_up.tablet} {
    margin-right: 8px;
  }
`;

const CarePlanHeader = React.memo(({ carePlan }) => {
  const [expanded, setExpanded] = useState(false);

  const plan = getCarePlanInfo(carePlan && carePlan.care_plan_id);

  const des1 = plan?.description?.split('<br>')[0];
  const des2 = plan?.description?.split('<br>')[1];

  return (
    <StyledSectionBackground>
      <StyledContainer>
        {!plan ? (
          <Loader />
        ) : (
          <Wrapper>
            <div style={{ display: 'flex' }}>
              <CarePlanIcon src={images[`${plan.image}-orange`]} />
              <div>
                <Title>{plan.title}</Title>
                <Description>{plan.note}</Description>
              </div>
            </div>
          </Wrapper>
        )}
      </StyledContainer>
      {plan && (
        <>
          {expanded && <StyledSectionDivider />}
          {expanded && (
            <MoreInfoWrapper>
              <Title className="sm">What's a care plan?</Title>
              <Description className="sm">
                It’s our goal at Evry to help you live a healthier and happier life. This care plan
                is a collection of educational content, wellness programs, rewards, and personalized
                goals meant to help accomplish that mission. Participation is always optional but
                warmly encouraged. This is simply one way we try to go above and beyond your normal
                insurance coverage. You may change care plans at any time by contacting member
                services.
              </Description>
              <Title className="sm">Why this care plan?</Title>
              <Description className="sm" style={{ marginBottom: '10px' }}>
                {/* <span style={{ textDecoration: 'underline' }}>{plan.title}</span> */}
                <br />
                {des1}
                {expanded && <br />}
                {expanded && <br />}
                {des2 && expanded ? des2 : ''}
              </Description>
            </MoreInfoWrapper>
          )}
          <MoreInfoWrapper>
            <Link
              onClick={() => setExpanded(!expanded)}
              style={{ marginTop: expanded ? '4px' : '-26px' }}
            >
              {expanded ? 'Read Less' : 'Read More'}
            </Link>
          </MoreInfoWrapper>
          {expanded && <br />}
        </>
      )}
    </StyledSectionBackground>
  );
});

CarePlanHeader.propTypes = {
  carePlan: PropTypes.shape({}).isRequired
};

export default CarePlanHeader;
