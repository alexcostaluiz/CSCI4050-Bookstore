const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@border-radius-base': '8px',
              '@btn-text-shadow': 'none',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
