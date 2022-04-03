<template>
  <div>
    <v-container class="block-1-events d-flex align-center pt-lg-15 mt-lg-10 mt-sm-7" >

      <v-row>
        <v-col cols="0" xl="2" lg="2" md="2" sm="2"></v-col>

        <v-col cols="12" xl="8" lg="8" md="8" sm="8" class="mt-15 mt-sm-0 pr-10 pr-sm-0 text-center d-flex flex-column justify-center align-center">
          <h2 data-aos="fade-in" 
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-delay="500"
          data-aos-once="true">All Events</h2>
        </v-col> 

        <v-col cols="0" xl="2" lg="2" md="2" sm="2"></v-col> 
      </v-row>

    </v-container>

    <v-container class="d-flex">
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" class="grid-container pa-sm-10" >
        <Event v-for="(event, i) in filteredTitles " :key="i"
        :image="'http://localhost:1338'+event.image_url"
        :tags="event.tags.split(', ')"
        :title="event.title"
        :date="event.date"
        :body="event.body"
        />
      </v-col>
      <v-col cols="12" xl="3" lg="3" md="3" sm="3">

        <v-text-field
          data-aos="fade-right" 
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-delay="1000"
          data-aos-once="true"
          label="Search"
          v-model="search"
          append-icon="mdi-magnify"
          class="search-field mt-5"
        ></v-text-field>

        <v-form  
        id="templateForm"
        name="templateForm"
        method="POST" 
        @submit.prevent="createEvent"
          >

          <v-file-input
            accept="image/*"
            label="image"
            truncate-length="15"
            prepend-icon="mdi-camera"
            show-size
            :rules="imageRules"
          ></v-file-input>
          
          <v-text-field
            color="#222222"
            clearable
            v-model="image_url"
            label="Image_url"
            type="text"
            name="image_url"
            required
          ></v-text-field>
          
          <v-text-field
            color="#222222"
            clearable
            v-model="title"
            label="Title"
            type="text"
            name="Title"
            required
          ></v-text-field>

          <v-combobox
          v-model="tags"
          label="Tags"
          multiple
          chips
          :clearable="true"
          clear-icon
          ></v-combobox>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-textarea
            v-model="body"
            color="teal"
          >
            <template v-slot:label>
              <div>
                Body
              </div>
            </template>
          </v-textarea>

          <v-select
            :items="$i18n.localeCodes"
            v-model="locale"
            label="Language"
            dense
          ></v-select>

          <v-btn large color="primary" type="submit" width="100%" :disabled="!locale" class="grid-submit-btn mt-5">Create Event</v-btn>

          <v-alert
          v-if="successAlert"
          class="grid-alert"
          type="success"
          >Your message has been sent!</v-alert>

        </v-form>
      </v-col>

    </v-container>
  </div>
</template>

<script>
import aosMixin from "../mixins/aos"
import Event from "../components/Event.vue"
import fetchEventsLocales from "../mixins/fetchEventsLocales"
import inputRules from "../mixins/inputRules"
export default {
  components: { Event },
  mixins: [ aosMixin, fetchEventsLocales, inputRules ],
  middleware: "auth",
  data() {
    return {
      search: '',
      events: [],
      image: 'asdads',
      image_url: 'test',
      title: 'test',
      tags: [],
      date: '',
      body: 'test',
      locale: '',
      menu: false,
      successAlert: false,
      error: '',
      event_id: ''
    }
  },
  methods: {
    async createEvent() {
      const jwt = this.$cookies.get('jwt')
      if (this.image == null) this.image = ''
      if (this.tags == []) this.tags = ''

      try {
        let res = await this.$axios.$post("http://localhost:1338/api/events", {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
          },
          // THIS WORKS
          "data": {
          "locale": `${this.locale}`,
          "image": `${this.Image}`,
          "image_url": `${this.image_url}`,
          "title": `${this.title}`,
          "tags": `${this.tags.toString().replaceAll(',', ', ')}`,
          "date": `${this.date}`,
          "body": `${this.body}`,
        }
        })

        console.log("res",res);
      } catch (error) {
        this.error = error
        console.log(error.response);
      }
    },
    async deleteEvent() {
      try {
        let res = await this.$axios.$delete("http://localhost:1338/api/events", {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
          }
        })

        console.log("res",res);
      } catch (error) {
        this.error = error
        console.log(error.response);
      }
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
  }
}
</script>

<style lang="scss" scoped>
.block-1-events{
  min-height: 30vh;
}
.grid-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
}
@media screen and (max-width: 1264px) {
  .grid-container {
    // max-width: 80vw;
  }
}
@media screen and (max-width: 960px) {
  .grid-container {
    grid-template-columns: auto;
  }
}
.search-field{
  width: 100%;
}
</style>