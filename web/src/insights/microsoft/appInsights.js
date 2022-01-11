import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory({ basename: '' });
const insightsPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: 'a4be1480-aff3-4dc7-b711-7dd6eba8a651',
    eextensions: [insightsPlugin],
    extensionConfig: {
      [insightsPlugin.identifier]: { history: browserHistory }
    }
  }
});
appInsights.loadAppInsights();
export { insightsPlugin, appInsights };