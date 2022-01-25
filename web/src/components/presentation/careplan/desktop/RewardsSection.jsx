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
  margin: 24px 0;
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
  right: 0;

  div {
    font-size: 12px;
    color: ${props => props.theme.colors.shades.gray};
  }
`;

const StyledIcon = styled.i`
  color: ${props => props.theme.colors.shades.white};
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

    const rewards = [
      {
        benefit_display_name: 'Meet you Card Guide.',
        benefit_description:
          'Schedule a call to meet your personal healthcare concierge. Learn about how we can make your life easier.',
        benefit_btn_text: 'Contact Care Guide',
        benefit_earned: 25,
        benefit_id: 1
      },
      {
        benefit_display_name: 'Check in with a Doctor.',
        benefit_description:
          'Get a free check up via Telehealth from right where you are sitting. We’ll even throw in an extra reward for taking the time.',
        benefit_btn_text: 'Talk to a Doctor',
        benefit_earned: 25,
        benefit_id: 2
      },
      {
        benefit_display_name: 'Speak with a Nutritionist.',
        benefit_description: 'Get a custom nutrition plan that’s right for you. It’s free!',
        benefit_btn_text: 'Talk to a Nutritionist',
        benefit_earned: 25,
        benefit_id: 3
      },
      {
        benefit_display_name: 'Health Survey Coming Soon...',
        benefit_description:
          'Soon you can fill out our Health Survey and earn $100! It takes about 15 minutes and will help us better serve you.',
        benefit_id: 4
      }
    ];

    return (
      <SectionBackground>
        <Container>
          <SectionHeaderWithIcon
            icon="card_giftcard"
            title="Rewards"
            subTitle="Our Rewards Program is very easy to use. Pay with your Evry card at Walmart and get discounts on us."
            subTitleTail="It’s that Simple."
          />
        </Container>
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
            {rewards.map(reward => (
              <ActivityReward
                layoutClass="reward"
                key={reward.benefit_id}
                title={reward.benefit_display_name}
                description={reward.benefit_description}
                buttonText={reward.benefit_btn_text}
                earned={reward.benefit_earned}
              />
            ))}
          </Flex>
          <StyledSectionDivider />
          <Center>
            <button type="button" onClick={this.handlers.handleToggleClick}>
              See More Rewards
            </button>
            <ExpandIconWrapper>Open</ExpandIconWrapper>
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
          <DiscountFlex>
            <ActivityReward layoutClass="discount" title="Fresh fruits & vegetables" />
            <ActivityReward layoutClass="discount" title="Fitness Equipment" />
            <ActivityReward layoutClass="discount" title="Vitamins & Supplements" />
            <ActivityReward layoutClass="discount" title="Health Products" />
            <ActivityReward layoutClass="discount" title="Fresh fruits & vegetables" />
            <ActivityReward layoutClass="discount" title="Perscription Medication" />
          </DiscountFlex>
          <StyledSectionDivider />
          <Center>
            <button type="button" onClick={this.handlers.handleToggleClick}>
              See More Discounts
            </button>
            <ExpandIconWrapper>
              <div>Open</div>
              <StyledIcon className="material-icons">Arrow</StyledIcon>
            </ExpandIconWrapper>
          </Center>
          <StyledSectionDivider />
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
