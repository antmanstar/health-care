/* eslint no-shadow: ["error", { "allow": ["activePlan", "plans"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CarePlanBox from './CarePlanBox';
import Button from '../../shared/desktop/Button';
import { carePlans } from '../../../../content';

// This is for selecting a care plan during registration / onboarding

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;

  @media ${props => props.theme.device.tabletXL} {
    flex-wrap: unset;
  }
`;

const Information = styled.div`
  margin-bottom: 32px;
  padding: 32px 0;
  color: ${props => props.theme.colors.shades.blue};
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
`;

class CarePlanSelectionSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [...carePlans]
    };
  }

  getActivePlan() {
    const { plans } = this.state;
    return plans.find(plan => plan.active);
  }

  render() {
    const { plans } = this.state;
    const activePlan = this.getActivePlan();

    return (
      <>
        <Options>
          {plans.map(({ desc, ...props }, i) => (
            <CarePlanBox
              {...props}
              key={props.title}
              onClick={() => {
                const { plans } = this.state;
                this.setState({
                  plans: plans.map((plan, j) => ({
                    ...plan,
                    active: i === j ? true : false
                  }))
                });
              }}
            />
          ))}
        </Options>
        <Information>
          <Title>{activePlan && activePlan.title}</Title>
          <Description>{activePlan && activePlan.desc}</Description>
        </Information>
        <Button
          text="Choose Plan"
          onClick={() => {
            const { handleCarePlanSelection } = this.props;
            const activePlan = this.getActivePlan();
            if (activePlan) {
              handleCarePlanSelection(activePlan.id);
            }
          }}
          disabled={this.props.isChoosingCarePlan}
        />
      </>
    );
  }
}

CarePlanSelectionSlide.propTypes = {
  handleCarePlanSelection: PropTypes.func.isRequired,
  isChoosingCarePlan: PropTypes.bool
};

export default CarePlanSelectionSlide;
