import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ArticleCard from '../../shared/desktop/ArticleCard';
import LinkList from './LinkList';
import HelpArticleLink from '../../shared/desktop/HelpArticleLink';
import truncate from '../../../../utils/string';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../../shared/Loader/Loader';
import withStoreData from '../../../containers/base/withStoreData';

const { fetchFAQs, fetchSupportArticles } = actions;
const { getFAQs, getSupportArticles, getToken } = selectors;

// This is the Support Articles Component

const {
  SectionBackground,
  Container,
  SectionDivider,
  SpaceBetween,
  TwoColumnRow
} = defaultTheme.components;

const SmallContainer = styled.div`
  width: 48%;

  &:first-child {
    margin-bottom: 16px;
  }

  @media ${defaultTheme.device.tabletXL} {
    &:first-child {
      margin-bottom: 0;
    }
  }
`;

const H3 = styled.h3`
  color: ${props => props.theme.colors.shades.blue};
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 30px;
`;

const ArticleList = styled(SpaceBetween)`
  flex-wrap: wrap;
  margin-bottom: -32px;
`;

const Description = styled.p`
  margin: 0 0 32px;
`;

const SupportArticlesSection = ({ supportArticles, faqs }) => (
  <SectionBackground>
    <Container>
      <SectionHeaderWithIcon
        title="Support Articles"
        subTitle="We have loads of articles and guides about using our products and services."
        icon="library_books"
      />
    </Container>
    <SectionDivider />
    <Container>
      <ArticleList>
        {isEmpty(supportArticles) ? (
          <Loader />
        ) : (
          supportArticles.data.map(article => (
            <ArticleCard
              key={article.support_article_id}
              image="http://lorempixel.com/400/200/sports"
              title={article.support_article_title}
              desc={truncate(130)(article.support_article_summary)}
            />
          ))
        )}
      </ArticleList>
    </Container>
    <SectionDivider />
    <Container>
      <TwoColumnRow>
        <SmallContainer>
          <H3>Frequently Asked Questions</H3>
          <LinkList>
            {isEmpty(faqs) ? (
              <Loader />
            ) : (
              faqs.data.map(faq => (
                <li key={faq.support_article_id}>
                  <a href="http://www.google.com">{faq.support_article_title}</a>
                </li>
              ))
            )}
          </LinkList>
          <p>To view more articles, visit our Help Center.</p>
        </SmallContainer>
        <SmallContainer>
          <H3>Evry&apos;s Help Center</H3>
          <Description>
            Evry has an extensive help center full of articles, guides, and faqs to help you
            navigate your health journey. We have nutrition advice, exercise guides, and plenty of
            articles to make your life easier.
          </Description>
          <HelpArticleLink text="Visit our Help Center" url="http://www.google.com" />
        </SmallContainer>
      </TwoColumnRow>
    </Container>
  </SectionBackground>
);

SupportArticlesSection.propTypes = {
  faqs: PropTypes.shape({}).isRequired,
  supportArticles: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  token: getToken(state),
  supportArticles: getSupportArticles(state),
  faqs: getFAQs(state)
});

const mapDispatchToProps = dispatch => ({
  fetchSupportArticles: args => {
    dispatch(fetchSupportArticles(args));
  },
  fetchFAQs: args => {
    dispatch(fetchFAQs(args));
  }
});

const mergeProps = ({ token, ...stateProps }, { fetchFAQs, fetchSupportArticles }, ownProps) => ({
  fetch: {
    faqs: args => {
      fetchFAQs({ token, ...args });
    },
    supportArticles: args => {
      fetchSupportArticles({ token, ...args });
    }
  },
  shouldFetch: {
    faqs: isEmpty(stateProps.faqs),
    supportArticles: isEmpty(stateProps.supportArticles)
  },
  ...stateProps,
  ...ownProps
});

export default withStoreData(
  SupportArticlesSection,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
);
