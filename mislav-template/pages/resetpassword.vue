<template>
  <v-app>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md6 >
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <h3 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-30">
                        Recover Your. Password
                        </h3>
                     </v-toolbar>
                     <v-card-text>
                        <p v-show="error" class="text-sm text-red-500">An error occurred</p>
                     </v-card-text>
                     <v-card-actions class="d-flex flex-column">
                        <v-spacer></v-spacer>
                        <v-text-field
                          label="Enter password"
                          v-model="password"
                        ></v-text-field>
                          <v-text-field
                          label="Confirm Password"
                          v-model="confirmPassword"
                        ></v-text-field>
                        <v-btn color="primary" 
                        :disabled="password.length < 3 || password !== confirmPassword"
                          @click.native="resetPassword"
                        >
                        Reset Password
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
    name: 'ResetPassword',
    data() {
        return {
            password: '',
            confirmPassword: '',
            done: false,
            error: false,
        }
    },
    methods: {
        async resetPassword(e) {
            e.preventDefault()
            this.axios.post(`http://localhost:1338/api/auth/reset-password`, {
                code: this.$route.query.code,
                password: this.password,
                passwordConfirmation: this.confirmPassword
            })
            .then(() => {
                this.done = true
                this.$router.push("login")
            })
            .catch(e => {
                e;
                this.error = true
            })
        }
    },
}
</script>
<style scoped>
</style>