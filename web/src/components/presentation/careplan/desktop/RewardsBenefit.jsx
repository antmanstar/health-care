import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import DiscountItem from './DiscountItem';
import DiscountItemCommon from './DiscountItemCommon';
import images from '../../../../utils/images';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Pagination from '../../shared/desktop/Pagination';
import paginate from '../../../../utils/pagination_static';
import getWidth from '../../../../utils/getWidth';

const { SectionBackground, Container, SectionDivider } = defaultTheme.components;

const StyledSectionBackground = styled(SectionBackground)`
  padding-bottom: 24px;
  @media ${props => props.theme.device_up.tablet} {
    margin: 0 auto 16px;
  }
`;

const StyledContainer = styled(Container)`
  @media ${props => props.theme.device_up.tablet} {
    padding: 20px 20px 12px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Icon = styled.img`
  height: 40px;
  margin-right: 16px;
  display: inline-block;
`;

const Title = styled.h1`
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device_up.mobile} {
    font-size: 16px;
  }
`;

const Description = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.gray};

  span {
    margin-left: 4px;
    font-weight: 700;
    color: ${props => props.theme.colors.shades.blue};
  }

  @media ${props => props.theme.device_up.mobile} {
    font-size: 12px;
  }
`;

const StyledSectionDivider = styled(SectionDivider)`
  margin: 24px 0;
  @media ${props => props.theme.device_up.tablet} {
    margin: 16px 0;
    border-bottom-color: ${props => props.theme.colors.shades.border};
  }
`;

const DiscountFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: flex-start;
  margin-left: 50px;
  padding-left: 64px;
  padding-right: 64px;
  gap: 10px;
  margin-top: 45px;
  justify-content: ${props => (props.isCommon ? 'flex-start' : 'center')};

  > * {
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  @media ${props => props.theme.device_up.tablet} {
    margin-left: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const CategoryMenuWrapper = styled.div`
  margin-bottom: 16px;
  .horizontal-menu {
    .scroll-menu-arrow {
      height: 24px;
    }
  }
`;

const Category = styled.div`
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.shades.blue};
  opacity: 0.5;
  margin-right: 18px;

  &.active {
    border-bottom: 2px solid #f9423a;
    font-weight: bold;
    opacity: 1;
  }
`;

const ArrowIcon = styled.i`
  color: #4a4a4b;
  opacity: 0.5;
  font-weight: 500;
  font-size: 34px;
  line-height: 0.7;
  display: ${props => (props.disabled ? 'none' : 'unset')};
`;

const BottomInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 100px;
  padding-right: 100px;
  align-items: center;

  @media ${props => props.theme.device_up.tablet} {
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const BottomInfo = styled.div`
  font-weight: 300;
  font-size: 10px;
  margin-right: 32px;
  color: ${props => props.theme.colors.shades.darkGray};
  @media ${props => props.theme.device_up.tablet} {
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 160px;
  width: 100%;
  height: 33px;
  background: ${props => props.theme.colors.shades.tealBlue};
  color: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  font-weight: 300;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  font-family: 'Roboto';
  flex-direction: column;
  margin-right: 18px;

  @media ${props => props.theme.device_up.tablet} {
    margin: 0;
  }

  &:hover {
    background: #1c4c66;
  }
`;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;

  @media ${props => props.theme.device_up.mobile} {
    justify-content: center;
  }
`;

const RewardsBenefit = ({ rewardBenefits, rewardCategories }) => {
  const [curCategoryIndex, setCurCategoryIndex] = useState(0);
  const [translate, setTranslate] = useState(0);
  const scrollRef = useRef(null);
  const width = getWidth();

  const visibility = scrollRef?.current?.checkFirstLastItemVisibility(translate);

  const menuItems = Object.values(rewardCategories)?.map((category, index) => (
    <Category className={curCategoryIndex === index ? 'active' : ''} key={category.category_id}>
      {category.category_name}
    </Category>
  ));

  const discountItems = Object.values(rewardBenefits).filter(reward => reward.benefit_type === 2);
  const currentCategory = Object.values(rewardCategories)[curCategoryIndex];

  const getRewardsBenefitByCategory = category => {
    return discountItems.filter(item => item.benefit_category_ids[0] === category?.category_id);
  };

  const benefits = getRewardsBenefitByCategory(currentCategory);
  //   const isCommon = currentCategory?.category_name.toLowerCase() != 'participating retailers';
  const isCommon = currentCategory?.category_name.toLowerCase() != 'diabetes care';

  const paginator =
    benefits &&
    paginate(
      benefits,
      width >= 760 ? 12 : width >= 639 ? 10 : width >= 518 ? 8 : width >= 396 ? 6 : 4
    );

  const handleSelect = key => {
    Object.values(rewardCategories).map((category, index) => {
      if (category.category_id == key) setCurCategoryIndex(index);
    });
  };

  const ArrowScrollIcon = ({ type }) => {
    return (
      <ArrowIcon
        className="material-icons"
        disabled={type == 'left' ? visibility?.firstItemVisible : visibility?.lastItemVisible}
      >
        {type == 'left' ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
      </ArrowIcon>
    );
  };

  return (
    <>
      <StyledSectionBackground>
        <StyledContainer>
          <Header>
            <Icon src={images['money-in-circle']} />
            <div>
              <Title>Reward Benefit</Title>
              <Description>
                Use your EvryHealth Card at participating retailers to get discounts.
                <span>Everyday</span>
                {`.`}
              </Description>
            </div>
          </Header>
          <StyledSectionDivider />
          <CategoryMenuWrapper>
            <ScrollMenu
              data={menuItems}
              alignCenter={false}
              arrowLeft={<ArrowScrollIcon type="left" />}
              arrowRight={<ArrowScrollIcon type="right" />}
              selected={curCategoryIndex}
              hideArrow={true}
              hideSingleArrow={true}
              onSelect={key => handleSelect(key)}
              ref={scrollRef}
              translate={translate}
              onUpdate={translate => setTranslate(translate)}
            />
          </CategoryMenuWrapper>
          <DiscountFlex isCommon={isCommon}>
            {paginator.currentData.map(
              benefit =>
                benefit &&
                (isCommon ? (
                  <DiscountItem title={benefit.benefit_name} key={benefit.benefit_id} />
                ) : (
                  <DiscountItemCommon title={benefit.benefit_name} key={benefit.benefit_id} />
                ))
            )}
          </DiscountFlex>
        </StyledContainer>
        <StyledSectionDivider />
        <BottomInfoWrapper>
          <BottomInfo>
            Visit OTCNetwork.com to see a complete list of participating retailers, approved items,
            and to check your card balance. Or call 1-888-682-2400 to check your balance.
          </BottomInfo>
          <Button onClick={() => window.open('https://www.otcnetwork.com/')}>
            See Full Benefits List
          </Button>
        </BottomInfoWrapper>
      </StyledSectionBackground>
      <PaginationWrapper>{paginator && <Pagination paginator={paginator} />}</PaginationWrapper>
    </>
  );
};

RewardsBenefit.propTypes = {
  rewardBenefits: PropTypes.shape({}).isRequired,
  rewardCategories: PropTypes.shape({}).isRequired
};

export default RewardsBenefit;
