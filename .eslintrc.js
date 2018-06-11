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
    "styled-components",    
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "styled-components/rule-name": 2,
  }
};