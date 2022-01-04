import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const StyledLoadingSpinner = styled(Loader)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  width: 80px;
`;

export default StyledLoadingSpinner;