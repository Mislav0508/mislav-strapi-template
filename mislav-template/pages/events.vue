<template>
  <div>
    <v-container class="d-flex align-center pt-lg-15 mt-lg-10 mt-sm-7" fluid>

      <v-row class="block-1-events">
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="text-center d-flex flex-column justify-center align-center mt-0 pa-0" style="position: relative;">
          <NuxtImg provider="cloudinary" src="v1649002656/images/home/home_pic2_gkybve.jpg" fit="cover" class="title-wide-img"/>
          <h2 data-aos="fade-in" 
          data-aos-duration="1000"
          data-aos-easing="ease-out"
          data-aos-once="true"
          class="white--text title-text">All Events</h2>
        </v-col> 
      </v-row>

    </v-container>

    <v-container class="d-flex flex-column flex-md-row">
      <v-col cols="12" xl="8" lg="8" md="8" sm="12" class="grid-container pa-sm-10" >
        <Event v-for="(event, i) in filteredEvents " :key="i"
        :image_url="`http://localhost:1338`+event.Image.data[0].attributes.url"
        :tags="event.tags.split(', ')"
        :title="event.title"
        :date="event.date"
        :body="event.body"
        />
      </v-col>
      <v-col v-if="this.$store.state.user.email=='mislav0508@hotmail.com'" cols="12" xl="3" lg="3" md="3" sm="3">

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
            v-model="Image"
            show-size
            :rules="imageRules"
          ></v-file-input>
          
          <v-text-field
            color="#222222"
            clearable
            v-model="title"
            label="Title"
            type="text"
            name="Title"
            :rules="requiredRules"
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
                :rules="requiredRules"
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
            :rules="requiredRules"
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
            :rules="requiredRules"
          ></v-select>

          <v-btn large color="primary" type="submit" width="100%" :disabled="!Image || !title || !date || !locale || !body" class="grid-submit-btn mt-5">Create Event</v-btn>

          <v-alert
          v-if="createAlert"
          class="grid-alert my-5"
          type="success"
          dense
          >Event created!</v-alert>

        </v-form>

        <v-row class="d-flex align-center justify-center flex-column my-5 px-4">
          <h3 class="py-5">Update an event.</h3>
          <v-select
            :items="titles"
            v-model="update_title"
            @change="fillUpdateFields(update_title)"
            label="Select event to update"
            dense
            class="py-5"
          ></v-select>
          <v-btn large color="primary" type="submit" width="100%" :disabled="!update_title" class="grid-submit-btn mt-5" @click="updateEvent">Update Event</v-btn>
          <v-alert
            v-if="updateAlert"
            class="my-5"
            type="success"
            dense
            >Event updated!</v-alert>
        </v-row>

        <v-row class="d-flex align-center justify-center flex-column my-5 px-4">
          <h3 class="py-5">Delete an event.</h3>
          <v-select
            :items="titles"
            v-model="delete_title"
            label="Select event to delete"
            dense
            class="py-5"
          ></v-select>
          <v-btn large color="error" type="submit" width="100%" :disabled="!delete_title" class="grid-submit-btn mt-5" @click="deleteEvent">Delete Event</v-btn>
          <v-alert
            v-if="deleteAlert"
            class="my-5"
            type="success"
            dense
            >Event deleted!</v-alert>
        </v-row>

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
      Image: null,
      title: '',
      titles: [],
      update_title: '',
      tags: [],
      date: '',
      body: '',
      locale: '',
      menu: false,
      createAlert: false,
      error: '',
      event_ids: [],
      delete_title: '',
      deleteAlert: false,
      updateAlert: false,
    }
  },
  methods: {
    async createEvent() {
      const jwt = this.$cookies.get('jwt')

      // CREATE NEW ENTRY
      if (this.tags == []) this.tags = ''
      try {
        var res = await this.$axios.$post(`${process.env.STRAPI_API}/api/events`, {
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
          "title": `${this.title}`,
          "tags": `${this.tags.toString().replaceAll(',', ', ')}`,
          "date": `${this.date}`,
          "body": `${this.body}`,
        }
        })        
        console.log("res",res.data.id);
      } catch (error) {
        this.error = error
        console.log(error.response);
      }

      // IMAGE UPLOAD
      let ImageID = await res.data.id
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwt}`);

      var formdata = new FormData();
      formdata.append("files", this.Image, this.Image.name);
      formdata.append("ref", "api::event.event");
      formdata.append("refId", ImageID);
      formdata.append("field", "Image");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      await fetch(`${process.env.STRAPI_API}/api/upload`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      this.createAlert = true
      setTimeout(() => {
        this.createAlert = false
      }, 3500)

    },
    async updateEvent() {
      if (this.tags == []) this.tags = ''
      const jwt = this.$cookies.get('jwt')

      // DETERMINING WHICH EVENT TO UPDATE
      var update_title = this.events.filter((x,i) => {
        return x.title == this.update_title
      })
      console.log("update_title",update_title);

      try {
        let res = await this.$axios.$put(`${process.env.STRAPI_API}/api/events/${update_title[0].id}`, {
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
          "title": `${this.title}`,
          "tags": `${this.tags.toString().replaceAll(',', ', ')}`,
          "date": `${this.date}`,
          "body": `${this.body}`,
        }
        })

        // DELETE EXISTING IMAGE
        let deleted = await this.$axios.$delete(`${process.env.STRAPI_API}/api/upload/files/${update_title[0].Image_id}`)
        console.log("deleted",deleted);

        // IMAGE UPLOAD
        let ImageID = await res.data.id
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`);

        var formdata = new FormData();
        formdata.append("files", this.Image, this.Image.name);
        formdata.append("ref", "api::event.event");
        formdata.append("refId", ImageID);
        formdata.append("field", "Image");

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        await fetch(`${process.env.STRAPI_API}/api/upload`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        this.updateAlert = true
        setTimeout(() => {
          this.updateAlert = false
        }, 3500)

        console.log("res",res);
      } catch (error) {
        this.error = error
        console.log(error.response);
      }
    },
    async deleteEvent() {
      // DETERMINING WHICH EVENT TO DELETE
      var delete_title = this.events.filter((x,i) => {
        return x.title == this.delete_title
      })
      try {
        let res = await this.$axios.$delete(`${process.env.STRAPI_API}/api/events/${delete_title[0].id}`)
        this.deleteAlert = true
        setTimeout(() => {
          this.deleteAlert = false
        }, 3500)
        this.delete_title = ''

        console.log("res",res);
      } catch (error) {
        this.error = error
        console.log(error.response);
      }
    },
    fillUpdateFields(update_title) {
      var fields = this.events.filter((x,i) => {
        return x.title == update_title
      })
      console.log("fields",fields);
      // IMAGE DOESN'T WORK WHEN FILLED
      this.title = fields[0].title
      this.tags = fields[0].tags.split(', ')
      this.date = fields[0].date
      this.body = fields[0].body
      this.locale = fields[0].locale
    }
  },
  computed: {
    filteredEvents : function() {
      return this.events.filter(obj => {
          return obj.strings.toLowerCase().includes(this.search.toLowerCase()) 
                 
      })
    }
  },
  watch: {
    Image (val, prev) {
      console.log("prev",prev);
      console.log("val",val.name);
      
    }
  },
  async mounted() {
    // FETCHING LOCALES FROM STRAPI    
    const { attributes } = await this.fetchEventsLocales(this.$store.state.path)
    this.events = attributes
    this.event_ids = attributes.map((x,i) => x.id)
    this.titles = this.events.map((x,i) => x.title)

  }
}
</script>

<style lang="scss" scoped>
.block-1-events{
  min-height: 40vh;
}
.title-wide-img{
  min-height: 40vh;
  max-height: 40vh;
  min-width: 100vw;
  object-fit: cover;
  filter: brightness(80%);
}
.title-text{
  position: absolute;
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