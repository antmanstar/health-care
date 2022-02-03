import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import images from '../../../../utils/images';
import { ellipsis } from 'polished';
import getWidth from '../../../../utils/getWidth';

// Partnered Program Card for "Meet you goals" section on the "Care Plan" View.

const Wrapper = styled.div`
  width: 48%;
  border: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-radius: 6px;
  min-height: 140px;
  margin-bottom: 36px;

  @media ${props => props.theme.device_up.tablet} {
    width: 100%;
    magin-bottom: unset;
  }
`;

const Container = styled.div`
  padding: 16px;
  @media ${props => props.theme.device_up.tablet} {
    padding: 12px 12px 12px 8px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  @media ${props => props.theme.device_up.tablet} {
    margin-bottom: 4px;
  }
`;

const Icon = styled.img`
  height: 24px;
  margin-right: 16px;
  @media ${props => props.theme.device_up.tablet} {
    margin-right: 5px;
    height: 20px;
  }
`;

const Svg = styled.div`
  height: 24px;
  margin-right: 16px;

  @media ${props => props.theme.device_up.tablet} {
    margin-right: 5px;
    height: 20px;
    svg {
      max-width: 50px;
      width: 100% !important;
      height: 20px;
    }
  }
`;

const Title = styled.h1`
  margin: 0 auto 0 0;
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.blue};
  ${({ width }) => ellipsis(`${0.5 * width}px`)}
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionIcon = styled.img`
  width: 12px;
`;

const ExpandableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 12px;
  color: ${props => props.theme.colors.shades.gray};
  min-height: 34px;

  @media ${props => props.theme.device_up.tablet} {
    font-size: 10px;
  }

  &.collapsed {
    ${ellipsis(undefined, 3)};
  }
`;

const Link = styled.a`
  margin-top: 4px;
  color: ${props => props.theme.colors.shades.tealBlue};
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  text-decoration: underline;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 0 0 6px 6px;
  background: ${props => props.color};
  color: ${props => props.theme.colors.shades.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;

const StyledIcon = styled.i`
  color: white;
  width: 12px;
  margin-right: 4px;
  font-weight: 500;
`;

const ProgramCard = React.memo(({ icon, icon_type, title, desc, actionText, onClick, color }) => {
  const width = getWidth();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);

    // to cover the limitation of nuka-carousel - 'size changing of each slide inside carousel never been reflected until window resize'
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  };

  return (
    <Wrapper>
      <Container>
        <TitleSection>
          <Avatar>
            {icon && icon_type == 2 && <Icon src={`data:image/png;base64, ${icon}`} />}
            {icon && icon_type == 3 && <Svg dangerouslySetInnerHTML={{ __html: icon }}></Svg>}
            <Title width={width - 50}>{title}</Title>
          </Avatar>
          <QuestionIcon src={images['question-mark']} />
        </TitleSection>
        <ExpandableWrapper>
          <Description className={expanded ? '' : 'collapsed'}>{desc}</Description>
          <Link onClick={handleClick}>{expanded ? 'Read Less' : 'Read More'}</Link>
        </ExpandableWrapper>
      </Container>
      <Button color={color} onClick={onClick}>
        {actionText}
        <StyledIcon className="material-icons">keyboard_arrow_right</StyledIcon>
      </Button>
    </Wrapper>
  );
});

ProgramCard.propTypes = {
  icon: PropTypes.string,
  icon_type: PropTypes.number,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string
};

ProgramCard.defaultProps = {
  icon: null,
  color: defaultTheme.gradients.main
};

export default ProgramCard;
