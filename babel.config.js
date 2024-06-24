module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.es',
          '.es6',
          '.mjs',
          '.jpg',
          '.png',
        ],
        root: ['./'],
        alias: {
          assets: './src/assets',
          components: './src/Component',
          "@starling/theme": "./vn.starlingTech/theme/theming",
          "@vn.starlingTech": "./vn.starlingTech",
          src: "./src",
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
