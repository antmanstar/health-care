import Desktop, { reflection as desktopReflection } from './desktop';
// import Mobile, { reflection as mobileReflection } from './mobile';
// import { isClientMobile } from '../../../utils/browser';

// const Component = isClientMobile() ? Mobile : Desktop;
// const reflection = isClientMobile() ? mobileReflection : desktopReflection;

const Component = Desktop;
const reflection = desktopReflection;
export default Component;
export { reflection };
