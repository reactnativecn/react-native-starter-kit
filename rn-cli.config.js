'use strict';

const path = require('path');
const blacklist = require('metro-bundler/src/blacklist');

const config = {
  extraNodeModules: {
    'tslib': require.resolve('tslib/tslib.es6.js'),
  },

  getBlacklistRE() {
    return blacklist([
      /\.idea[\/\\].*/,
    ]);
  },

  getSourceExts() {
    return ['js', 'json', 'ts', 'tsx', 'txt'];
  },

  getTransformModulePath() {
    return require.resolve('metro-transformer-registry');
  },

  getTransformRuleList() {
    return [
      {
        include: /\.tsx?$/,
        transformer: require('metro-transformer-registry/transformers/typescript'),
      },
      {
        include: /\.txt$/,
        transformer: require('metro-transformer-registry/transformers/raw'),
      },
    ]
  }
};

module.exports = config;
