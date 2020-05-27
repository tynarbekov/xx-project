const Path = require('path');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const outPath = Path.join(__dirname, './build');
const mode = 'development';
const entry = './src/index.tsx';

const resolve = {
  mainFields: ['browser', 'module', 'main'],
  extensions: ['.ts', '.tsx', '.js'],
  modules: ['node_modules'],
};

const optimization = {
  usedExports: true,
  minimizer: [
    new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        mangle: {
          toplevel: true
        },
        output: {comments: false}
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'libraries',
        chunks: 'all'
      }
    }
  }
};

const output = {
  publicPath: '/',
  path: outPath,
  // Removing hash from bundle name seems to reduce memory leak in webpack dev server
  filename: 'bundle.js',
  globalObject: 'this'
};

const _module = {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: [
        /(node_modules)/,
        /\.test.tsx?$/,
        /\.spec.tsx?$/
      ],
      loader: 'ts-loader',
      options: {
        // disable type checker - we will use it in fork plugin
        transpileOnly: true
      }
    },
    {
      test: /\.(css|scss)$/,
      exclude: ['/node_modules/'],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[name]_[local]__[hash:base64:5]'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    },
    {
      test: /\.(jpg|jpeg|gif|png|eot)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        },
      },
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        },
      },
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        },
      },
    }
  ]
};

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'src/favicon.png',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),
  new CleanWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin({
    useTypescriptIncrementalApi: false,
    checkSyntacticErrors: true,
    tsconfig: 'tsconfig.json',
    reportFiles: [
      '**',
      '!./node_modules/**',
      '!**/?(*.)(spec|test).*'
    ],
    watch: 'src',
    workers: 1,
    silent: false,
    tslint: true,
    formatter: 'codeframe'
  }),
];

const devServer = {
  port: 3000,
  contentBase: './src',
  compress: true,
  hot: true,
  inline: true,
  overlay: true,
  watchOptions: {
    ignored: /node_modules/
  },
  historyApiFallback: true
};

module.exports = {
  module: _module,
  optimization,
  devServer,
  resolve,
  plugins,
  output,
  entry,
  mode,
};
