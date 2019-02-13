module.exports = {
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': 0,
    'comma-dangle': ['error', 'never']
  },
  overrides: [
    {
      excludedFiles: '*.test.js'
    }
  ]
};
