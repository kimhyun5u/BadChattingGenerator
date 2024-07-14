import airbnbBase from "eslint-config-airbnb-base";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.webextensions,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // Airbnb 규칙을 오버라이드하거나 추가 규칙을 여기에 설정할 수 있습니다
      "no-console": "off", // 크롬 확장프로그램에서는 콘솔 사용이 일반적이므로 허용
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      semi: ["error", "never"],
    },
    env: {
      browser: true,
      es2022: true,
      webextensions: true,
    },
  },
  ...airbnbBase,
];
