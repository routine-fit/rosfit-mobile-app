/** @type {import('react-native-worklets/plugin').PluginOptions} */

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: './tests/',
          src: './src/',
        },
      },
    ],
    'babel-plugin-react-native-config',
    'react-native-worklets/plugin',
  ],
};
