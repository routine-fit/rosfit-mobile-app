module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/app/components',
          '@hooks': './src/hooks',
          '@interfaces': './src/interfaces',
          '@screens': './src/app/screens',
          '@src': './src',
          '@store': './src/store',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
