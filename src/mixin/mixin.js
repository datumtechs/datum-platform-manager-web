const globalMixin = {
  computed: {
    lang () {
      return this.$i18n.locale
    }
  }
}
export default globalMixin
