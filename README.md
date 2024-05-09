# Getting started with Routine & Fit mobile app

## Domains

- https://routine-fit.com Production (main)
- https://uat.routine-fit.com UAT (uat)
- https://tst.routine-fit.com Test (test)
- https://dev.routine-fit.com Develop (develop)

## Libraries

- 🏗 Built with [React native Nx](https://nx.dev/l/r/react-native/application)
- 🧩 Navigation with [React navigation v6](https://reactnavigation.org/docs/getting-started/)
- 🚨 Testing powered by [jest](https://jestjs.io/docs/getting-started)
- 🔒 Env variables using [React native config](https://github.com/luggit/react-native-config)
- 🧬 State management by [Redux Toolkit](https://reactnavigation.org/docs)

## Quick start

### Set up environment

Before install the dependencies and run start with the project, the first step to do is set up the environment. Follow this [react native docs](https://reactnative.dev/docs/environment-setup)

### Install dependencies

After setting up the environment run the following commands:

- Install dependencies: `yarn`
- Install pod dependencies (for iOS): `yarn npx pod-install mobile-funnel`

### Env files templates

Ask for the env files for every environment to a member of the team and put them in the root of the mobile project. React Native Config will pick one of those files depending on the flavor or scheme to run/build, the commands to run the applications are in the scripts section of the package.json file, see Commands section below.

## Commands

To run the project there are several `options` available, here is a list:

```js
platform = 'android' | 'ios';
action = 'start' | 'build'; // (build is only available for android)
environment = 'dev' | 'prod';
```

- Run `yarn start` to start metro server and clear the cache.
- Run `yarn android` to build the android dev app and start the metro server.
- Run `yarn ios` to build the ios dev app and start the metro server.
- Run `yarn platform-action.environment` to build the app and start the metro server.
- Run `yarn test` to run all tests.
- Run `yarn lint` to check the lint.
- Run `yarn type-check` to check the type of the code.
- Run `yarn link` to link the react native packages (In some cases).
- Run `yarn pod:install` to install pods in ios folder.
- Run `yarn set:core` to delete the node_modules, reinstall all the pods and start the metro.

## Basic structure and configurations

```
android/              // Android app
ios/                  // iOS app
src/                  // Container to other folders with the source code of the app
  app/                // Screens and their components
    navigation/       // App Navigators
    screens/          // Screens to be consumed by the Navigators
  config/             // Configuration files
  constants/          // Global constants
  interfaces/         // Global interfaces
  theme/              // Global theme
  store/              // Redux toolkit store and slices
  hooks/              // Custom hooks
  assets/             // Global assets
  api/                // Axios instances
  utils/              // Global utils
.env                  // environment variables
package.json          // deps and workspace scripts
README.md             // docs are important
```

## Screen/Component structure

Each Screen/Component must follow the next structure:

```
(screen/component)/
  components/
    componentA/
      components/
        componentC
      index.tsx
      styles.ts
    componentB/
      index.tsx
      styles.ts
  component.test.tsx
  index.tsx
  styles.ts
```

### Google Services files setup

You will have to download the files from our Google Drive folder, Firebase project or ask someone to give them to you and once you have them copy those files in the following paths.

#### Android

`android/app/google-services.json`

For Android there is no need to create a folder because the file is the same for all the environments

#### IOS

`ios/routinefit/GoogleServices`

This folders are ignored by default.

The `google-services-script.sh` will get the build environment and setup the needed google service file for it.
