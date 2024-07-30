module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "prettier",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  ignorePatterns: ["node_modules/", "/build"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "none",
        printWidth: 100
      }
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-no-comment-textnodes": 0,
    "@typescript-eslint/consistent-type-imports": "warn",
    "comma-dangle": 0
  }
};
