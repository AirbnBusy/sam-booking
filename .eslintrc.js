module.exports = { 
  extends: 'airbnb',
  "env": {
    "browser": true,
    "node": true,
    "jest/globals": true,
  },
  "plugins": [
    "jest", 
    "import", 
    "jsx-a11y", 
    "react",
    "sql",
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};