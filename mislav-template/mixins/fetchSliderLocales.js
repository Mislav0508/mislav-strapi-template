export default {
  methods: {
    fetchSliderLocales: async function(locale) {
      try {
        const response = await this.$axios.get(`http://localhost:1338/api/homepage-sliders?locale=${locale}`)
        
        let {data} = response.data

        return data
      } catch (error) {
        this.error = error;
      }
    }
  }
}