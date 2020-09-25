const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#FF1053',
          '@border-radius-base': '8px',
          '@btn-text-shadow': 'none',
        }
      }
    }
  ]
};
