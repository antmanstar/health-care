import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ActivityReward from './ActivityReward';
import DiscountItem from './DiscountItem';
import DiscountList from './DiscountList';
import images from '../../../../utils/images';
import getWidth from '../../../../utils/getWidth';

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
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;

  > * {
    box-sizing: border-box;
    margin-bottom: 16px;
  }
`;

const DiscountFlex = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => `${(props.length / 3) * 52}px`};
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: flex-start;

  > * {
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  @media ${props => props.theme.device_up.tablet} {
    flex-wrap: unset;
    padding-top: 10px;
    height: unset;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;

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

const RewardsSection = ({ rewardBenefits, rewardCategories }) => {
  const width = getWidth();
  const [showFullDiscounts, setShowFullDiscounts] = useState(false);
  const [showFullRewards, setShowFullRewards] = useState(false);
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);

  useEffect(() => {
    width > 768 && setCollapsed(false);
  }, [width]);

  const handelHeaderToggleClick = () => {
    setCollapsed(!collapsed);
  };

  const handleRewardsToggleClick = () => {
    setShowFullRewards(!showFullRewards);
  };

  const handleDiscountsToggleClick = () => {
    setShowFullDiscounts(!showFullDiscounts);
  };

  const activityRewards = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 1);

  const discountItems = !showFullDiscounts
    ? [
        'Fresh fruits & vegetables',
        'Fitness Equipment',
        'Vitamins & Supplements',
        'Health Products',
        'Fresh fruits & vegetables',
        'Perscription Medication'
      ]
    : Object.values(rewardBenefits).filter(reward => reward.benefit_type === 2);

  return (
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
          <SectionDivider />
          <StyledContainer>
            <Flex>
              {activityRewards.map((reward, index) => {
                let return_cond = (!showFullRewards && index < 3) || showFullRewards; // if the flag showFullRewards = true, show all rewards, else return only 3 rewards
                if (return_cond)
                  return (
                    <ActivityReward
                      key={reward.benefit_id}
                      id={reward.benefit_id}
                      title={reward.benefit_display_name}
                      description={reward.benefit_description}
                      buttonText={reward.benefit_cta}
                      earned={reward.benefit_amount}
                      date={reward.benefit_effective_date}
                    />
                  );
              })}
            </Flex>
          </StyledContainer>
          <StyledSectionDivider style={{ 'margin-top': 0 }} />
          <Center>
            <button type="button" onClick={handleRewardsToggleClick}>
              {width <= 768
                ? 'See More'
                : !showFullRewards
                ? 'See More Rewards'
                : 'See Less Rewards'}
            </button>
            {width > 768 && (
              <ExpandIconWrapper onClick={handleRewardsToggleClick}>
                <div>{!showFullRewards ? 'Open' : 'Collaspe'}</div>
                <StyledIcon className="material-icons">
                  {showFullRewards ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                </StyledIcon>
              </ExpandIconWrapper>
            )}
          </Center>
          <StyledSectionDivider />
          <StyledContainer>
            <Header>
              <Icon src={images['money-in-circle']} />
              <div>
                <Title>Discount Items</Title>
                <Description>
                  Get Discounts on these items.
                  <span>Everyday</span>
                  {`.`}
                </Description>
              </div>
            </Header>
            <DiscountFlex length={discountItems.length}>
              {discountItems.map((item, index) => {
                return (
                  <DiscountItem
                    title={!showFullDiscounts ? item : item.benefit_display_name}
                    key={index}
                  />
                );
              })}
            </DiscountFlex>
          </StyledContainer>
          <StyledSectionDivider className="discount" />
          <Center>
            <button type="button" onClick={handleDiscountsToggleClick}>
              {width <= 768
                ? 'See More'
                : !showFullDiscounts
                ? 'See More Discounts'
                : 'See Less Discounts'}
            </button>
            {width > 768 && (
              <ExpandIconWrapper onClick={handleDiscountsToggleClick}>
                <div>{!showFullDiscounts ? 'Open' : 'Collaspe'}</div>
                <StyledIcon className="material-icons">
                  {showFullDiscounts ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                </StyledIcon>
              </ExpandIconWrapper>
            )}
          </Center>
        </>
      )}
    </StyledSectionBackground>
  );
};

RewardsSection.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

export default RewardsSection;
