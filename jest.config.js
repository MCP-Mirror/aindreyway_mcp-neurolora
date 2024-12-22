export default {
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
        isolatedModules: true,
        diagnostics: {
          ignoreCodes: [1343],
        },
      },
    ],
  },
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|@modelcontextprotocol|tiktoken|@dqbd/tiktoken)/)',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^../build/(.*)$': '<rootDir>/src/$1',
    '^../src/(.*)$': '<rootDir>/src/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^@modelcontextprotocol/sdk/(.*)$': '<rootDir>/node_modules/@modelcontextprotocol/sdk/dist/$1',
    '^@modelcontextprotocol/(.*)$': '<rootDir>/node_modules/@modelcontextprotocol/$1',
    '\\.js$': '',
    '^openai$': '<rootDir>/test/__mocks__/openai.ts'
  },
  extensionsToTreatAsEsm: ['.ts'],
  testTimeout: 30000,

  // Улучшенный вывод
  verbose: true,
  silent: false,
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './test-report/index.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
        includeConsoleLog: true,
        useCssFile: true,
      },
    ],
    [
      'jest-junit',
      {
        outputDirectory: './test-report',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
      },
    ],
    ['jest-summary-reporter', {}],
  ],

  // Покрытие кода
  collectCoverage: true,
  coverageDirectory: './test-report/coverage',
  coverageReporters: ['text-summary', 'html', 'lcov'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },

  // Настройки для тестового окружения
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/coverage/',
    '/test-report/',
    '/test/__mocks__/'
  ],
  maxWorkers: '50%',

  // Настройки для ESM
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig.json'
    }
  },
  preset: 'ts-jest/presets/default-esm',
  testMatch: [
    '<rootDir>/test/**/*.test.ts',
    '<rootDir>/test/**/*.test.js',
    '<rootDir>/test/**/*.spec.ts',
    '<rootDir>/test/**/*.spec.js'
  ]
};
