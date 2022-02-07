import React from 'react';
import styled from 'styled-components';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';
import progressImage from '@evry-member-app/assets/images/raster/loading-animation.gif';

const LoadingWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 50px;
  background: linear-gradient(101.88deg, #022639 0%, #003c5c 100%);
`;

const ContentLoading = styled.div`
  width: 100%;
  @media screen and (min-width: 1200px) {
    max-width: 1000px;
  }
`;

const Logo = styled.img`
  width: 168px;
  height: 46px;
  margin-bottom: 20px;
  @media screen and (min-width: 1200px) {
    margin-bottom: 50px;
  }
`;

const LoadingAnimation = styled.img`
  width: 100%;
  height: 60px;
`;

const LoadingSplash = () => {
  return (
    <>
      <LoadingWrapper>
        <ContentLoading>
          <Logo src={logoImg} />
          <LoadingAnimation src={progressImage} />
        </ContentLoading>
      </LoadingWrapper>
    </>
  );
};

export default LoadingSplash;
