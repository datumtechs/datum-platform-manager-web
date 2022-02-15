const projectMixin = {
  data () {
    const self = this
    return {
      rules: [ {
        required: true,
        // eslint-disable-next-line no-empty-pattern
        validator: ({ }, value, callback) => {
          if (!value) {
            callback(new Error(`${self.$t('rules.projectNewProject')}`))
          } else if (String(value).length < 3 || String(value).length > 30) {
            callback(new Error(`${self.$t('rules.projectNewProjectNameLength')}`))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      } ],
      selectTules: [ // select 必填验证
        {
          required: true,
          trigger: 'change',
          // eslint-disable-next-line no-empty-pattern
          validator: ({ }, value, callback) => {
            if (!value) {
              callback(new Error(`${self.$t('rules.projectSelect')}`))
            } else {
              callback()
            }
          }
        }
      ]
    }
  },
  watch: {
    '_i18n.locale': function () {
      this.clearValidate()
    }
  },
  methods: {
    clearValidate () {
      try {
        this.$refs.infoForm.clearValidate()
      } catch {
        console.log(this.$refs.infoForm, 'is')
      }
    }
  }
}
export default projectMixin