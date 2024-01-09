module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: './tests/',
          src: './src',
          'src/api': './src/api',
          'src/assets': './src/assets',
          'src/components': './src/app/components',
          'src/hooks': './src/hooks',
          'src/interfaces': './src/interfaces',
          'src/screens': './src/app/screens',
          'src/store': './src/store',
          'src/theme': './src/theme',
          'src/utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
