import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import CollapsibleSection from '../../shared/desktop/CollapsibleSection';
import ProgramCard from './ProgramCard';
import Loader from '../../shared/Loader/Loader';
import getWidth from '../../../../utils/getWidth';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

// Meet Your Goals Section found on "Care Plan" View.
// TODO: Programs need icons, colors, and urls (for onClick)

const { SectionBackground, Container, SectionDivider, TwoColumnRow } = defaultTheme.components;

const StyledSectionBackground = styled(SectionBackground)`
  @media ${props => props.theme.device_up.tablet} {
    margin: 0 auto 16px;
  }
`;

const StyledContainer = styled(Container)`
  @media ${props => props.theme.device_up.tablet} {
    padding: 20px;
  }
`;

const MeetYourGoalsSection = React.memo(({ wellnessGoals }) => {
  const width = getWidth();
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  console.log('Data', wellnessGoals);

  useEffect(() => {
    width > 768 && setCollapsed(false);
  }, [width]);

  const organizeGoals = goals => {
    const newGoals = Object.values(goals).reduce((acc, goal) => {
      const section = goal.wellness_goal_categories[0].wellness_goal_category_name;

      if (acc.length !== 0) {
        acc.map(item => item.sectionTitle === section && item.programs.push(goal));
      }

      if (!find(acc, { sectionTitle: section })) {
        return acc.concat({ sectionTitle: section, programs: [goal] });
      }

      return acc;
    }, []);

    return newGoals;
  };
  const goals = organizeGoals(wellnessGoals);

  const handelHeaderToggleClick = () => {
    setCollapsed(!collapsed);
  };

  const setActiveIndex = newIndex => {
    setActiveSlideIndex(newIndex);
  };

  return (
    <StyledSectionBackground id="meetyourgoals">
      <StyledContainer>
        <SectionHeaderWithIcon
          icon="meet-goals"
          title="Meet Your Goals"
          subTitle={
            width > 768
              ? 'We have partnered with amazing programs to provide the best resources at a discount.'
              : 'Free & Discounted health programs.'
          }
          svgIcon
          onClick={handelHeaderToggleClick}
          collapsed={collapsed}
        />
      </StyledContainer>
      {!collapsed && (
        <>
          {!goals ? (
            <Loader />
          ) : (
            goals.map(goal => (
              <React.Fragment key={goal.sectionTitle}>
                <SectionDivider />
                <StyledContainer>
                  <CollapsibleSection title={goal.sectionTitle} visible>
                    {width > 768 ? (
                      <TwoColumnRow style={{ flexWrap: 'wrap' }}>
                        {goal.programs.map(program => (
                          <ProgramCard
                            key={program.wellness_goal_id}
                            title={program.wellness_goal_name}
                            desc={program.wellness_goal_description}
                            actionText="Sign up for this program"
                            icon="apple-blue"
                            color="blue"
                            onClick={() => window.open('https://www.omadahealth.com')}
                          />
                        ))}
                      </TwoColumnRow>
                    ) : (
                      <Carousel
                        withoutControls={true}
                        cellSpacing={16}
                        slideWidth={0.8}
                        scrollMode="page"
                      >
                        {goal.programs.map(program => (
                          <ProgramCard
                            key={program.wellness_goal_id}
                            title={program.wellness_goal_name}
                            desc={program.wellness_goal_description}
                            actionText="Sign up for this program"
                            icon="apple-blue"
                            color="blue"
                            onClick={() => window.open('https://www.omadahealth.com')}
                          />
                        ))}
                      </Carousel>
                    )}
                  </CollapsibleSection>
                </StyledContainer>
              </React.Fragment>
            ))
          )}
        </>
      )}
    </StyledSectionBackground>
  );
});

MeetYourGoalsSection.propTypes = {
  wellnessGoals: PropTypes.shape({}).isRequired
};

export default MeetYourGoalsSection;
