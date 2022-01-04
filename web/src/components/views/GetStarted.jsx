import React from 'react';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import GetStartedItem from '../presentation/careplan/mobile/GetStartedItem';
import { Helmet } from 'react-helmet-async';

// MOBILE: Get Started View
// TODO: API Needs to tell us what items are completed
// TODO: Each item should start a flow to complete the action needed

const { MobileContentWrapper } = defaultTheme.components;

const GetStarted = () => (
  <MobileContentWrapper>
    <Helmet>
      <title>{reflection.layoutProps.title} - Evry Health</title>
    </Helmet>
    <GetStartedItem
      title="Meet your Care Guide"
      reward="$25"
      desc="Schedule a call to meet your personal healthcare concierge."
      completed
    />
    <GetStartedItem
      title="Talk to a Doctor"
      reward="$25"
      desc="Why make the trip? Talk to a doctor anytime, right from your phone. It’s free."
    />
    <GetStartedItem
      title="Speak to a Nutritionist"
      reward="$25"
      desc="Get a free consultation for a custom nutrition plan that’s right for you."
    />
    <GetStartedItem
      title="Take a Health Survey"
      reward="$100"
      desc="This survey takes about 15 minutes and will help us serve you better."
    />
  </MobileContentWrapper>
);

const reflection = {
  component: GetStarted,
  layout: Mobile,
  layoutProps: {
    title: 'Get Started. Earn Cash.',
    subtitle: 'Tap on an item to begin.',
    titleType: 'standard',
    footer: true,
    navProps: {
      left: 'back'
    }
  },
  route: '/get-started'
};

export default GetStarted;

export { reflection };
