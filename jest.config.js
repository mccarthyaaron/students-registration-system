/** @type {import('jest').Config} */

const path = require('path');

const config = {
  clearMocks: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  setupFilesAfterEnv: [path.resolve(__dirname, 'test-tools', 'setup-tests.ts')],
  testEnvironment: 'node',
  testTimeout: 10000,
};

module.exports = config;
