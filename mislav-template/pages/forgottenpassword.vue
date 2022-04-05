<template>
  <v-app>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <h3 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-30">
                        Recover Your Password
                        </h3>
                     </v-toolbar>
                     <v-card-text>
                        <p v-show="done" class="text-sm text-green-500">Password reset link has been sent to {{ email }}</p>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-text-field
                          label="email"
                          v-model="email"
                        ></v-text-field>
                          <v-btn color="primary" 
                           @click.native="forgotPassword"
                           :loading="loading"
                          >
                          Send Email link 
                          <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']"></font-awesome-icon>
                          </v-btn>

                          <v-snackbar v-model="snackbar">
                          {{ alert }}
                            <template v-slot:action="{ attrs }">
                                <v-btn
                                color="pink"
                                text
                                v-bind="attrs"
                                @click="snackbar = false"
                                >
                                Close
                                </v-btn>
                          </template>
                          </v-snackbar>

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
              email: 'mcdesign0508@gmail.com',
              done: false,
              snackbar: false,
              alert: '',
              loading: false
          }
      },
      methods: {
          async forgotPassword(e) {
            this.loading = true
            e.preventDefault()
            await this.$axios.$post(`${process.env.STRAPI_API}/api/auth/forgot-password`, {
                email: this.email,
                url:
                `${process.env.STRAPI_API}/admin/plugins/users-permissions/auth/reset-password`,
            })
            .then(response => {
                this.loading = false
                console.log('Your user received an email', response);
                this.done = true
                this.snackbar = true
                this.alert = 'Your user received an email'
            })
            .catch(error => {
                this.loading = false
                console.log('An error occurred:', error.response);
                this.alert = `'An error occurred:' ${error.response.data.error.message}`
                this.snackbar = true
                
            });
          }
      }
    }
</script>
<style scoped>
</style>