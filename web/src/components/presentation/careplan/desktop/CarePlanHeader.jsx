import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import getCarePlanInfo from '../../../../utils/carePlanInfo';
import Loader from '../../shared/Loader/Loader';
import images from '../../../../utils/images';
import ReactTooltip from 'react-tooltip';

// DESKTOP: Care Plan Icon, Title, and Subtitle on Care Plan View

const { SectionBackground, Container, SpaceBetween } = defaultTheme.components;
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

const LeftWrapper = styled.div`
  display: flex;
  margin-right: 20px;
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.darkGray};

  @media ${props => props.theme.device_up.tablet} {
    font-size: 12px;
    font-weight: 300;
  }
`;

const CarePlanIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 32px;
  @media ${props => props.theme.device_up.tablet} {
    margin-right: 8px;
  }
`;

const QuestionIcon = styled.img`
  width: 18px;
  margin-right: 5px;
`;

const StyledTooltip = styled(ReactTooltip)`
  max-width: 40vh;
  opacity: 1 !important;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  display: flex !important;
  justify-content: center;
  align-items: center;
  white-space: normal;
  right: 20px;

  @media ${props => props.theme.device.mobile} {
  }

  @media ${props => props.theme.device.tablet} {
    height: 30px;
    right: unset;
  }
`;

const CarePlanHeader = React.memo(({ carePlan }) => {
  const plan = getCarePlanInfo(carePlan && carePlan.care_plan_id);

  return (
    <StyledSectionBackground>
      <StyledContainer>
        {!plan ? (
          <Loader />
        ) : (
          <SpaceBetween>
            <LeftWrapper>
              <CarePlanIcon src={images[`${plan.image}-orange`]} />
              <div>
                <Title>{plan.title}</Title>
                <Description>{plan.description}</Description>
              </div>
            </LeftWrapper>
            <QuestionIcon src={images['question-mark']} data-tip data-for="registerTip" />
            <StyledTooltip
              id="registerTip"
              place="bottom"
              textColor="#000000"
              backgroundColor="#e1f9fa"
              offset={{ top: -5, left: 0 }}
              type="light"
            >
              {plan.description}
            </StyledTooltip>
          </SpaceBetween>
        )}
      </StyledContainer>
    </StyledSectionBackground>
  );
});

CarePlanHeader.propTypes = {
  carePlan: PropTypes.shape({}).isRequired
};

export default CarePlanHeader;
