import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarePlanBoxBig from './CarePlanBoxBig';
import Button from '../../shared/desktop/Button';
import NegativeButton from '../../shared/desktop/NegativeButton';
import images from '../../../../utils/images';

// This is suggesting a new care plan based on questionnaire during onboarding/registration

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto 16px;
  text-align: center;

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 100%;
  }

  @media ${props => props.theme.device.tabletXL} {
    width: 100%;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 32px;

  @media ${props => props.theme.device.mobile} {
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media ${props => props.theme.device.tablet} {
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media ${props => props.theme.device.desktop} {
    flex-direction: unset;
    flex-wrap: unset;
  }

  @media ${props => props.theme.device.desktopXL} {
    flex-direction: unset;
    flex-wrap: unset;
  }
`;

const BigArrow = styled.img`
  @media ${props => props.theme.device.mobile} {
    margin: 40px;
    transform: rotate(90deg);
  }

  @media ${props => props.theme.device.tablet} {
    margin: 40px;
    transform: rotate(90deg);
  }

  @media ${props => props.theme.device.tabletXL} {
    margin: 40px;
    transform: rotate(90deg);
  }

  @media ${props => props.theme.device.desktop} {
    transform: unset;
  }

  @media ${props => props.theme.device.desktopXL} {
    transform: unset;
  }
`;
{
  /* <img {...props} />; */
}

const Information = styled.div`
  margin-bottom: 32px;
  padding: 32px 0;
  color: ${props => props.theme.colors.shades.blue};
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

const Buttons = styled.div`
  > * {
    margin-bottom: 8px;
  }
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const CarePlanSuggestionSlide = ({
  carePlanSelection,
  carePlanSuggestion,
  handleAccept,
  handleDecline
}) => (
  <Wrapper>
    <Options>
      {carePlanSelection.title === carePlanSuggestion.title ? (
        <CarePlanBoxBig
          title={carePlanSuggestion.title}
          icon={carePlanSuggestion.icon}
          suggested={true}
        />
      ) : (
        <>
          <CarePlanBoxBig title={carePlanSelection.title} icon={carePlanSelection.icon} />
          <BigArrow src={images['big_right_arrow']} />
          <CarePlanBoxBig
            title={carePlanSuggestion.title}
            icon={carePlanSuggestion.icon}
            suggested={true}
          />
        </>
      )}
    </Options>
    <Information>
      <Title>{carePlanSuggestion.title}</Title>
      <Description>{carePlanSuggestion.desc}</Description>
    </Information>
    <Buttons>
      <Button text="Choose Plan" onClick={handleAccept} />
      {/* Not needed at for now
      <br />
      <NegativeButton text="No Thanks" onClick={handleDecline} /> */}
    </Buttons>
  </Wrapper>
);

CarePlanSuggestionSlide.propTypes = {
  carePlanSelection: PropTypes.shape({}),
  carePlanSuggestion: PropTypes.shape({}),
  handleAccept: PropTypes.func,
  handleDecline: PropTypes.func
};

CarePlanSuggestionSlide.defaultProps = {
  carePlanSelection: {},
  carePlanSuggestion: {},
  handleAccept: () => {},
  handleDecline: () => {}
};

export default CarePlanSuggestionSlide;
