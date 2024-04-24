<template>
  <v-card>
    <v-card-title class="pb-0">
      <span class="subtitle-2">{{ content }} Task</span>
    </v-card-title>
    <v-card-text class="pr-2 mt-3 mb-0 pb-0">
      <v-text-field
        v-model="task.name"
        placeholder="Create a title"
        hide-details
        dense
        outlined
        class="mr-2 caption rounded-lg mb-2"
        :rules="nameRules"
      ></v-text-field>
      <v-text-field
        v-model="task.subtitle"
        placeholder="Create a title"
        hide-details
        dense
        outlined
        class="mr-2 caption rounded-lg mb-2"
        :rules="nameRules"
      ></v-text-field>
      <v-textarea
        v-model="task.description"
        hide-details
        dense
        outlined
        rows="3"
        placeholder="Description"
        class="mr-2 caption rounded-lg my-2"
        :rules="nameRules"
      ></v-textarea>
      <v-autocomplete
        v-model="task.assignee"
        :items="people"
        item-text="name"
        item-value="avatar"
        placeholder="Assignee"
        outlined
        dense
        hide-details
        class="mr-2 caption rounded-lg mb-2"
      >
        <template v-slot:selection="data">
          <v-avatar left size="27">
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar>
          <span class="caption">{{ data.item.name }}</span>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar size="37">
              <img :src="data.item.avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="caption">{{
                data.item.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="caption">{{
                data.item.group
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="task.date"
            placeholder="Select date"
            append-icon="mdi-calendar"
            hide-details
            outlined
            dense
            readonly
            v-bind="attrs"
            v-on="on"
            class="mr-2 caption rounded-lg my-2"
          ></v-text-field>
        </template>
        <v-date-picker v-model="task.date" @input="menu = false"></v-date-picker>
      </v-menu>
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
    'validTaskProps',
    'taskProps',
    'nameRulesProps',
    'peopleProps',
  ],
  data: () => {
    return {
      menu: false,
      content: '',
      validTask: '',
      task: '',
      nameRules: [],
      people: [],
    }
  },
  created() {
    this.content = this.contentProps
    this.validTask = this.validTaskProps
    this.task = this.taskProps
    this.nameRules = this.nameRulesProps
    this.people = this.peopleProps
  },
  watch: {
    contentProps(val) {
      this.content = val
    },
    validTaskProps(val) {
      this.validTask = val
    },
    taskProps(val) {
      this.task = val
    },
    nameRulesProps(val) {
      this.nameRules = val
    },
    peopleProps(val) {
      this.people = val
    },
  },
  methods: {
    createList() {
      this.$emit('createList', this.task)
    },
    close() {
      this.$emit('closeList')
    },
  },
}
</script>
<style scoped>
:deep(.v-picker) {
  border-radius: 24px !important;
}
:deep(.v-picker.v-card) {
  border-radius: 24px !important;
}
:deep(.v-date-picker-title) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 10px !important;
  height: 10px !important;
}
:deep(.v-picker__title__btn) {
  font-size: 14px !important;
}
:deep(.v-picker__body) {
  max-height: 280px !important;
  max-height: max-content !important;
  min-height: 280px !important;
  width: 240px !important;
}
:deep(.v-date-picker-table table) {
  font-size: 10px !important;
}
:deep(.v-date-picker-years) {
  height: 280px !important;
}
:deep(.v-date-picker-title__year) {
  margin: 5px 0px 0px 0px !important;
}
:deep(.v-date-picker-header) {
  padding: 0px !important;
}
:deep(.v-date-picker-header__value) {
  font-size: 12px !important;
}
:deep(.v-date-picker-table) {
  overflow: scroll;
}
</style>
