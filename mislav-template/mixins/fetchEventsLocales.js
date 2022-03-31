export default {
  methods: {
    fetchEventsLocales: async function(locale) {
      try {
        const response = await this.$axios.get(`http://localhost:1338/api/events?locale=${locale}`)
        
        let {data} = response.data
        let attributes = data.map(x => x.attributes)

        let ids = []
        data.forEach((x,i) => ids.push(x.id))

        let dates = attributes.map(x => x.date)

        console.log("dates",dates);
        let sortedDates = dates.sort(function(a,b){
          return new Date(b) - new Date(a);
        });
        console.log("sortedDates",sortedDates);

        // console.log("attributes",attributes);

        return attributes
      } catch (error) {
        this.error = error;
      }
    }
  }
}