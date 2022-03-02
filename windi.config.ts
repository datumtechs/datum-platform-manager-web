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
      "bg-ccc": "#ccc",
      "bg-main": '#2B60E9'
    }),
    colors: {
      "main": '#2B60E9'
    }
    // fontSize: () => ({
    //   "text-size-20": "20px"
    // })
  }
})
