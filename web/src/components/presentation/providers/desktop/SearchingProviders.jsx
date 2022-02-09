import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../shared/Loader/Loader';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 8px;
  padding: 24px 32px 30px 32px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  height: 495px;
`;

const LoadingText = styled.div`
  font-size: 1em;
`;

const WarningLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: orange;
  gap: 10px;
`;

const SearchingProviders = React.memo(({ loading, noResults }) => {
  return (
    <Wrapper>
      {noResults ? (
        <WarningLabel>
          <i className="material-icons">warning</i>
          No providers found in this area.
        </WarningLabel>
      ) : (
        <div>
          <Loader />
          {loading && <LoadingText>Getting things ready</LoadingText>}
        </div>
      )}
    </Wrapper>
  );
});

export default SearchingProviders;
