import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SmallButton from './SmallButton';

// Article Card used in Article Lists on Desktop ("Care Plan" and "Customer Support" Views)

const Container = styled.div`
  margin-bottom: 32px;
  width: 32%;

  @media ${props => props.theme.device_up.tablet} {
    width: 48%;
  }

  @media ${props => props.theme.device_up.mobile} {
    width: 96%;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const ArticleCard = React.memo(({ image, title, desc, buttonLabel, link }) => (
  <Container>
    <Thumbnail src={image} />
    <Title>{title}</Title>
    <Description>{desc}</Description>
    <SmallButton
      text={buttonLabel}
      onClick={() => {
        window.open(link);
      }}
    />
  </Container>
));

ArticleCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  link: PropTypes.string.isRequired
};

ArticleCard.defaultProps = {
  buttonLabel: 'Read More'
};

export default ArticleCard;
