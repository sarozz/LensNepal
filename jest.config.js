module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.expo/', '/dist/'],
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx}',
    'src/theme/**/*.{ts,tsx}',
    '!**/*.test.{ts,tsx}',
    '!**/index.ts',
  ],
};
