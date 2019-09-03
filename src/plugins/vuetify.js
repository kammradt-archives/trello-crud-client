import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.darken1,
        error: colors.red
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
