<template>
  <v-container fluid>
    <!-- Navbar -->
    <v-row>
      <!-- Main Navbar -->
      <v-col cols="8">
        <div class="d-flex">
          <v-btn
            :min-height="40"
            :max-height="40"
            :min-width="40"
            :max-width="40"
            x-small
            color="grey darken-1"
            class="mx-3 rounded-lg"
            outlined
          >
            <v-icon color="grey darken-3">mdi-arrow-left-thin</v-icon>
          </v-btn>
          <v-btn
            :min-height="40"
            :max-height="40"
            :min-width="40"
            :max-width="40"
            x-small
            color="grey darken-4"
            class="mx-4 rounded-lg"
          >
            <v-icon color="white">mdi-apple</v-icon>
          </v-btn>
          <div class="d-flex flex-column">
            <span class="subtitle-2">Apple</span>
            <span class="caption"
              >5 boards <v-icon class="mx-0 px-0">mdi-circle-small</v-icon> 24
              members</span
            >
          </div>
        </div>
      </v-col>
      <!-- Sub Navbar -->
      <v-col cols="4" class="d-flex align-center">
        <v-text-field
          outlined
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          hide-details
          dense
          class="mr-2 caption rounded-lg"
        ></v-text-field>
        <v-btn
          :min-height="40"
          :max-height="40"
          :min-width="40"
          :max-width="40"
          x-small
          color="grey darken-1"
          class="mx-2 rounded-lg"
          outlined
        >
          <v-icon color="grey darken-3">mdi-share-outline</v-icon>
        </v-btn>
        <v-btn
          :min-height="40"
          :max-height="40"
          :min-width="40"
          :max-width="40"
          x-small
          color="grey darken-1"
          class="mx-2 rounded-lg"
          outlined
        >
          <v-icon color="grey darken-3">mdi-cog</v-icon>
        </v-btn></v-col
      >
    </v-row>
    <!-- Section Container -->
    <v-row>
      <v-col>
        <v-sheet class="mx-auto" flat>
          <div class="d-flex align-start overflow-auto">
            <div
              v-for="(section, sectionIndex) in sectionGroups"
              :key="section._id"
              class="mx-2"
            >
              <div class="d-flex align-center justify-space-between py-2">
                <span class="subtitle-2 ml-1">{{ section.name }}</span>
                <span>
                  <button
                    class="caption font-weight-bold mt-2"
                    @click="addTask(section)"
                  >
                    <v-icon class="mr-1" small> mdi-plus </v-icon>
                  </button>
                  <v-menu
                    :ref="`menu${sectionIndex}`"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-x
                    :min-width="80"
                    :max-width="80"
                  >
                    <template #activator="{ on, attrs }">
                      <v-icon class="mr-1" small v-bind="attrs" v-on="on">
                        mdi-dots-horizontal
                      </v-icon>
                    </template>

                    <v-card>
                      <v-list id="menu-list">
                        <v-list-item
                          v-for="(item, i) in horizontalDotsMenuLists"
                          :key="i"
                          class="cursor-pointer py-0"
                          @click="updateSectionList(item, section)"
                        >
                          <v-list-item-content>
                            <v-list-item-title class="d-flex align-center">
                              <v-icon
                                class="mr-2"
                                small
                                :color="
                                  item.title === 'Delete' ? 'error' : 'success'
                                "
                                >{{ item.icon }}</v-icon
                              >
                              <span class="caption black--text">
                                {{ item.title }}</span
                              >
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </span>
              </div>
              <v-card
                class="overflow-auto rounded-xl mb-2"
                color="grey lighten-5"
                :height="450"
                :min-height="450"
                :max-height="450"
                :width="235"
                :min-width="235"
                :max-width="235"
                flat
              >
                <v-card-text class="pa-3">
                  <draggable
                    data-source="tasks"
                    :list="section.list"
                    class="list-group"
                    draggable=".item"
                    group="sections"
                    :animation="200"
                    :scroll-sensitivity="300"
                    :force-fallback="true"
                    @change="updatedSectionTaskList($event, section)"
                  >
                    <div
                      v-for="(task, taskIndex) in section.list"
                      :key="task._id"
                      class="item mb-2"
                    >
                      <v-card class="rounded-xl" flat outlined>
                        <v-card-title class="pt-2 pb-2">
                          <span class="subtitle-2"
                            >{{ task?.name?.substring(0, 15)
                            }}{{ task?.name?.length > 15 ? '...' : '' }}</span
                          >
                          <v-spacer></v-spacer>
                          <v-menu
                            :ref="`menuTask${taskIndex}`"
                            :close-on-content-click="false"
                            :nudge-width="200"
                            offset-x
                            :min-width="80"
                            :max-width="80"
                          >
                            <template #activator="{ on, attrs }">
                              <v-icon
                                class="mr-1"
                                small
                                v-bind="attrs"
                                v-on="on"
                              >
                                mdi-dots-horizontal
                              </v-icon>
                            </template>

                            <v-card>
                              <v-list id="menu-list">
                                <v-list-item
                                  v-for="(item, i) in horizontalDotsMenuLists"
                                  :key="i"
                                  class="cursor-pointer py-0"
                                  @click="updateTaskList(item, section, task)"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title
                                      class="d-flex align-center"
                                    >
                                      <v-icon
                                        class="mr-2"
                                        small
                                        :color="
                                          item.title === 'Delete'
                                            ? 'red'
                                            : 'green'
                                        "
                                        >{{ item.icon }}</v-icon
                                      >
                                      <span class="caption blackColor--text">
                                        {{ item.title }}</span
                                      >
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-menu>
                        </v-card-title>

                        <v-card-text
                          class="caption font-weight-medium card-content pr-2"
                        >
                          {{ task.description }}
                        </v-card-text>

                        <v-card-actions
                          class="d-flex align-center justify-space-between"
                        >
                          <div>
                            <v-avatar color="grey" size="27" class="mx-2">
                              <img :src="task.assignee" alt="" />
                            </v-avatar>
                            <span class="caption black--text">{{
                              task.date
                            }}</span>
                          </div>
                          <v-chip class="caption" small color="grey lighten-3">
                            {{ task.subtitle?.substring(0, 6) }}
                          </v-chip>
                        </v-card-actions>
                      </v-card>
                    </div>
                    <div
                      key="footer"
                      slot="footer"
                      class="text-center"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        class="caption font-weight-bold mt-2"
                        @click="addTask(section)"
                      >
                        <v-icon color="green" small>mdi-plus</v-icon>Add Task
                      </button>
                    </div>
                  </draggable>
                </v-card-text>
              </v-card>
            </div>
            <button
              v-if="sectionGroups?.length"
              class="caption font-weight-bold mt-2 ml-4"
              @click="createSectionDialog = true"
            >
              <v-icon color="green" small>mdi-plus</v-icon>Add Section
            </button>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-if="!sectionGroups?.length">
      <v-col>
        <div class="d-flex align-center justify-center flex-column">
          <img
            class="empty-state-svg-icon"
            src="../assets/EmptyState.svg"
            alt="EmptyState"
          />
          <button
            class="caption font-weight-bold"
            @click="createSectionDialog = true"
          >
            <v-icon color="green" small>mdi-plus</v-icon>Add Section
          </button>
        </div>
      </v-col>
    </v-row>
    <!-- Dialog -->
    <!-- Dialogs for sections -->
    <v-dialog v-model="createSectionDialog" persistent max-width="290">
      <UpdateSectionPopup
        @createList="createSection"
        @closeList="closeSectionDialog"
        :contentProps="'Create'"
        :validSectionProps="validSection"
        :sectionTitleProps="sectionTitle"
        :nameRulesProps="nameRules"
      />
    </v-dialog>
    <v-dialog v-model="updateSectionDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <UpdateSectionPopup
          @createList="updateSection"
          @closeList="closeSectionDialog"
          :contentProps="'Update'"
          :validSectionProps="validSection"
          :sectionTitleProps="sectionTitle"
          :nameRulesProps="nameRules"
        />
      </v-form>
    </v-dialog>
    <v-dialog v-model="deleteSectionDialog" persistent max-width="290">
      <DeletePopup
        @deleteList="deleteSection"
        @closeList="closeDeleteSectionDialog"
        :title="'Section'"
      />
    </v-dialog>
    <!-- Dialogs for Task -->
    <v-dialog v-model="createTaskDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <UpdateTaskPopup
          @createList="createTask"
          @closeList="closeTaskDialog"
          :contentProps="'Create'"
          :validTaskProps="validTask"
          :taskProps="task"
          :nameRulesProps="nameRules"
          :peopleProps="people"
        />
      </v-form>
    </v-dialog>
    <v-dialog v-model="updateTaskDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <UpdateTaskPopup
          @createList="updateTask"
          @closeList="closeTaskDialog"
          :contentProps="'Create'"
          :validTaskProps="validTask"
          :taskProps="task"
          :nameRulesProps="nameRules"
          :peopleProps="people"
        />
      </v-form>
    </v-dialog>
    <v-dialog v-model="deleteTaskDialog" persistent max-width="290">
      <DeletePopup
        @deleteList="deleteTask"
        @closeList="closeDeleteTaskDialog"
        :title="'Task'"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
