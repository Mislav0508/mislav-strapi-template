export default {
  methods: {
    fetchEventsLocales: async function(locale) {
      try {
        const response = await this.$axios.get(`http://localhost:1338/api/events?locale=${locale}`)
        
        let {data} = response.data
        let attributes = data.map(x => x.attributes)

        let filteredData = attributes.filter(obj => {
          return obj.title.includes('o')
        })
        console.log("filteredData", filteredData);
        // let img_url = []
        // let titles = []
        // let tags = []
        // let dates = []
        // let publishedAt = []
        // let updatedAt = []
        // let bodies = []
        // let events = data.map(x => x.attributes)
        // events.forEach((event) => {
        //   img_url.push('http://localhost:1338'+event.image_url)
        //   titles.push(event.title)
        //   tags.push(event.tags.split(", "))
        //   dates.push(event.date)
        //   publishedAt.push(event.publishedAt)
        //   updatedAt.push(event.updatedAt)
        //   bodies.push(event.body)
        // })
        // let results = {
        //   img_url,
        //   titles,
        //   tags,
        //   dates,
        //   publishedAt,
        //   updatedAt,
        //   bodies
        // }

        // console.log("results",results);
        return attributes
      } catch (error) {
        this.error = error;
      }
    }
  }
}