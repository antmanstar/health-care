/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SupportRequestList from './SupportRequestList';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SmallButton from '../../shared/desktop/SmallButton';
import Pagination from '../../shared/desktop/Pagination';
import Loader from '../../shared/Loader/Loader';

// This is the Support Requests Section

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const InnerWrapper = styled.div`
  @media (max-width: 549px) {
    margin-top: 15px;
  }

  & > * {
    display: inline-block;
    margin-left: 15px;
  }
`;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SectionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 550px) {
    justify-content: space-between;
  }
`;

const SectionHeaderItem = styled.div`
  width: 100%;

  @media (min-width: 550px) {
    width: auto;
  }
`;

const SupportRequestsSection = ({ paginator, requests, showCompleted, showModal }) => (
  <>
    <SectionBackground>
      <Container>
        <SectionHeaderWrapper>
          <SectionHeaderWithIcon
            title="Support Requests"
            subTitle="View your pending requests or submit a new one."
            icon="question_answer"
          />
          <InnerWrapper>
            <SmallButton
              text="New Support Request"
              onClick={() => {
                showModal('SUBMIT_NEW_SUPPORT_REQUEST');
              }}
            />
          </InnerWrapper>
        </SectionHeaderWrapper>
      </Container>
      <SectionDivider />
      <Container>
        {isEmpty(requests) ? (
          <Loader />
        ) : (
          <SupportRequestList showCompleted={showCompleted} list={requests} />
        )}
      </Container>
    </SectionBackground>
    <PaginationWrapper>{paginator && <Pagination paginator={paginator} />}</PaginationWrapper>
  </>
);

SupportRequestsSection.propTypes = {
  paginator: PropTypes.shape({}),
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  showCompleted: PropTypes.func,
  showModal: PropTypes.func
};

SupportRequestsSection.defaultProps = {
  paginator: {},
  requests: [],
  showCompleted: () => {},
  showModal: () => {}
};

export default SupportRequestsSection;
