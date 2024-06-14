/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        const { isServer } = options;
        config.module.rules.push({
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          exclude: config.exclude,
          use: [
            {
              loader: ('file-loader'),
              options: {
                limit: config.inlineImageLimit,
                fallback: ('file-loader'),
                publicPath: `/_next/static/images/`,
                outputPath: `${isServer ? '../' : ''}static/images/`,
                name: '[name]-[hash].[ext]',
                esModule: config.esModule || false,
              },
            },
          ],
        });
    
        return config;
      },
};

export default nextConfig;
