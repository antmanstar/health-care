import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import getCarePlanInfo from '../../../../utils/carePlanInfo';
import Loader from '../../shared/Loader/Loader';
import images from '../../../../utils/images';

// DESKTOP: Care Plan Icon, Title, and Subtitle on Care Plan View

const { SectionBackground, Container, SpaceBetween } = defaultTheme.components;

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
`;

const CarePlanIcon = styled.img`
  margin-right: 32px;
`;

const CarePlanHeader = React.memo(({ carePlan }) => {
  const plan = getCarePlanInfo(carePlan && carePlan.care_plan_id);

  return (
    <SectionBackground>
      <Container>
        {!plan ? (
          <Loader />
        ) : (
          <SpaceBetween>
            <LeftWrapper>
              <CarePlanIcon src={images[plan.image]} />
              <div>
                <Title>{plan.title}</Title>
                <Description>{plan.description}</Description>
              </div>
            </LeftWrapper>
          </SpaceBetween>
        )}
      </Container>
    </SectionBackground>
  );
});

CarePlanHeader.propTypes = {
  carePlan: PropTypes.shape({}).isRequired
};

export default CarePlanHeader;
