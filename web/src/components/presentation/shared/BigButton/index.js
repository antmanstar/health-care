import Desktop from './desktop';
import Mobile from './mobile';
import PlanBigButton from './PlanBigButton';
import { isClientMobile } from '../../../../utils/browser';

const Component = isClientMobile() ? Mobile : Desktop;

// export default Component;
export default PlanBigButton;
