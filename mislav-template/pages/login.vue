<template>
  <v-app>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title v-if="!this.$store.state.token">{{ title }}</v-toolbar-title>
                        <v-toolbar-title v-else>{{ this.$store.state.user.username }}</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              :prepend-icon="icons.mdiAccount"
                              name="Email"
                              label="Email"
                              type="email"
                              :rules="emailRules"
                              v-model="email"
                           ></v-text-field>
                           <v-text-field
                              :prepend-icon="icons.mdiKey"
                              id="password"
                              name="password"
                              label="Password"
                              type="password"
                              :rules="passwordRules"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>  

                        <v-btn color="primary" 
                          :nuxt="true"
                          :to="localePath('/')"
                          v-if="!this.$store.state.token" 
                          @click.native="Login()"
                          :disabled="!password || !email"
                        >{{ title }}</v-btn>
                        
                        <NuxtLink v-else :to="localePath('/')" @click.native="Logout()">
                           <v-btn color="primary" 
                          >Logout</v-btn>
                        </NuxtLink>

                        <v-snackbar v-model="snackbar">
                          {{ error }}
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
import { mdiAccount , mdiKey  } from '@mdi/js'
import inputRules from "../mixins/inputRules"
export default {
  mixins: [ inputRules ],
  data() {
    return {
      title: 'Login',
      icons: {
         mdiAccount,
         mdiKey  
      },
      email: 'mislav0508@hotmail.com',
      password: '',
      error: '',
      snackbar: false,
    }
  },
  methods: {
    async Login() {  
      // pass is Mislav@ and usual
      try {
        let res = await this.$axios.$post(`${process.env.STRAPI_API}/api/auth/local`, {
        identifier: this.email,
        password: this.password
        })
        // console.log("res",res);
        const { jwt, user } = res
        this.$cookies.set('jwt', jwt, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('userData', user, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        // retrieving the cookie
        // const cookieRes = this.$cookies.get('userData')

        this.$store.dispatch('setToken', jwt)
        this.$store.dispatch('setUser', user) 
        this.$store.dispatch('setPath', 'en')

        // setTimeout(() => {
        //   this.$router.push({
        //     path: 'en/events'
        //   })
        // }, 500);
      } catch (error) {
        console.log(error.response);
        this.error = error.response.data.error.message
        this.snackbar = true        
      }
    },
    async Logout() {
      this.$cookies.remove('jwt')
      this.$cookies.remove('userData')

      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<style>

</style>