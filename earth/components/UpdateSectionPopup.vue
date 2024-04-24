<template>
  <v-card>
    <v-card-title class="pb-0">
      <span class="subtitle-2">{{ content }} Section</span>
    </v-card-title>
    <v-card-text class="pr-2 mt-3 mb-0 pb-0">
      <v-text-field
        v-model="sectionTitle"
        placeholder="Create a title"
        hide-details
        dense
        outlined
        class="mr-2 caption rounded-lg mb-2"
        :rules="nameRules"
      ></v-text-field>
    </v-card-text>

    <v-card-actions class="grey lighten-4 my-0">
      <v-spacer></v-spacer>

      <v-btn text color="error" small @click="close"> Cancel </v-btn>
      <v-btn
        color="success"
        text
        small
        class="mr-3"
        @click="createList"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
    'contentProps',
    'validSectionProps',
    'sectionTitleProps',
    'nameRulesProps',
  ],
  data: () => {
    return {
      content: '',
      validSection: '',
      sectionTitle: '',
      nameRules: [],
    }
  },
  created() {
    this.content = this.contentProps
    this.validSection = this.validSectionProps
    this.sectionTitle = this.sectionTitleProps
    this.nameRules = this.nameRulesProps
  },
  watch: {
    contentProps(val) {
      this.content = val
    },
    validSectionProps(val) {
      this.validSection = val
    },
    sectionTitleProps(val) {
      this.sectionTitle = val
    },
    nameRulesProps(val) {
      this.nameRules = val
    },
  },
  methods: {
    createList() {
      this.$emit('createList', this.sectionTitle)
    },
    close() {
      this.$emit('closeList')
    },
  },
}
</script>
