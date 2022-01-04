import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import CollapsibleSection from '../../shared/desktop/CollapsibleSection';
import ProgramCard from './ProgramCard';
import Loader from '../../shared/Loader/Loader';

// Meet Your Goals Section found on "Care Plan" View.
// TODO: Programs need icons, colors, and urls (for onClick)

const { SectionBackground, Container, SectionDivider, TwoColumnRow } = defaultTheme.components;

const MeetYourGoalsSection = React.memo(({ wellnessGoals }) => {
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

  return (
    <SectionBackground>
      <Container>
        <SectionHeaderWithIcon
          icon="meet-goals"
          title="Meet Your Goals"
          subTitle="We have partnered with these amazing wellness programs to provide you discounted or FREE access to the best resources."
          svgIcon
        />
      </Container>

      {!goals ? (
        <Loader />
      ) : (
        goals.map(goal => (
          <React.Fragment key={goal.sectionTitle}>
            <SectionDivider />
            <Container>
              <CollapsibleSection title={goal.sectionTitle} visible>
                <TwoColumnRow>
                  {goal.programs.map(program => (
                    <ProgramCard
                      key={program.wellness_goal_id}
                      title={program.wellness_goal_name}
                      desc={program.wellness_goal_description}
                      actionText="Sign up for this program"
                    />
                  ))}
                </TwoColumnRow>
              </CollapsibleSection>
            </Container>
          </React.Fragment>
        ))
      )}
    </SectionBackground>
  );
});

MeetYourGoalsSection.propTypes = {
  wellnessGoals: PropTypes.shape({}).isRequired
};

export default MeetYourGoalsSection;
