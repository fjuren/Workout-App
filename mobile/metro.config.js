const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude test files from the bundle
config.resolver.blockList = [
  /.*\.(test|spec)\.(js|jsx|ts|tsx)$/,
  /__tests__\/.*/,
  /.*\.test\.tsx?$/,
];

module.exports = config;