import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [vue(), tsconfigPaths(), visualizer({ open: false })],
    // build: {
    // minify: false,
    // sourcemap: true,
    // },
    optimizeDeps: {
      exclude: [],
    },

    define: {
      __DEV__: mode !== 'production',
    },
    base: mode === 'production' ? env.VITE_APP_PUBLIC_URL || '' : '',

    server: {
      port: 9000,
    },
    esbuild: {
      jsxFactory: 'h',
      jsxInject: 'import {h,Fragment} from "vue"',
      jsxFragment: 'Fragment',
    },
  })
}
