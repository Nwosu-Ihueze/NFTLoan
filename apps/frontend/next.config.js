module.exports = {
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: false, // todo: aria ssr issues with strict mode
  productionBrowserSourceMaps: false,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  sassOptions: {
    sourceMap: false,
    outputStyle: 'compressed'
  },
  compiler: {
    styledComponents: true
  }
};
