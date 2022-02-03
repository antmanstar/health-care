import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import ArticleCard from '../../shared/desktop/ArticleCard';
import Loader from '../../shared/Loader/Loader';
import truncate from '../../../../utils/string';
import getWidth from '../../../../utils/getWidth';

// Education & Resources Section found on the "Care Plan" View.
// TODO: Pass props through to SectionHeaders and ArticleCards
// WAITING: Jong still needs to provide endpoints for this

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const StyledSectionBackground = styled(SectionBackground)`
  @media ${props => props.theme.device_up.tablet} {
    margin: 0 auto 16px;
  }
`;

const StyledContainer = styled(Container)`
  @media ${props => props.theme.device_up.tablet} {
    padding: 20px;
  }
`;

const ArticleList = styled(SpaceBetween)`
  flex-wrap: wrap;
  margin-bottom: -32px;

  @media ${props => props.theme.device_up.mobile} {
    justify-content: center;
    flex-direction: column;
  }

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

const Center = styled.div`
  display: flex;
  justify-content: center;

  p {
    margin: 0 4px 0 0;
    color: ${props => props.theme.colors.shades.gray};
  }

  button {
    padding: 0;
    font-size: 12px;
    font-weight: 300;
    color: ${props => props.theme.colors.shades.lightTealBlue};
    border: none;
    border-radius: 4px;
    outline: none;
    background: none;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const EducationAndResourcesSection = React.memo(({ educationalResources }) => {
  console.log(educationalResources);
  const width = getWidth();
  const [collapsed, setCollapsed] = useState(width > 768 ? false : true);
  const [showFullResources, setShowFullResources] = useState(false);

  useEffect(() => {
    width > 768 && setCollapsed(false);
    setShowFullResources(width > 768);
  }, [width]);

  const handelHeaderToggleClick = () => {
    setCollapsed(!collapsed);
  };

  const handleResourcesToggleClick = () => {
    setShowFullResources(!showFullResources);
  };

  return (
    <StyledSectionBackground>
      <StyledContainer>
        <SectionHeaderWithIcon
          icon="library_books"
          title="Education & Resources"
          subTitle="Explore our list of articles and learning materials specifically curated for you."
          onClick={handelHeaderToggleClick}
          collapsed={collapsed}
        />
      </StyledContainer>
      <SectionDivider />
      {!collapsed && (
        <>
          <StyledContainer>
            {!educationalResources ? (
              <Loader />
            ) : (
              <ArticleList>
                {Object.values(educationalResources).map((resource, index) => {
                  let return_cond = (!showFullResources && index < 2) || showFullResources; // if the flag showFullResoures = true, show all resources, else return only 2 resources
                  if (return_cond)
                    return (
                      <ArticleCard
                        key={resource.educational_resource_id}
                        image={resource.title_image_file_id}
                        title={resource.educational_resource_title}
                        desc={truncate(130)(resource.educational_resource_summary)}
                        link={resource.educational_resource_content}
                        buttonLabel="Read More"
                        view="plans"
                      />
                    );
                })}
              </ArticleList>
            )}
          </StyledContainer>
          <SectionDivider />
          <StyledContainer>
            {width <= 768 && (
              <>
                <Center>
                  <button type="button" onClick={handleResourcesToggleClick}>
                    {!showFullResources ? 'See More' : 'See Less'}
                  </button>
                </Center>
              </>
            )}
            <Title>Further Reading</Title>
            <SubTitle>
              {`Our Help Center is filled to the brim with useful articles and guides to help you navigate every aspect of your health condition. Want to explore more incredible resources?`}
              <span style={{ display: 'inherit' }}>
                {`Check out our `}
                <a href="www.google.com">Help Center</a>
              </span>
            </SubTitle>
          </StyledContainer>
        </>
      )}
    </StyledSectionBackground>
  );
});

EducationAndResourcesSection.propTypes = {
  educationalResources: PropTypes.PropTypes.shape({}).isRequired
};

export default EducationAndResourcesSection;
