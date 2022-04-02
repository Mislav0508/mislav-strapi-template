<template>
  <div>
    <v-container class="block-1-events d-flex align-center pt-lg-15 mt-lg-10 mt-sm-7" >

      <v-col cols="0" xl="2" lg="2" md="2" sm="2"></v-col>

      <v-col cols="12" xl="8" lg="8" md="8" sm="8" class="mt-15 mt-sm-0 pr-10 pr-sm-0 text-center d-flex flex-column justify-center align-center">
        <h2 data-aos="fade-in" 
        data-aos-duration="1000"
        data-aos-easing="ease-out"
        data-aos-delay="500"
        data-aos-once="true">All Events</h2>
        <v-text-field
        data-aos="fade-right" 
        data-aos-duration="1000"
        data-aos-easing="ease-out"
        data-aos-delay="1000"
        data-aos-once="true"
        label="Search"
        v-model="search"
        prepend-icon="mdi-magnify"
        class="search-field mt-5"
        ></v-text-field>
      </v-col> 

      <v-col cols="0" xl="2" lg="2" md="2" sm="2"></v-col>     

    </v-container>
    <v-container class="grid-container">
      <Event v-for="(event, i) in filteredTitles " :key="i"
        :image="'http://localhost:1338'+event.image_url"
        :tags="event.tags.split(', ')"
        :title="event.title"
        :date="event.date"
        :body="event.body"
      />
    </v-container>
  </div>
</template>

<script>
import aosMixin from "../mixins/aos"
import Event from "../components/Event.vue"
import fetchEventsLocales from "../mixins/fetchEventsLocales"
export default {
  components: { Event },
  mixins: [ aosMixin, fetchEventsLocales ],
  middleware: "auth",
  data() {
    return {
      search: '',
      events: []
    }
  },
  computed: {
    filteredTitles : function() {
      return this.events.filter(obj => {
          return obj.title.toLowerCase().includes(this.search.toLowerCase()) 
                 
      })
    }
  },
  async mounted() {
    // FETCHING LOCALES FROM STRAPI    
    this.events = await this.fetchEventsLocales(this.$store.state.path)
    console.log("events",this.events);
  }
}
</script>

<style lang="scss" scoped>
.block-1-events{
  min-height: 30vh;
}
.grid-container{
  max-width: 60vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;
  // background-color: #2196F3;
  padding: 10px;
}
@media screen and (max-width: 1264px) {
  .grid-container {
    max-width: 70vw;
  }
}
@media screen and (max-width: 960px) {
  .grid-container {
    grid-template-columns: auto;
    max-width: 90vw;
  }
}
.search-field{
  width: 11rem;
}
</style>