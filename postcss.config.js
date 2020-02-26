const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ({ env }) => {
  const plugins = [autoprefixer];
  if (env === 'production') {
    plugins.push(cssnano({ safe: true, minifyFontValues: false }));
  }
  return {
    plugins,
  };
};
