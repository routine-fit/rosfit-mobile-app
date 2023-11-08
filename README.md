# Getting started with Routine & Fit server

## Domains

- https://routine-fit.com Production (main)
- https://uat.routine-fit.com UAT (uat)
- https://tst.routine-fit.com Test (test)
- https://dev.routine-fit.com Develop (develop)

## Features

**TODO**: Add libraries when they are fully integrated

- 🏗 Built with [React Native](https://reactnative.dev/)
- 🚨 Testing powered by [jest](https://jestjs.io/docs/getting-started)

## Set up environment

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using Yarn
yarn android
```

### For iOS

```bash
# using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Basic structure and configurations

```
src/                       // container to other folders with the source code of the app
  api/                     // axios instances
  assets/                  // global assets
  interfaces/              // global interfaces
  components/              // component folders
  hooks/                   // custom hooks
  navigator/               // navigator stack
  screens/                 // app screens
  store                    // redux toolkit store and slices
  theme                    // global app theme
package.json               // deps and workspace scripts
tsconfig.json              // typescript configuration
ios/                       // ios native code
android/                   // android native code
README.md                  // docs are important
```

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
