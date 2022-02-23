import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  preflight: false,
  attributify: true,
  theme: {
    screens: {
      sm: { max: '700px' },
      md: { max: '1220px' },
      '@md': { min: '700px', max: '1220px' },
      lg: { max: '1440px' }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      "primary":'#2b60e9'
    }),
    textColor:{
      deep:'#333333',
      shallow:'#999999',
      white:'#fff'
    }
  }
})
