{
  "extends": "eslint-config-airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    // Don't need this for react-native app.
    "no-console": 0,
    "no-alert": 0,

    // Make destructure available:
    "no-unused-vars": ["error", {
      "vars": "local",
      "args": "after-used",
      "varsIgnorePattern": "_"
    }],

    // Disable this because it breaks mobx with state-less component.
    "prefer-arrow-callback": 0,
    "react/prefer-stateless-function": 0,

    // Move properties before.
    "react/sort-comp": [2, {
      "order": [
        "static-methods",
        "constructor",
        "lifecycle",
        "everything-else",
        "/^on.+$/",
        "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
        "/^render.+$/",
        "render"
      ]
    }],

    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement"
    ],

    // Disable rules for most usage in react-native.
    "react/jsx-filename-extension": 0
  },
  "plugins": [
    "react", "import"
  ],
  "settings": {
    "import/parser": "babel-eslint"
  },
  "globals": {
    "__DEV__": true,
    "__APP__": true,
    "__ANDROID__": true,
    "__IOS__": true
  }
}
