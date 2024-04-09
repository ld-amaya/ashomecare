module.exports = {
  env: {
    test: {
      plugins: [
        'transform-require-context',
+        'babel-plugin-transform-typescript-metadata',
+        'babel-plugin-parameter-decorator',
      ],
    },
  },
};