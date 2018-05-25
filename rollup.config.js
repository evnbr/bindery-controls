import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

import sass from 'rollup-plugin-sass';
import postcss from 'postcss';
import prefixer from 'postcss-class-prefix';
import cssnano from 'cssnano';

import pkg from './package.json';


const extend = (a, b) => Object.assign({}, a, b);
const baseConfig = {
  entry: 'src/index.js',
  moduleName: 'BinderyControls',
  banner: `/* 📖 Bindery Controls v${pkg.version} */`,
};

const sassPlugin = () => sass({
  insert: true,
  processor: css => postcss([
    prefixer('📖-'),
    cssnano({ reduceIdents: false }),
  ]).process(css).then(result => result.css),
});

export default [
  // browser-friendly UMD build
  extend(baseConfig, {
    dest: pkg.browser,
    format: 'umd',
    sourceMap: true,
    plugins: [
      resolve(),
      commonjs(),
      sassPlugin(),
    ],
  }),

  // minified browser-friendly build
  extend(baseConfig, {
    dest: 'dist/bindery-controls.min.js',
    format: 'iife',
    sourceMap: true,
    plugins: [
      resolve(),
      commonjs(),
      sassPlugin(),
      minify({
        comments: false,
      }),
    ],
  }),

  // CommonJS (for Node) and ES module (for bundlers) build.
  extend(baseConfig, {
    external: ['hyperscript'],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve(),
      sassPlugin(),
    ],
  }),
];
