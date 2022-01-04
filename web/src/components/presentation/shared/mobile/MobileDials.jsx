import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import styled from 'styled-components';
import MobileDialAndNumbers from './MobileDialAndNumbers';
import constants from '@evry-member-app/shared/constants';

const { INDIVIDUAL, FAMILY, MEDICAL_DEDUCTIBLE, MEDICAL_MOOP, PRESCRIPTION_MOOP } = constants;

const Slider = styled.div`
  display: flex;
  padding: 0 16px 16px;
  margin-bottom: -32px;
  overflow-x: scroll;
  box-sizing: border-box;

  > * {
    margin-right: 8px;

    &:last-child {
      padding-right: 16px;
    }
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

class MobileDials extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  findAccumulator = (accumulators, level, type) => {
    const accumulator = find(accumulators, {
      accumulators_level: level,
      accumulators_type: type
    });
    return accumulator || {};
  };

  render() {
    const { benefitType, accumulators, isFamily } = this.props;

    return (
      <Slider>
        {benefitType === 'EPO' ? (
          <MobileDialAndNumbers noDeductible color="orange" />
        ) : (
          <MobileDialAndNumbers
            label="Annual Deductible"
            sublabel="Medical"
            currentValue={
              this.findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_DEDUCTIBLE)
                .accumulated_amount
            }
            maxValue={
              this.findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_DEDUCTIBLE)
                .max_amount
            }
            color="orange"
          />
        )}
        <MobileDialAndNumbers
          label="Out of Pocket Max"
          sublabel="Medical"
          currentValue={
            this.findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_MOOP)
              .accumulated_amount
          }
          maxValue={
            this.findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_MOOP)
              .max_amount
          }
          color="blue"
        />
        <MobileDialAndNumbers
          label="Out of Pocket Max"
          sublabel="Prescription"
          currentValue={
            this.findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, PRESCRIPTION_MOOP)
              .accumulated_amount
          }
          maxValue={
            this.findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, PRESCRIPTION_MOOP)
              .max_amount
          }
          color="gray"
        />
      </Slider>
    );
  }
}

MobileDials.propTypes = {
  benefitType: PropTypes.string,
  accumulators: PropTypes.shape({}),
  isFamily: PropTypes.bool.isRequired
};

MobileDials.defaultProps = {
  benefitType: null,
  accumulators: null
};

export default MobileDials;
