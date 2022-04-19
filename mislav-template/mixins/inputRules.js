export default {
  data () {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      messageRules: [
        v => !!v || 'Message is required'
      ],
      imageRules: [
        value => !value || value.size < 8000000 || 'Image size should be less than 8 MB!',
      ],
      requiredRules: [
        v => !!v || 'this field is required'
      ],
      passwordRules: [
        v => !!v || 'this field is required',
        v => /^[a-zA-Z0-9+@+!]*$/.test(v) || 'Character not allowed.'
      ]
    }
  }
}