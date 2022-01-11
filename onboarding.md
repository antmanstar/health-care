# Evry UI engineering onboarding

## Stack overview
- TypeScript (only _**just**_ rolling this out, so the conversion is mostly still to do)
- React
- Redux (using `react-redux` bindings)
- Redux Saga (for API calls/store-related "side-effects")
- Styled Components (CSS-in-JS style code; makes patterns available for reuse)
- Redux Router
- Lerna (managing the mono-repo)
- Webpack
- Axios (wrapper for `fetch`/XHR)
- React Native for the nascent native mobile apps (iOS and Android)

### Holes/Gotchas
- No testing in place yet
  - Have Jest in mind here
  - Already set up for the mobile sub-repo
  - Cypress.io for the e2e testing, keeping UI code and its testing apparati all within JS/TS
- Some anti-patterns
  - Functions touching the store, changing data by reference (see the questionnaire save for an example; _might_ be others, but not sure)
  - Don't love that I'd put some of the most elemental components that get reused 
    - Now that we have a mono-repo, this could be abstracted to `shared`, or even further to a `components` sub-repo, to be imported by both `web` and `mobile`, to hosted shared pieces of components and their functionality
  - B/c this repo was largely built during late 2018– early/mid 2019, class components abound
    - This should be progressively updated to use stateful functional components using hooks
    - A benefit of this progressive conversion should hopefully become apparent when doing the `mobile` build-out, as we can reuse the hooks in the `web` and `mobile` versions of a component, even if we're not able to use much of the "chrome" (the base components, as React Native has its own version of the base building blocks)

## Places for prep/further learning
- Redux Saga, for anyone who's not used something more involved than Redux Thunk, seems to be the biggest piece of the learning curve for this project
  - This is largely due to [ES6 iterators/generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) being a core concept
    - Understanding how it works like the "Loch Ness Monster" — my own analogy for it — helps, as you tunnel execution out of and back into the function via the `yield` keyword
    - This kind of tunneling is how mocking the API from with the UI code base will greatly come in handy when testing gets built out, with the possibility of integration tests that might make somewhat less necessary automated e2e tests