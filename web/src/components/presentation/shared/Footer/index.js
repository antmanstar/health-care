import Desktop from './desktop';
import Mobile from './mobile';
import { isClientMobile } from '../../../../utils/browser';

const Component = isClientMobile() ? Mobile : Desktop;

export default Component;
