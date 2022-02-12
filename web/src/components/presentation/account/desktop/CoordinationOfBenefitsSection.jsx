import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SectionHeader from '../../shared/desktop/SectionHeader';
import CoordinationOfBenefits from './CoordinationOfBenefits';
import Loader from '../../shared/Loader/Loader';
import styled from 'styled-components';

// Coordination of Benefits Section from the "Account Settings" View

const {
  SectionBackground,
  Container,
  SectionDivider,
  TwoColumnRow,
  SpaceBetween
} = defaultTheme.components;

const EditedTwoColumnRow = styled(TwoColumnRow)`
  flex-direction: column;

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: row;
  }
`;

const EditedContainer = styled(Container)`
  padding-top: 0;
`;

class CoordinationOfBenefitsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { familyMembers } = this.props;
    
    return (
      <SectionBackground>
        <Container>
          <SpaceBetween>
            <div>
              <SectionHeader
                title="Coordination of Benefits"
                subTitle="Let us know if you have other benefits. This helps us pay claims faster."
              />
            </div>
          </SpaceBetween>
        </Container>
        <SectionDivider />
        <EditedContainer>
          {!familyMembers && <Loader />}
          {familyMembers &&
            familyMembers
              .map(familyMember => <CoordinationOfBenefits {...familyMember} />)
              .reduce((prev, component, i, { length }) => {
                const curr = prev.slice();

                if (i % 2 === 0) {
                  curr.push([]);
                }

                curr[curr.length - 1].push(component);

                if (i % 2 !== 0 || i === length - 1) {
                  curr[curr.length - 1] = <EditedTwoColumnRow>{curr[curr.length - 1]}</EditedTwoColumnRow>;
                }
                return curr;
              }, [])}
        </EditedContainer>
      </SectionBackground>
    );
  }
}

CoordinationOfBenefitsSection.propTypes = {
  familyMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string,
        middle: PropTypes.string,
        last: PropTypes.string
      }),
      has_medicare: PropTypes.bool,
      has_other_health_coverage: PropTypes.bool,
      member_cob_id: PropTypes.number
    })
  )
};

CoordinationOfBenefitsSection.defaultProps = {
  familyMembers: []
};

export default CoordinationOfBenefitsSection;
