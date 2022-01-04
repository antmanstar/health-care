import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ActivityReward from '../desktop/ActivityReward';
import DiscountList from '../desktop/DiscountList';
import images from '../../../../utils/images';

// MOBILE - Rewards Card

const { MobileContainer, MobileSectionBackground, SectionDivider } = defaultTheme.components;

const Header = styled(MobileContainer)`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  height: 40px;
  margin-right: 10px;
  display: inline-block;
`;

const Title = styled.h1`
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.colors.shades.blue};
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 13px;
  color: ${props => props.theme.colors.shades.gray};

  span {
    margin-left: 4px;
    font-weight: 700;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const RewardsCard = React.memo(({ discount, activityRewards, rewardCategories, discountItems }) => (
  <MobileSectionBackground>
    <Header>
      {discount ? (
        <>
          <Icon src={images["money-in-circle"]}/>
          <div>
            <Title>Discount Items</Title>
            <Subtitle>
              Get Discounts on these items.
              <span>Everyday</span>
              {`.`}
            </Subtitle>
          </div>
        </>
      ) : (
        <>
          <Icon src={images["activity-in-circle"]} />
          <div>
            <Title>Activity Items</Title>
            <Subtitle>Complete these activities for extra rewards.</Subtitle>
          </div>
        </>
      )}
    </Header>
    <SectionDivider />
    <MobileContainer>
      {activityRewards &&
        activityRewards.map(reward => (
          <ActivityReward
            key={reward.benefit_id}
            title={reward.benefit_display_name}
            description={reward.benefit_description}
          />
        ))}
      {discountItems &&
        Object.values(rewardCategories).map(category => {
          const items = discountItems.filter(
            item => item.benefit_category_ids[0] === category.category_id
          );
          if (!isEmpty(items)) {
            return <DiscountList title={category.category_name} items={items} />;
          }
        })}
    </MobileContainer>
  </MobileSectionBackground>
));

RewardsCard.propTypes = {
  discount: PropTypes.bool,
  activityRewards: PropTypes.arrayOf(PropTypes.shape({})),
  rewardCategories: PropTypes.arrayOf(PropTypes.shape({})),
  discountItems: PropTypes.arrayOf(PropTypes.shape({}))
};

RewardsCard.defaultProps = {
  discount: false,
  activityRewards: null,
  rewardCategories: null,
  discountItems: null
};

export default RewardsCard;
