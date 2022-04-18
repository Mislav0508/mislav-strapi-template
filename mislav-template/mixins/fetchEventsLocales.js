export default {
  methods: {
    fetchEventsLocales: async function(locale) {
      try {
        const response = await this.$axios.get(`${process.env.STRAPI_API}/api/events?locale=${locale}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        })
        
        let {data} = response.data
        let attributes = data.map(x => x.attributes)
        // console.log("attributes",attributes);

        let ids = []
        data.forEach((x,i) => ids.push(x.id))

        // let dates = attributes.map(x => x.date)

        // console.log("dates",dates);
        // let sortedDates = dates.sort(function(a,b){
        //   return new Date(b) - new Date(a);
        // });
        // console.log("sortedDates",sortedDates);

        // console.log("attributes",attributes);

        const img_response = await this.$axios.get(`${process.env.STRAPI_API}/api/events?populate=Image`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          }
        })

        let Images_array = img_response.data.data
        let Images = Images_array.map(x => x.attributes.Image)

        attributes.forEach((x,i) => x.Image = Images[i])
        attributes.forEach((x,i) => x.id = ids[i])
        attributes.forEach((x,i) => x.Image_id = Images[i].data[0].id)

        let strings = attributes.map((x,i) => Object.values(x).toString())
        attributes.forEach((x,i) => x.strings = strings[i])
        console.log("attributes",attributes);

        return {attributes}
      } catch (error) {
        this.error = error;
      } 
    }
  }
}