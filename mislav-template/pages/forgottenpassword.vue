<template>
  <v-app>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <h3 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-30">
                        Recover Your. Password
                        </h3>
                     </v-toolbar>
                     <v-card-text>
                        <p v-show="done" class="text-sm text-green-500">Password reset link has been sent to {{ email }}</p>
                        <p v-show="error" class="text-sm text-red-500">An error occurred</p>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-text-field
                          label="email"
                          v-model="email"
                        ></v-text-field>
                          <v-btn color="primary" 
                           @click.native="forgotPassword"
                          >
                          Send Email link 
                          <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']"></font-awesome-icon>
                          </v-btn>

                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>
<script>
    export default {
      name: 'ForgotPassword',

      data() {
          return {
              email: '',
              done: false,
              error: false,
          }
      },
      mounted() {
        console.log("this.$route.query.code",this.$route.query.code)
      },
      methods: {
          async forgotPassword(e) {
              e.preventDefault()
              this.done = false;
              this.error = false;
              this.$axios.$post(`http://localhost:1338/api/auth/forgot-password`, {
                  email: this.email
              })
              .then(() => {
                  this.done = true
              })
              .catch(e => {
                  console.log(e.response);;
                  this.error = true
              })
          }
      }
    }
</script>
<style scoped>
</style>