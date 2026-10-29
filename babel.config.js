module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Required by react-native-reanimated v4; must be the last plugin.
    plugins: ["react-native-worklets/plugin"],
  };
};
