import Desktop, { reflection as desktopReflection } from './desktop';
import Mobile, { reflection as mobileReflection } from './mobile';
import { isClientMobile } from '../../../utils/browser';

const Component = Desktop; //isClientMobile() ? Mobile : Desktop;
const reflection = desktopReflection; //isClientMobile() ? mobileReflection : desktopReflection;

export default Component;
export { reflection };
