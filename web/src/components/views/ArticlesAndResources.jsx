import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import MobileArticleCard from '../presentation/careplan/mobile/MobileArticleCard';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';
import Loader from '../presentation/shared/Loader/Loader';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Helmet } from 'react-helmet-async';

const { fetchEducationalResources } = actions;
const { getToken, getEducationalResources } = selectors;

// MOBILE: Care Plan - Articles & Resources View

const { MobileContentWrapper, SectionDivider } = defaultTheme.components;

const MobileSectionDivider = styled(SectionDivider)`
  margin: 16px 0;
  border-color: #ebebeb;
`;

const SeeAllButtonWrapper = styled.div`
  margin-bottom: 16px;
`;

const ArticlesAndResources = ({ educationalResources }) => (
  <MobileContentWrapper>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
    {!educationalResources ? (
      <Loader />
    ) : (
      Object.values(educationalResources).map(resource => (
        <MobileArticleCard
          key={resource.educational_resource_id}
          image={resource.title_image_file_id}
          title={resource.educational_resource_title}
          desc={resource.educational_resource_summary}
          link={resource.educational_resource_content}
        />
      ))
    )}
    <MobileSectionDivider />
    <SeeAllButtonWrapper>
      <MobileActionButton text="See all articles" type="action" />
    </SeeAllButtonWrapper>
  </MobileContentWrapper>
);

const ArticlesAndResourcesWithData = withStoreData(
  ArticlesAndResources,
  state => ({
    token: getToken(state),
    educationalResources: getEducationalResources(state)
  }),
  dispatch => ({
    fetchEducationalResources: token => dispatch(fetchEducationalResources(token))
  }),
  ({ token, ...stateProps }, { fetchEducationalResources }, ownProps) => ({
    fetch: () => {
      fetchEducationalResources(token);
    },
    shouldFetch: isEmpty(stateProps.educationalResources),
    ...stateProps,
    ...ownProps
  })
);

ArticlesAndResources.propTypes = {
  educationalResources: PropTypes.shape({}).isRequired
};

const reflection = {
  component: ArticlesAndResourcesWithData,
  layout: Mobile,
  layoutProps: {
    title: 'Articles & Resources',
    subtitle:
      'Explore our library of articles and learning materials specifically curated for you.',
    icon: 'library_books',
    titleType: 'standard',
    navProps: {
      left: 'back'
    }
  },
  route: '/articles-and-resources'
};

export default ArticlesAndResourcesWithData;

export { reflection };
