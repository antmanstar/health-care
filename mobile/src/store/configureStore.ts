import { interfaces, store, utils } from '@evry-member-app/shared';
import { MemoryHistory } from 'history'

const { evry } = interfaces.apis;
const { configureStore } = store;

evry.init({
  baseURL: ''
})

export default (history: MemoryHistory, preloadedState: any) => configureStore(history, preloadedState);
