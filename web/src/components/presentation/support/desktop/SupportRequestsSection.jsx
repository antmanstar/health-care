/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, set } from 'lodash';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SupportRequestList from './SupportRequestList';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SmallButton from '../../shared/desktop/SmallButton';
import Pagination from '../../shared/desktop/Pagination';
import Loader from '../../shared/Loader/Loader';
import getWidth from '../../../../utils/getWidth';
import PostSectionNote from '../../shared/desktop/PostSectionNote';
// This is the Support Requests Section

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: canter;
  margin-top: 15px;
  @media ${defaultTheme.device.tablet} {
    width: auto;
    justify-content: right;
  }

  & > * {
    display: inline-block;
    margin-left: 15px;
  }
`;

const PaginationWrapper = styled.div`
  /* position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 24px;
  gap: 20px;

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: row;

    div:last-child {
      position: absolute;
      right: 0;
    }
  }
`;

const SectionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  @media ${defaultTheme.device.mobile} {
    justify-content: space-between;
  }
`;
const StyledContainer = styled(Container)`
  padding: none;
  @media ${props => props.theme.device.tablet} {
    //padding: 20px 20px 12px 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
const StyledSectionHeaderWithIcon = styled(SectionHeaderWithIcon)`
  width: 100%;
  border: 5px;
  & div {
    width: 100%;
    border: 5px;
  }
  & div div {
    width: 100%;
  }
`;

const SectionHeaderItem = styled.div`
  width: 100%;

  @media ${defaultTheme.device.mobile} {
    width: auto;
  }
`;

const SupportRequestsSection = ({
  paginator,
  requests,
  showCompleted,
  showModal,
  requestsDataFrame
}) => {
  const width = getWidth();
  const [collapsed, setCollapsed] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleToggleClick = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    width > 768 && setCollapsed(false);
  }, [width]);

  return (
    <>
      <SectionBackground>
        <StyledContainer>
          {/* <SectionHeaderWrapper>
            <StyledSectionHeaderWithIcon
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
          </SectionHeaderWrapper> */}
          <SectionHeaderWithIcon
            title="Support Requests"
            subTitle="View your pending requests or submit a new one."
            icon="question_answer"
            onClick={handleToggleClick}
            collapsed={collapsed}
          />
          <InnerWrapper>
            <SmallButton
              text="New Support Request"
              onClick={() => {
                showModal('SUBMIT_NEW_SUPPORT_REQUEST');
              }}
            />
          </InnerWrapper>
        </StyledContainer>
        {!collapsed && (
          <>
            <SectionDivider />
            <Container>
              <SupportRequestList showCompleted={showCompleted} list={requests}>
                {isEmpty(requests) &&
                (!requestsDataFrame ||
                  (requestsDataFrame && requestsDataFrame.status === 'QUERYING')) ? (
                  <Loader />
                ) : (
                  ''
                )}
                {isEmpty(requests) &&
                requestsDataFrame &&
                requestsDataFrame.status === 'COMPLETE' ? (
                  <p>0 results.</p>
                ) : (
                  ''
                )}
              </SupportRequestList>
            </Container>
          </>
        )}
      </SectionBackground>

      {!collapsed && (
        <PaginationWrapper>
          {!toggle ? (
              <PostSectionNote 
                text="Looking for a completed request?"
                linkText='Show Completed Requests'
                handleClick={() => {
                  showCompleted(true)
                  setToggle(true)
                } }
              />
          ) : (
            <PostSectionNote 
                text="Looking for just pending requests?"
                linkText='Show Pending Requests'
                handleClick={() => {
                  showCompleted(false)
                  setToggle(false)
                }}
              />
          )}
          {paginator && <Pagination paginator={paginator} />}
        </PaginationWrapper>
      )}
      {/* {!collapsed && <PaginationWrapper>{paginator && <Pagination paginator={paginator} />}</PaginationWrapper>} */}
    </>
  );
};

SupportRequestsSection.propTypes = {
  paginator: PropTypes.shape({}),
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  showCompleted: PropTypes.func,
  showModal: PropTypes.func,
  casesObject: PropTypes.shape({})
};

SupportRequestsSection.defaultProps = {
  paginator: {},
  requests: [],
  showCompleted: () => {},
  showModal: () => {},
  casesObject: {}
};

export default SupportRequestsSection;
