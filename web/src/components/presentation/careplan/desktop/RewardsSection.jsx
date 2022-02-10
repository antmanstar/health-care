import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ActivityReward from './ActivityReward';
import DiscountItem from './DiscountItem';
import images from '../../../../utils/images';
import getWidth from '../../../../utils/getWidth';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

// Rewards Section found on the "Care Plan" View.

const { SectionBackground, Container, SectionDivider } = defaultTheme.components;

const StyledSectionBackground = styled(SectionBackground)`
  padding-bottom: 24px;
  @media ${props => props.theme.device_up.tablet} {
    margin: 0 auto 16px;
  }
`;

const StyledContainer = styled(Container)`
  @media ${props => props.theme.device_up.tablet} {
    padding: 20px 20px 12px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Icon = styled.img`
  height: 40px;
  margin-right: 16px;
  display: inline-block;
`;

const Title = styled.h1`
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.gray};

  span {
    margin-left: 4px;
    font-weight: 700;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const StyledSectionDivider = styled(SectionDivider)`
  margin: 24px 0;
  @media ${props => props.theme.device_up.tablet} {
    margin: 16px 0;
    border-bottom-color: ${props => props.theme.colors.shades.border};
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
    margin-bottom: 16px;
  }
  @media ${props => props.theme.device_up.tablet} {
    flex-direction: column;
  }
`;

const DiscountFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: flex-start;
  margin-left: 50px;
  padding-left: 64px;
  padding-right: 64px;
  gap: 20px;
  margin-top: 45px;

  > * {
    box-sizing: border-box;
    margin-bottom: 16px;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 4px 0 0;
    color: ${props => props.theme.colors.shades.gray};
  }

  button {
    padding: 0;
    font-size: 12px;
    font-weight: 300;
    color: ${props => props.theme.colors.shades.lightTealBlue};
    border: none;
    border-radius: 4px;
    outline: none;
    background: none;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const ExpandIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 55px;
  align-items: center;

  div {
    font-size: 12px;
    color: ${props => props.theme.colors.shades.gray};
  }
  cursor: pointer;
`;

const StyledIcon = styled.i`
  color: #959595;
  width: 12px;
  margin-left: 32px;
`;

const CategoryMenuWrapper = styled.div`
  margin-bottom: 16px;
`;

const StyledScrollMenu = styled(ScrollMenu)`
  .slider-slide {
    :focus {
      outline: none;
    }
  }
`;

const Category = styled.div`
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.blue}
  opacity: 0.5;
`;

const RewardsSection = ({ rewardBenefits, rewardCategories }) => {
  const width = getWidth();
  const [showFullDiscounts, setShowFullDiscounts] = useState(false);
  const [showRewards, setshowRewards] = useState(true);
  const [curCategoryIndex, setCurCategoryIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);

  useEffect(() => {
    width > 768 && setCollapsed(false);
  }, [width]);

  const handelHeaderToggleClick = () => {
    setCollapsed(!collapsed);
  };

  const handleRewardsToggleClick = () => {
    setshowRewards(!showRewards);
  };
  const activityRewards = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 1);
  const discountItems = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 2);
  const currentCategory = Object.values(rewardCategories)[curCategoryIndex];

  const getRewardsBenefitByCategory = category => {
    return discountItems.filter(item => item.benefit_category_ids[0] === category?.category_id);
  };

  const renderRewardsBenefit = () => {
    const benefits = getRewardsBenefitByCategory(currentCategory);
    return (
      <>
        <CategoryMenuWrapper>
          <StyledScrollMenu>
            {Object.values(rewardCategories)?.map(category => (
              <Category>{category.category_name}</Category>
            ))}
          </StyledScrollMenu>
        </CategoryMenuWrapper>
        <DiscountFlex>
          {benefits?.map(benefit => (
            <DiscountItem title={benefit.benefit_name} key={benefit.benefit_id} />
          ))}
        </DiscountFlex>
      </>
    );
  };

  return (
    <>
      <StyledSectionBackground>
        <StyledContainer>
          <SectionHeaderWithIcon
            icon="card_giftcard"
            title="Rewards"
            subTitle={
              width > 768
                ? 'Your new Evry Care Plan Rewards are easy to use. The list below will update throughout the year with simple things you can do to earn cash on your Evry Spending Card that you can spend at thousands of retailers nationwide.'
                : 'Learn about our simple rewards system.'
            }
            onClick={handelHeaderToggleClick}
            collapsed={collapsed}
          />
        </StyledContainer>
        {!collapsed && (
          <>
            <StyledSectionDivider />
            <Center>
              <button type="button" onClick={handleRewardsToggleClick}>
                {!showRewards ? 'Show Rewards' : 'Hide Rewards'}
              </button>
              {width > 768 && (
                <ExpandIconWrapper onClick={handleRewardsToggleClick}>
                  <div>{!showRewards ? 'Open' : 'Collaspe'}</div>
                  <StyledIcon className="material-icons">
                    {showRewards ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                  </StyledIcon>
                </ExpandIconWrapper>
              )}
            </Center>
            <StyledSectionDivider style={{ marginBottom: 0 }} />
            <StyledContainer>
              <Flex>
                {showRewards &&
                  activityRewards.map((reward, index) => (
                    <ActivityReward
                      key={reward.benefit_id}
                      id={reward.benefit_id}
                      title={reward.benefit_display_name}
                      description={reward.benefit_description}
                      buttonText={reward.benefit_cta}
                      earned={reward.benefit_amount}
                      date={reward.benefit_effective_date}
                      action={reward.benefit_cta_value}
                      ctaType={reward.benefit_cta_type}
                    />
                  ))}
              </Flex>
            </StyledContainer>
          </>
        )}
      </StyledSectionBackground>
      <StyledSectionBackground>
        <StyledContainer>
          <Header>
            <Icon src={images['money-in-circle']} />
            <div>
              <Title>Rewards Benefit</Title>
              <Description>
                Use your EvryHealth Card at participating retailers to get discounts.
                <span>Everyday</span>
                {`.`}
              </Description>
            </div>
          </Header>
          <StyledSectionDivider />
          {renderRewardsBenefit()}
        </StyledContainer>
      </StyledSectionBackground>
    </>
  );
};

RewardsSection.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

export default RewardsSection;
