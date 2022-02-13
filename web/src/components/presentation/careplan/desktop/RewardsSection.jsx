import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ActivityReward from './ActivityReward';
import getWidth from '../../../../utils/getWidth';
import RewardsBenefit from './RewardsBenefit';

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

const RewardsSection = ({ rewardBenefits, rewardCategories }) => {
  const width = getWidth();
  const [showRewards, setShowRewards] = useState(true);
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);

  useEffect(() => {
    width > 768 && setCollapsed(false);
  }, [width]);

  const activityRewards = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 1);

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
            onClick={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
        </StyledContainer>
        {!collapsed && (
          <>
            <StyledSectionDivider />
            <Center>
              <button type="button" onClick={() => setShowRewards(!showRewards)}>
                {!showRewards ? 'Show Rewards' : 'Hide Rewards'}
              </button>
              {width > 768 && (
                <ExpandIconWrapper onClick={() => setShowRewards(!showRewards)}>
                  <div>{!showRewards ? 'Open' : 'Collapse'}</div>
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
      {!collapsed && (
        <RewardsBenefit
          rewardBenefits={rewardBenefits}
          rewardCategories={rewardCategories}
        ></RewardsBenefit>
      )}
    </>
  );
};

RewardsSection.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

export default RewardsSection;
