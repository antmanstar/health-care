import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { find, isEmpty, omit } from 'lodash';
import Moment from 'moment';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import DialAndNumbers from './DialAndNumbers';
import NoDeductibleMessage from './NoDeductibleMessage';
import Loader from '../../shared/Loader/Loader';
import Tip from '../../shared/desktop/Tooltip';
import constants from '@evry-member-app/shared/constants';
import Select from 'react-select';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { connect } from 'react-redux';

// This is the top summary section of the "My Coverage" view.

const { SectionBackground } = defaultTheme.components;
const { INDIVIDUAL, FAMILY, MEDICAL_DEDUCTIBLE, MEDICAL_MOOP, PRESCRIPTION_MOOP } = constants;

const { fetchAccumulators, fetchFileContent } = actions;
const { getToken, getDocuments } = selectors;

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  color: ${props => props.theme.colors.shades.blue};

  span {
    margin: 0 4px;
    font-weight: 700;
  }

  p {
    display: inline;
    margin: 0;
    font-weight: 300;
  }
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Filter = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  margin: 0 16px 0 0;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const Dials = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 32px 0;
  background: #fafafa;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const Link = styled.a`
  display: inline;
  margin: 0 2px 0 6px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.pinkOrange};

  &:hover {
    opacity: 0.7;
  }
`;

const DialSeparator = styled.div`
  width: 1px;
  margin: -32px 0;
  min-height: 128px;
  background: #eaeaea;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${props => props.theme.colors.shades.gray};

  > *:last-child {
    margin-left: 16px;
  }

  @media (max-width: 500px) {
    display: block;

    > *:last-child {
      margin-left: 0px;
      margin-top: 5px;
    }
  }
`;

const CoverageSummary = ({
  benefitType,
  accumulators,
  familyMembers,
  token,
  fetchAccumulators,
  documentList,
  fetchFileContent
}) => {
  const [isFamily, setIsFamily] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [options, setOptions] = useState([]);

  const findAccumulator = (accumulators, level, type) => {
    const accumulator = find(accumulators, {
      accumulators_level: level,
      accumulators_type: type
    });
    return accumulator || {};
  };

  const handleChange = selectedOption => {
    selectedOption.value !== 'Family' &&
      fetchAccumulators(token, selectedOption.value, new Date().toISOString(), 1);
    setSelectedOption({ value: selectedOption.value, label: selectedOption.label });
    setIsFamily(selectedOption.value === 'Family' ? true : false);
  };

  useEffect(() => {
    let members = [];
    if (familyMembers.length !== 0 && options.length === 0) {
      familyMembers.map(member =>
        members.push({
          value: member.id,
          label: `${member.first} ${member.last}`,
          relationship: member.relationship
        })
      );
      setOptions([...members, { value: 'Family', label: 'Family' }]);
      setSelectedOption(members[0]);
    }
  }, [familyMembers]);

  return (
    <SectionBackground>
      <Container>
        <FlexBetween>
          <SectionHeaderWithIcon
            icon="assessment"
            title={`Summary ${benefitType ? `(${benefitType})` : ''}`}
            subTitle="Your coverage at a glance."
            noCollaspe={true}
          />
          <FilterWrapper>
            <Filter>Filtered by:</Filter>
            <Select value={selectedOption} onChange={handleChange} options={options} />
          </FilterWrapper>
        </FlexBetween>
      </Container>
      {isEmpty(omit(accumulators, 'pending')) ? (
        <Loader />
      ) : (
        <>
          <Dials>
            {benefitType === 'EPO' ? (
              <NoDeductibleMessage benefitType={benefitType} />
            ) : (
              <DialAndNumbers
                label="Annual Deductible"
                sublabel="Medical"
                currentValue={
                  findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_DEDUCTIBLE)
                    .accumulated_amount
                }
                maxValue={
                  findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_DEDUCTIBLE)
                    .max_amount
                }
                color="orange"
              />
            )}
            <DialSeparator />
            <DialAndNumbers
              label="Out of Pocket Max"
              sublabel="Medical"
              currentValue={
                findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_MOOP)
                  .accumulated_amount
              }
              maxValue={
                findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, MEDICAL_MOOP)
                  .max_amount
              }
              color="blue"
            />
            <DialSeparator />
            <DialAndNumbers
              label="Out of Pocket Max"
              sublabel="Prescription"
              currentValue={
                findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, PRESCRIPTION_MOOP)
                  .accumulated_amount
              }
              maxValue={
                findAccumulator(accumulators, isFamily ? FAMILY : INDIVIDUAL, PRESCRIPTION_MOOP)
                  .max_amount
              }
              color="gray"
            />
          </Dials>
        </>
      )}
      <Container>
        <p>
          Preventative Care is
          <span>100% covered</span>
          on this plan.
        </p>
        <Link href="#">Undertand Your Benefits</Link>
        {`.`}
      </Container>
    </SectionBackground>
  );
};

CoverageSummary.propTypes = {
  benefitType: PropTypes.string,
  accumulators: PropTypes.shape({})
};

CoverageSummary.defaultProps = {
  benefitType: null,
  accumulators: null
};

const mapStateToProps = state => ({
  token: getToken(state),
  documentList: getDocuments(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAccumulators: (token, id, date, type) => {
    dispatch(fetchAccumulators(token, id, date, type));
  },
  fetchFileContent: (id, token) => {
    dispatch(fetchFileContent(token, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CoverageSummary);
