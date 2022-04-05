export default {
  methods: {
    fetchNavbarLocales: async function(locale) {
      try {
        const response = await this.$axios.get(`${process.env.STRAPI_API}/api/navbars?locale=${locale}`)
        let {data} = response.data
        let links = data[0].attributes

        let sublinks = []
        let keys = Object.keys(links)
        keys.forEach((key) => {
          if (key.includes('sublink')) {
            sublinks.push(links[key])
          }
        })

        return { links, sublinks }
      } catch (error) {
        this.error = error;
      }
    }
  }
}