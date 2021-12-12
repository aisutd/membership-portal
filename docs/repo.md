# Membership Portal Repo Overview

```
.
├── README.md
├── docs
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── _app.tsx
│   ├── api
├── public
├── recoil
├── styles
├── util
└── tsconfig.json
```

Some of the important files that pertain to the configuration for the repository are listed above, additional description about their usage can be found below.

### Description

 - docs

This contains the documentation for the membership portal. Tech stack, schemas, cloud configuration, and more additional information will be saved here.

 - next-env.d.ts

Typescript dependency file

 - next.config.js

Next configuration. This is saved a `.js` file since our webpack configuration ignores this file.

 - pages

This contains all the pages for this project. The views for different endpoints are saved in filenames that reflect their path.

 - pages/api

This contains all of the serverless API endpoints for our next js application

 - public

This contains all the assets that can rendered statically by the application. Only essential assests should be stored here to avoid having a large github repo size.

 - recoil

This contains the state management tooling for the application. `recoil/state.ts` contains the definitions for all atoms and selectors. `recoil/actions/` stores the logic for populating all the async selectors.

 - styles

Both global and component level styles should be stored here. Any custom tailwind configuration should be saved in this location.

 - util

Contains the initialization logic for `aws-sdk` and some shared typescript interfaces. `util/db` contains all the logic for working with the `dynamodb` database.

 - tsconfig.json

Typescript configuration. This project targets `es6`.

 - .github

Contains github configuration including templates for issues / pull requests as well as workflows for CI / CD automation.

 - .husky

Precommit tools and associated resources

 - .next

Compiled assets