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
  color: ${props => props.theme.colors.shades.darkGray};
  font-size: 12px;

  a {
    margin: 0 2px 0 4px;
    color: ${props => props.theme.colors.shades.pinkOrange};
    &:hover {
      opacity: 0.7;
    }
    font-size: 16px;
    font-weight: 400;
  }
`;

const EducationAndResourcesSection = React.memo(({ educationalResources }) => {
  console.log('ER', educationalResources);
  return (
    <SectionBackground>
      <Container>
        <SectionHeaderWithIcon
          icon="library_books"
          title="Education & Resources"
          subTitle="Explore our list of articles and learning materials specifically curated for you."
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
                buttonLabel="Read More"
              />
            ))}
          </ArticleList>
        )}
      </Container>
      <SectionDivider />
      <Container>
        <Title>Further Reading</Title>
        <SubTitle>
          {`Our Help Center is filled to the brim with useful articles and guides to help you navigate every aspect of your health condition. Want to explore more incredible resources?`}
          <span style={{ display: 'inherit' }}>
            {`Check out our `}
            <a href="www.google.com">Help Center</a>
          </span>
        </SubTitle>
      </Container>
    </SectionBackground>
  );
});

EducationAndResourcesSection.propTypes = {
  educationalResources: PropTypes.PropTypes.shape({}).isRequired
};

export default EducationAndResourcesSection;
