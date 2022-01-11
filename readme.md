# Evry's Member Web Portal App

## Onboarding

See our [onboarding](onboarding.md) doc.

## Installation/Set-up

This is a mono-repo, managing [`web`](web/) and [`mobile`](mobile/) end-user apps, as well as the [`shared`](shared/) code and [`assets`](assets/) they both use. This is all (at present) managed by `lerna` — a future improvement might be to use `npm` workspaces (only for version `^7`).

### Prerequisites
- If needing to retain the ability to run multiple Node.js versions, please install a Node version manager. If you don't have a preferred/installed one yet, I'd recommend `nodenv` as the best of those available, popular and well-maintained.
- Our `.node-version` file, as well as the `engines` portion of the root `package.json` file, comprise our "source of truth" as to which version of Node.js and `npm` we're to run.
    - Please note that the `npm` version we currently use is _not_ that which comes with v14 of Node. Please install this manually.
  - 
