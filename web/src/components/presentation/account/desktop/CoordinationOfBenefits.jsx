/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallTitleAndButton from '../../shared/desktop/SmallTitleAndButton';
import actions from '@evry-member-app/shared/store/actions';

const { setModalData, showModal } = actions;

// Coordination of Benefits for a single member. For use in the Coordination of Benefits Section

// Import Reused Style Components
const { SpaceBetween, SectionDivider } = defaultTheme.components;

const Wrapper = styled.div`
  width: 48%;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  box-sizing: border-box;

  .small-title-heading {
    font-size: 20px;
  }

  @media ${props => props.theme.device.desktop} {
    .small-title-heading {
      font-size: 24px;
    }
  }
`;

const Type = styled.p`
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const Status = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const CoordinationOfBenefits = ({
  name,
  has_medicare: hasMedicare,
  has_other_health_coverage: hasOtherHealthCoverage,
  member_cob_id: id,
  showModal,
  setModalData
}) => {
  const handleUpdateClick = data => {
    setModalData(data);
    showModal('UPDATE_COORDINATION_OF_BENEFITS');
  };

  return (
    <Wrapper key={id}>
      <SmallTitleAndButton
        text={`${name}`}
        buttonText="Update"
        onClick={() => handleUpdateClick({ name })}
      />
      <SpaceBetween>
        <Type>Medicare</Type>
        <Status>{hasMedicare ? 'YES' : 'NO'}</Status>
      </SpaceBetween>
      <SectionDivider />
      <SpaceBetween>
        <Type>Other Health Coverage</Type>
        <Status>{hasOtherHealthCoverage ? 'YES' : 'NO'}</Status>
      </SpaceBetween>
    </Wrapper>
  );
};

CoordinationOfBenefits.propTypes = {
  name: PropTypes.shape({
    first: PropTypes.string,
    middle: PropTypes.string,
    last: PropTypes.string
  }),
  has_medicare: PropTypes.bool,
  has_other_health_coverage: PropTypes.bool,
  member_cob_id: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired
};

CoordinationOfBenefits.defaultProps = {
  name: {
    toString() {
      return '';
    }
  },
  has_medicare: null,
  has_other_health_coverage: null,
  member_cob_id: null
};

const mapDispatchToProps = dispatch => ({
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CoordinationOfBenefits);
