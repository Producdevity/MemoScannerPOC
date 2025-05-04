module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        // relativeSourceLocation: true,
        globals: ['__detect', '__detectAndNormalize'],
      },
    ],
  ],
}
