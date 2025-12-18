import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'moodTheme',
    themes: {
      moodTheme: {
        dark: true,
        colors: {
          background: '#121417',
          surface: '#1F2937',
          primary: '#00D084',
          secondary: '#1F2937',
          accent: '#4FD1C5',
          error: '#FF5252',
          info: '#2196F3',
          success: '#00D084',
          warning: '#FFC107',
          'on-background': '#E5E7EB',
          'on-surface': '#E5E7EB',
          'on-primary': '#121417',
        },
      },
    },
  },
})
