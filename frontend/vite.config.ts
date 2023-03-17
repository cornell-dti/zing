import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

// ! Miranda: why did you add this dns?
// @ts-ignore
// import dns from 'dns'
// dns.setDefaultResultOrder('verbatim')

export default defineConfig(() => ({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    host: 'localhost',
  },
  build: {
    outDir: 'build',
  },
}))
