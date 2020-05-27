const Path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const outPath = Path.join(__dirname, './build');

const mode = 'production';
const entry = './src/index.tsx';
const resolve = {
  extensions: ['.js', '.ts', '.tsx'],
  modules: ['node_modules'],
  // Fix webpack's default behavior to not load packages with jsnext:main module
  // (jsnext:main directs not usually distributable es6 format, but es6 sources)
  mainFields: ['module', 'browser', 'main']
};

const optimization = {
  usedExports: true,
  minimizer: [
    new TerserPlugin({
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
      },
    }
  }
};

const output = {
  publicPath: '/',
  path: outPath,
  filename: 'bundle.[hash].js',
  // Workaround for https://github.com/webpack/webpack/issues/6642
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
        transpileOnly: true,
        allowTsInNodeModules: false,
        onlyCompileBundledFiles: true,
        compilerOptions: {
          sourceMap: false
        }
      }
    },
    {
      test: /\.(css|scss)$/,
      exclude: [
        /node_modules/
      ],
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
          },
        }
      ]
    },
    {
      test: /\.(css|scss)$/,
      include: [
        /node_modules/
      ],
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[local]',
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
          },
        }
      ]
    },
    {
      test: /\.(jpg|jpeg|gif|png|eot)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/'
        },
      },
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/'
        },
      },
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/'
        },
      },
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/'
        },
      },
    }
  ]
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
  }),
  new HtmlWebpackPlugin({
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
    template: 'src/index.html',
    favicon: "src/favicon.png"
  })
];

module.exports = {
  mode,
  entry,
  resolve,
  optimization,
  output,
  module: _module,
  plugins,
};
