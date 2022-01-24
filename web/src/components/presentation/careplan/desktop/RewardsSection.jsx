import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ActivityReward from './ActivityReward';
import DiscountList from './DiscountList';
import images from '../../../../utils/images';

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
  margin: 32px 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 32px 32px 16px;
  background: #fbfbfb;
  box-sizing: border-box;

  > * {
    box-sizing: border-box;
    margin-bottom: 16px;
  }
`;

const Center = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;

  p {
    margin: 0 4px 0 0;
    color: ${props => props.theme.colors.shades.gray};
  }

  button {
    padding: 0;
    font-size: 16px;
    font-weight: 300;
    color: ${props => props.theme.colors.shades.pinkOrange};
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

class RewardsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullDiscounts: false
    };

    this.handlers = {
      handleToggleClick: this.handleToggleClick.bind(this)
    };
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showFullDiscounts: !prevState.showFullDiscounts
    }));
  }

  render() {
    const { showFullDiscounts } = this.state;
    const { rewardBenefits, rewardCategories } = this.props;

    const activityRewards = Object.values(rewardBenefits).filter(
      reward => reward.benefit_type === 1
    );
    const discountItems = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 2);

    return (
      <SectionBackground>
        <Container>
          <SectionHeaderWithIcon
            icon="card_giftcard"
            title="Earn Rewards"
            subTitle="We’ve thrown out complicated points systems and all the games. Our Rewards Program is painless and easy to use. Just swipe your Evry Card at the register before paying to apply your discounts. It’s that Simple."
          />
        </Container>
        <SectionDivider />
        <Container>
          <Header>
            <Icon src={images['activity-in-circle']} />
            <div>
              <Title>Activity Items</Title>
              <Description>Complete these activities for extra rewards.</Description>
            </div>
          </Header>
          <Flex>
            {activityRewards.map(reward => (
              <ActivityReward
                layoutClass="half"
                key={reward.benefit_id}
                title={reward.benefit_display_name}
                description={reward.benefit_description}
              />
            ))}
          </Flex>
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
            <Flex>
              <ActivityReward layoutClass="third" title="Sporting Equipment" />
              <ActivityReward layoutClass="third" title="Nutrition Supplements" />
              <ActivityReward layoutClass="third" title="Frutis & Vegetables" />
              <ActivityReward layoutClass="third" title="Home Exercise Equipment" />
              <ActivityReward layoutClass="third" title="Family Planning Products" />
              <ActivityReward layoutClass="third" title="Vitamins" />
              <ActivityReward layoutClass="third" title="Weight Control Products" />
              <ActivityReward layoutClass="third" title="First Aid Supplies" />
              <ActivityReward layoutClass="third" title="Feminine Products" />
            </Flex>
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
          <Center>
            <button type="button" onClick={this.handlers.handleToggleClick}>
              {showFullDiscounts ? 'Show Less Discount Items' : 'See All Discount Items'}
            </button>
          </Center>
        </Container>
      </SectionBackground>
    );
  }
}

RewardsSection.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

export default RewardsSection;
