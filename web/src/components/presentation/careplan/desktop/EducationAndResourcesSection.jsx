import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ArticleCard from '../../shared/desktop/ArticleCard';
import Loader from '../../shared/Loader/Loader';
import truncate from '../../../../utils/string';

// Education & Resources Section found on the "Care Plan" View.
// TODO: Pass props through to SectionHeaders and ArticleCards
// WAITING: Jong still needs to provide endpoints for this

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const ArticleList = styled(SpaceBetween)`
  flex-wrap: wrap;
  margin-bottom: -32px;

  ::after {
    content: '';
    flex: 0 0 32%;
  }
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.colors.shades.blue};
`;

const SubTitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.darkGray};

  a {
    margin: 0 2px 0 4px;
    color: ${props => props.theme.colors.shades.pinkOrange};
    &:hover {
      opacity: 0.7;
    }
  }
`;

const EducationAndResourcesSection = React.memo(({ educationalResources }) => (
  <SectionBackground>
    <Container>
      <SectionHeaderWithIcon
        icon="library_books"
        title="Education & Resources"
        subTitle="Explore our list of articles and educational content specifically curated for you. We want to provide you with everything you need to be successful on your personal health journey."
      />
    </Container>
    <SectionDivider />
    <Container>
      {!educationalResources ? (
        <Loader />
      ) : (
        <ArticleList>
          {Object.values(educationalResources).map(resource => (
            <ArticleCard
              key={resource.educational_resource_id}
              image={resource.title_image_file_id}
              title={resource.educational_resource_title}
              desc={truncate(130)(resource.educational_resource_summary)}
              link={resource.educational_resource_content}
            />
          ))}
        </ArticleList>
      )}
    </Container>
    <SectionDivider />
    <Container>
      <Title>Further Reading</Title>
      <SubTitle>
        {`Check out our `}
        <a href="www.google.com">Help Center</a>
        {` for useful articles and guides to help you navigate every aspect of your health condition. We’re adding new content constantly, so come back often.`}
      </SubTitle>
    </Container>
  </SectionBackground>
));

EducationAndResourcesSection.propTypes = {
  educationalResources: PropTypes.PropTypes.shape({}).isRequired
};

export default EducationAndResourcesSection;
