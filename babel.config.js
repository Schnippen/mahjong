module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        /* compiler config options */
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

//https://react.dev/learn/react-compiler#usage-with-babel
//['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
