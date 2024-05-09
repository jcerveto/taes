import { defineConfig } from '@vue/cli-service';
/*
export default defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/taes/'
  : '/'
});
*/


export default defineConfig({
  transpileDependencies: true,
  publicPath: '/taes/',
  configureWebpack: {
    devtool: 'source-map'
  }
});