const srcs = {
  1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
  2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
  3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
  5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
}
export default {
  components: {
    draggable,
  },
  data: () => ({
    menu: null,
    nameRules: [(v) => !!v || 'Field is required'],
    validSection: true,
    sectionTitle: '',
    sectionId: '',
    createSectionDialog: false,
    updateSectionDialog: false,
    deleteSectionDialog: false,
    sectionGroups: [],
    validTask: true,
    task: {
      name: '',
      description: '',
      assignee: '',
      subtitle: '',
      date: '',
    },
    defaultTask: {
      name: '',
      description: '',
      assignee: '',
      subtitle: '',
      date: '',
    },
    taskId: '',
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    ],
    createTaskDialog: false,
    updateTaskDialog: false,
    deleteTaskDialog: false,
    horizontalDotsMenuLists: [
      { title: 'Edit', icon: 'mdi-pencil' },
      { title: 'Delete', icon: 'mdi-delete' },
    ],
    people: [
      { header: 'Group 1' },
      { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
      { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
      { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
      { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
      { divider: true },
      { header: 'Group 2' },
      { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
      { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
      { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
      { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
    ],
  }),
  created() {
    this.getAllSections()
  },
  methods: {
    // Section CRUD API Integration
    // POST API
    async createSection(value) {
      try {
        if (value?.length) {
          const payload = {
            name: value,
          }
          const response = await this.$axios.$post('/sections', payload)
          if (response.status === 200 || response.status === 201) {
            this.getAllSections()
            this.createSectionDialog = false
            this.sectionTitle = ''
          }
        }
      } catch (error) {
        console.log(error)
        this.createSectionDialog = false
        this.sectionTitle = ''
      }
    },
    // PUT API
    updateSectionList(item, section) {
      this.sectionId = section?._id
      if (item.title === 'Edit') {
        this.updateSectionDialog = true
        this.sectionTitle = section?.name
      } else {
        this.updateSectionDialog = false
        this.deleteSectionDialog = true
        this.sectionTitle = ''
      }
    },
    async updateSection(value) {
      try {
        if (value?.length) {
          const payload = {
            name: value,
          }
          const response = await this.$axios.$put(
            `/sections/${this.sectionId}`,
            payload
          )
          if (response.status === 200) {
            this.getAllSections()
            this.updateSectionDialog = false
            this.sectionTitle = ''
            this.sectionId = ''
          }
        }
      } catch (error) {
        console.log(error)
        this.updateSectionDialog = false
        this.sectionTitle = ''
        this.sectionId = ''
      }
    },
    // DELETE API
    async deleteSection() {
      try {
        const response = await this.$axios.$delete(
          `/sections/${this.sectionId}`
        )
        if (response.status === 200) {
          this.getAllSections()
          this.updateSectionDialog = false
          this.deleteSectionDialog = false
          this.sectionTitle = ''
          this.sectionId = ''
        }
      } catch (error) {
        console.log(error)
        this.updateSectionDialog = false
        this.deleteSectionDialog = false
        this.sectionTitle = ''
        this.sectionId = ''
      }
    },
    // GET API
    async getAllSections() {
      try {
        const response = await this.$axios.$get('/sections')
        if (response.status === 200) {
          console.log(response)
          this.sectionGroups = [...response?.data]
        }
      } catch (error) {
        console.log(error)
      }
    },
    // Close Dialog
    closeSectionDialog() {
      this.createSectionDialog = false
      this.updateSectionDialog = false
    },
    closeDeleteSectionDialog() {
      this.deleteSectionDialog = false
    },

    // Task CRUD API Integration
    // Getting section is
    addTask(section) {
      this.sectionId = section._id
      this.createTaskDialog = true
    },
    // POST API
    async createTask() {
      try {
        if (
          this.task?.name?.length &&
          this.task?.description?.length &&
          this.task?.subtitle?.length
        ) {
          const payload = { ...this.task }
          const response = await this.$axios.$post(
            `/sections/${this.sectionId}/task`,
            payload
          )
          if (response.status === 200 || response.status === 201) {
            this.getAllSections()
            this.createTaskDialog = false
            this.task = { ...this.defaultTask }
          }
        }
      } catch (error) {
        this.createTaskDialog = false
        this.task = { ...this.defaultTask }
        console.log(error)
      }
    },
    // PUT API
    updateTaskList(item, section, task) {
      this.sectionId = section?._id
      this.taskId = task._id
      if (item.title === 'Edit') {
        this.updateTaskDialog = true
        this.task = { ...task }
      } else {
        this.deleteTaskDialog = true
        this.task = { ...this.defaultTask }
      }
    },
    async updateTask() {
      try {
        if (
          this.task?.name?.length &&
          this.task?.description?.length &&
          this.task?.subtitle?.length
        ) {
          const payload = { ...this.task }
          const response = await this.$axios.$put(
            `/sections/${this.sectionId}/task/${this.taskId}`,
            payload
          )
          if (response.status === 200 || response.status === 201) {
            this.getAllSections()
            this.updateTaskDialog = false
            this.sectionId = ''
            this.task = { ...this.defaultTask }
          }
        }
      } catch (error) {
        console.log(error)
        this.updateTaskDialog = false
        this.sectionId = ''
        this.task = { ...this.defaultTask }
      }
    },
    // DELETE API
    async deleteTask() {
      try {
        const response = await this.$axios.$delete(
          `/sections/${this.sectionId}/task/${this.taskId}`
        )
        if (response.status === 200) {
          this.getAllSections()
          this.deleteTaskDialog = false
          this.sectionId = ''
          this.task = { ...this.defaultTask }
        }
      } catch (error) {
        console.log(error)
        this.deleteTaskDialog = false
        this.sectionId = ''
        this.task = { ...this.defaultTask }
      }
    },
    // Close Dialogs
    closeTaskDialog() {
      this.createTaskDialog = false
      this.updateTaskDialog = false
    },
    closeDeleteTaskDialog() {
      this.deleteTaskDialog = false
    },
    // Moving Task one section two another section
    async updatedSectionTaskList(event, section) {
      const task = await event?.added?.element
      const sectionId = await section._id
      if (event?.added) {
        try {
          const payload = { ...task }
          const response = await this.$axios.$post(
            `/sections/${sectionId}/task`,
            payload
          )
          if (response.status === 200 || response.status === 201) {
            this.getAllSections()
          }
        } catch (error) {
          console.log(error)
        }
      } else if (event?.removed) {
        const task = await event?.removed?.element
        try {
          const response = await this.$axios.$delete(
            `/sections/${sectionId}/task/${task?._id}`
          )
          if (response.status === 200) {
            this.getAllSections()
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
<style scoped>
/* Hide Scrollbar for div */
div::-webkit-scrollbar {
  display: none;
}
/* Card content height and overflow text */
.card-content {
  height: 40px;
  width: 100%;
  overflow-y: auto;
}
/* Menu list  */
.v-list {
  border-radius: 10px !important;
  padding: 4px 4px !important;
}
.v-list#menu-list {
  border-radius: 10px !important;
  background: white !important;
}
.v-menu__content {
  border-radius: 20px !important;
}
:deep(#menu-list .v-list-item) {
  margin: 0px 0px !important;
  padding: 0px 5px !important;
  height: 10px !important;
  min-height: 30px !important;
  max-height: 10px !important;
}
:deep(#menu-list .v-list-item:hover) {
  background: rgb(239, 239, 239) !important;
  border-radius: 18px !important;
  color: black !important;
}
/* Dialog */
:deep(.v-dialog) {
  box-shadow: none !important;
  border-radius: 20px !important;
}
/* Icons */
:deep(.v-icon--link::after) {
  background-color: transparent !important;
}
.empty-state-svg-icon {
  width: 30rem;
  height: 10rem;
}
</style>
