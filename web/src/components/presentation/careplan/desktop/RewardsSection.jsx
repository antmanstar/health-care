import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ActivityReward from './ActivityReward';
import DiscountList from './DiscountList';
import images from '../../../../utils/images';
import getWidth from '../../../../utils/getWidth';

// Rewards Section found on the "Care Plan" View.

const { SectionBackground, Container, SectionDivider } = defaultTheme.components;

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

  &.discount {
    margin: 12px 0 24px 0;
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
  flex-direction: column;
  height: 120px;
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
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);

  useEffect(() => {
    width > 768 && setCollapsed(false);
  }, [width]);

  const handelHeaderToggleClick = () => {
    setCollapsed(!collapsed);
  };

  const handleRewardsToggleClick = () => {
    console.log('Rewards Click');
  };

  const handleDiscountsToggleClick = () => {
    setShowFullDiscounts(!showFullDiscounts);
  };

  const activityRewards = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 1);

  const discountItems = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 2);

  return (
    <SectionBackground>
      <Container>
        <SectionHeaderWithIcon
          icon="card_giftcard"
          title="Rewards"
          subTitle="Our Rewards Program is very easy to use. Pay with your Evry card at Walmart and get discounts on us."
          subTitleTail="It’s that Simple."
          onClick={handelHeaderToggleClick}
          collapsed={collapsed}
        />
      </Container>
      {!collapsed && (
        <>
          <SectionDivider />
          <Container>
            {/* <Header>
          <Icon src={images['activity-in-circle']} />
          <div>
            <Title>Activity Items</Title>
            <Description>Complete these activities for extra rewards.</Description>
          </div>
        </Header> */}
            <Flex>
              {activityRewards.map(reward => (
                <ActivityReward
                  layoutClass="reward"
                  key={reward.benefit_id}
                  title={reward.benefit_display_name}
                  description={reward.benefit_description}
                  buttonText="Contact Care Guide"
                  earned={reward.benefit_amount}
                />
              ))}
            </Flex>
            <StyledSectionDivider />
            <Center>
              <button type="button" onClick={handleRewardsToggleClick}>
                {!showFullDiscounts ? 'See More Rewards' : 'See Less Rewards'}
              </button>
              <ExpandIconWrapper onClick={handleRewardsToggleClick}>
                <div>{!showFullDiscounts ? 'Open' : 'Collaspe'}</div>
                <StyledIcon className="material-icons">
                  {showFullDiscounts ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                </StyledIcon>
              </ExpandIconWrapper>
            </Center>
            <StyledSectionDivider />
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
            {!showFullDiscounts ? (
              <DiscountFlex>
                <ActivityReward layoutClass="discount" title="Fresh fruits & vegetables" />
                <ActivityReward layoutClass="discount" title="Fitness Equipment" />
                <ActivityReward layoutClass="discount" title="Vitamins & Supplements" />
                <ActivityReward layoutClass="discount" title="Health Products" />
                <ActivityReward layoutClass="discount" title="Fresh fruits & vegetables" />
                <ActivityReward layoutClass="discount" title="Perscription Medication" />
              </DiscountFlex>
            ) : (
              <Flex>
                {rewardCategories &&
                  Object.values(rewardCategories).map(category => {
                    const items = discountItems.filter(
                      item => item.benefit_category_ids[0] === category.category_id
                    );
                    if (!isEmpty(items)) {
                      return <DiscountList title={category.category_name} items={items} />;
                    }
                  })}
              </Flex>
            )}
            <StyledSectionDivider className="discount" />
            <Center>
              <button type="button" onClick={handleDiscountsToggleClick}>
                {!showFullDiscounts ? 'See More Discounts' : 'See Less Discounts'}
              </button>
              <ExpandIconWrapper onClick={handleDiscountsToggleClick}>
                <div>{!showFullDiscounts ? 'Open' : 'Collaspe'}</div>
                <StyledIcon className="material-icons">
                  {showFullDiscounts ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                </StyledIcon>
              </ExpandIconWrapper>
            </Center>
          </Container>
        </>
      )}
    </SectionBackground>
  );
};

RewardsSection.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

export default RewardsSection;
