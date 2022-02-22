/* craco.config.js */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#1c658c',
              '@font-family': 'Inter, sans-serif'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};