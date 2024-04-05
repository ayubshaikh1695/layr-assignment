module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // If you're using JSX in your TypeScript files:
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      babelConfig: true, // If you're also using Babel
    },
  },
  // For projects using ECMAScript modules, you might need:
  transform: { '^.+\\.(ts|tsx|js|jsx|mjs)$': 'ts-jest' },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
};
