<template>
  <v-card>
    <v-card-title class="pb-0">
      <span class="subtitle-2">Delete {{ content }}</span>
    </v-card-title>
    <v-card-title>
      <span class="caption text-center"
        ><v-icon color="yellow darken-2" class="mr-2"
          >mdi-alert-circle-outline</v-icon
        >Are you sure you want to delete this
        <b class="black--text">{{ content }}?</b></span
      >
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
