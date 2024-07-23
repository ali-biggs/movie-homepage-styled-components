module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-restricted-globals": [
      "error",
      "event",
      "fetch",
      "location",
      "navigator",
      "window",
    ],
  },
  overrides: [
    {
      files: ["src/service-worker.js"],
      rules: {
        "no-restricted-globals": "off",
      },
    },
  ],
};
