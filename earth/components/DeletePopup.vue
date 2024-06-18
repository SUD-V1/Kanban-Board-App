<template>
  <v-card>
    <v-card-title class="pb-0">
      <span class="poppins-medium">Delete {{ content }}</span>
    </v-card-title>
    <v-card-title class="py-0">
      <div class="d-flex align-start">
      <v-icon color="yellow darken-2" class="mr-2 mt-1"
        >mdi-alert-circle-outline</v-icon
      >
      <span class="poppins-regular text-center"
        >Are you sure you want to delete <br>
        <b class="black--text">{{ content }}?</b></span
      >
    </div>
    </v-card-title>

    <v-card-actions class="grey lighten-4 my-0">
      <v-spacer></v-spacer>

      <v-btn text color="grey" small @click="close"> Cancel </v-btn>
      <v-btn color="error" text small class="mr-3" @click="deleteList">
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['title'],
  data: () => {
    return {
      content: '',
    }
  },
  created() {
    this.content = this.title
  },
  watch: {
    title(val) {
      this.content = val
    },
  },
  methods: {
    deleteList() {
      this.$emit('deleteList')
    },
    close() {
      this.$emit('closeList')
    },
  },
}
</script>
