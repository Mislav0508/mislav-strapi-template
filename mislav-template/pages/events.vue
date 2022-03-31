<template>
  <div>
    <v-row class="py-15 my-15"></v-row>
    <v-container class="grid-container">
      <Event v-for="(img, i) in images" :key="i"
        :image="images[i]"
        :tags="tags[i]"
        :title="titles[i]"
        :date="dates[i]"
        :body="bodies[i]"
        class="gallery-item"
      />
    </v-container>
  </div>
</template>

<script>
import Event from "../components/Event.vue"
import fetchEventsLocales from "../mixins/fetchEventsLocales"
export default {
  components: { Event },
  mixins: [ fetchEventsLocales ],
  data() {
    return {
      images: [],
      tags: [],
      titles: [],
      dates: [],
      publishedAt: [],
      updatedAt: [],
      bodies: []
    }
  },
  async mounted() {
    this.route = $nuxt.$route.path.length

    // FETCHING LOCALES FROM STRAPI
    let result = await this.fetchEventsLocales($nuxt.$route.path.substring(1,3))
    console.log("result",result);
    this.images = result.img_url
    this.tags = result.tags
    this.titles = result.titles
    this.dates = result.dates
    this.publishedAt = result.publishedAt
    this.updatedAt = result.updatedAt
    this.bodies = result.bodies

  }
}
</script>

<style lang="scss" scoped>
.gallery-item:hover{
  transform: all 0.3s ease;
  transform: translateY(-1%);
  box-shadow: 0px 15px 10px -15px rgb(180, 180, 180);
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
</style>