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

import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// Meet Your Goals Section found on "Care Plan" View.
// TODO: Programs need icons, colors, and urls (for onClick)

const StyledCarouselProvider = styled(CarouselProvider)`
  position: relative;
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  min-height: 180px;
  &:first-child {
    will-change: unset;
  }
`;

const { SectionBackground, Container, SectionDivider, TwoColumnRow } = defaultTheme.components;

const MeetYourGoalsSection = React.memo(({ wellnessGoals }) => {
  const width = getWidth();
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);

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

  return (
    <SectionBackground>
      <Container>
        <SectionHeaderWithIcon
          icon="meet-goals"
          title="Meet Your Goals"
          subTitle="We have partnered with amazing programs to provide the best resources at a discount."
          svgIcon
          onClick={handelHeaderToggleClick}
          collapsed={collapsed}
        />
      </Container>
      {!collapsed && (
        <>
          {!goals ? (
            <Loader />
          ) : (
            goals.map(goal => (
              <React.Fragment key={goal.sectionTitle}>
                <SectionDivider />
                <Container>
                  <CollapsibleSection title={goal.sectionTitle} visible>
                    {width > 768 ? (
                      <TwoColumnRow>
                        {goal.programs.map(program => (
                          <ProgramCard
                            key={program.wellness_goal_id}
                            title={program.wellness_goal_name}
                            desc={program.wellness_goal_description}
                            actionText="Sign up for this program"
                            icon="apple-blue"
                            color="blue"
                          />
                        ))}
                      </TwoColumnRow>
                    ) : (
                      <StyledCarouselProvider
                        naturalSlideWidth={width - 30}
                        naturalSlideHeight={140}
                        totalSlides={goal.programs.length}
                        visibleSlides={2}
                      >
                        <StyledSlider>
                          {goal.programs.map((program, index) => (
                            <Slide index={index} key={index}>
                              <ProgramCard
                                key={program.wellness_goal_id}
                                title={program.wellness_goal_name}
                                desc={program.wellness_goal_description}
                                actionText="Sign up for this program"
                                icon="apple-blue"
                                color="blue"
                              />
                            </Slide>
                          ))}
                        </StyledSlider>
                      </StyledCarouselProvider>
                    )}
                  </CollapsibleSection>
                </Container>
              </React.Fragment>
            ))
          )}
        </>
      )}
    </SectionBackground>
  );
});

MeetYourGoalsSection.propTypes = {
  wellnessGoals: PropTypes.shape({}).isRequired
};

export default MeetYourGoalsSection;
