<template>
  <v-app dark>
    <v-app-bar fixed app dense flat>
      <div class="mr-2">
        <v-icon small color="red lighten-1">mdi-circle</v-icon>
        <v-icon small color="yellow darken-3">mdi-circle</v-icon>
        <v-icon small color="green lighten-1">mdi-circle</v-icon>
      </div>
      <v-btn icon x-small color="grey darken-2" class="mx-4">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon small color="grey darken-2">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon small color="grey lighten-2">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon x-small color="grey darken-2" class="mx-4">
        <v-icon>mdi-shield-half-full</v-icon>
      </v-btn>
      <v-text-field
        placeholder="Search here..."
        append-icon="mdi-refresh"
        hide-details
        solo
        dense
        class="rounded-lg poppins-regular text-center"
      >
        <template #label>
          <div class="d-flex align-center justify-center" style="width: 400px">
            <v-icon small class="mb-1 mx-2"> mdi-lock </v-icon>
            <span class="poppins-regular">easykanban.com</span>
          </div>
        </template>
      </v-text-field>
      <v-spacer />
      <v-btn icon x-small color="grey darken-2" class="mx-2">
        <v-icon>mdi-download-circle-outline</v-icon>
      </v-btn>
      <v-btn icon x-small color="grey darken-2" class="mx-2">
        <v-icon>mdi-export</v-icon>
      </v-btn>
      <v-btn icon x-small color="grey darken-2" class="mx-2">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon x-small color="grey darken-2" class="mx-2">
        <v-icon>mdi-invoice-multiple</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <v-spacer />
      <span class="poppins-regular"> Created Date : 23-04-2024</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  font-family: 'Poppins' !important;
}
html {
  font-family: 'Poppins' !important;
}
div,span,
p,
a, input {
  font-family: 'Poppins' !important;
  font-size: 12px;
}
button{
  font-family: 'Poppins' !important;
  text-transform: capitalize !important;
  font-size: 12px;
}
.v-input__icon.v-input__icon--append i {
  font-size: 20px;
}
.v-text-field--outlined.v-input--dense.v-text-field--outlined {
  min-height: 10px !important;
}
</style>
