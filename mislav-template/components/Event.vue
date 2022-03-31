<template>

  <v-container @click="handleClick" data-aos="fade-up" 
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-once="true">

    <div class="d-flex align-stretch justify-center flex-column text-center ">
      <v-row class="pa-5">

      <v-row class="img-container d-flex align-center justify-center">
        <div class="add"></div>
        <img :src="image" alt="img" class="gallery-item-img">
      </v-row>

      <v-row class="d-flex flex-column">
        <v-row class="d-flex justify-space-around pt-7 pb-5">
          <v-chip v-for="(tag,i) in tags" :key="i" outlined
          >
            {{ tag }}
          </v-chip>
        </v-row>

        <v-row class="d-flex align-center justify-center">
          <h3>{{ title }}</h3>
        </v-row>

        <v-row class="d-flex align-center justify-center pt-5">
          <p >{{ date }}</p>
        </v-row>
      </v-row>

      </v-row>

    </div>

    <v-dialog
      v-model="dialog"
      hide-overlay
      :width="width"
    >
      <v-card class="v-card">
        <v-card-title class="text-h5 grey lighten-2">
          {{ title }}
        </v-card-title>

        <v-card-text class="pt-5">
          {{ body }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            X
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>
import aosMixin from "../mixins/aos"
export default {
  mixins: [aosMixin],
  props: { 
    image: String,
    index: Number,
    tags: Array,
    title: String,
    date: String,
    body: String
   },
  data() {
    return {
      dialog: false,
      width: "50vw"
    }
  },
  methods: {
    handleClick: function () {
      this.dialog = true
      this.$emit('modal-true', true)
      this.$emit('current-index', this.index)
    }
  },
  mounted() {
    if (screen.width <= 960) {
      this.width = "90vw"
    }
  }
}
</script>

<style lang="scss" scoped>
.block-1-rooms{
  min-height: 30vh;
}
.gallery-item-img {
  width: 100%;
  min-width: 15vw;
  height: 100%;
  min-height: 20vh;
  object-fit: cover;
  overflow: hidden;
  transition: all 0.35s linear;
  cursor: pointer;
  
}
@media screen and (max-width: 1264px) {
  .gallery-item-img {
    min-width: 20vw;
  }
}
h3{
  font-size: clamp(20px, 1.5vw, 35px);
  font-weight: 400;
  letter-spacing: 0px
}
// PLUS SIGN
.img-container{
  @include img-container;
}
.add {
  @include add;  
}
// horizontal
.add::before{
  content: '';
  position: absolute;
  left: 250%;
  top: 50%;
  width: 60px;
  margin-left: -40px;
  margin-top: -5px;
  border-top: 2px solid;
  transition: all 0.35s ease;
}
// vertical
.add::after {
 content: '';
 position: absolute;
 left: 55%;
 top: -120%;
 height: 60px;
 margin-left: -5px;
 margin-top: -40px;
 border-left: 2px solid;
 transition: all 0.35s ease;
}
// v-dialog
.v-card{
  text-align: center;
}
// .v-dialog{
//   width: 0;
// }
// .v-dialog > *{
//   width:50vw;  
// }
// @media only screen and (max-width: 960px) {
//   .v-dialog > *{
//   width:90vw;
// }
// }

</style>