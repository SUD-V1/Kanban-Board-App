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
            <span class="poppins-regular font-weight-bold">Apple</span>
            <span class="poppins-regular"
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
          class="mr-2 poppins-regular rounded-lg"
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
              <div class="d-flex align-center justify-space-between my-2">
                <div class="poppins-medium">{{ section.name }}</div>
                <div class="d-flex align-center">
                  <v-btn
                    class="poppins-regular font-weight-bold mr-1"
                    fab
                    x-small
                    text
                    @click="addTask(section)"
                  >
                    <v-icon class="" small> mdi-plus </v-icon>
                  </v-btn>
                  <v-menu
                    :ref="`menu${sectionIndex}`"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-x
                    :min-width="80"
                    :max-width="80"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        class="poppins-regular font-weight-bold"
                        fab
                        x-small
                        text
                        @click="addTask(section)"
                      >
                        <v-icon small v-bind="attrs" v-on="on">
                          mdi-dots-horizontal
                        </v-icon>
                      </v-btn>
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
                              <span class="poppins-regular black--text">
                                {{ item.title }}</span
                              >
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </div>
              </div>
              <v-card
                class="overflow-auto rounded-xl mb-2 card-section"
                color="grey lighten-5"
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
                      v-for="(taskList, taskIndex) in section.list"
                      :key="taskList._id"
                      class="item mb-2"
                    >
                      <v-card class="rounded-xl" flat outlined>
                        <v-card-title class="pt-2 pb-2">
                          <span class="poppins-medium"
                            >{{ taskList?.name?.substring(0, 15)
                            }}{{
                              taskList?.name?.length > 15 ? '...' : ''
                            }}</span
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
                                  @click="
                                    updateTaskList(item, section, taskList)
                                  "
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
                                      <span class="poppins-regular blackColor--text">
                                        {{ item.title }}</span
                                      >
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-menu>
                        </v-card-title>

                        <v-card-text class="card-content pr-2">
                          {{ taskList.description }}
                        </v-card-text>

                        <v-card-actions
                          class="d-flex align-center justify-space-between"
                        >
                          <div>
                            <v-avatar color="grey" size="27" class="ml-2">
                              <img
                                v-if="taskList?.assignee"
                                :src="taskList.assignee"
                                alt=""
                              />
                              <v-icon v-else color="white">mdi-account</v-icon>
                            </v-avatar>
                            <span class="poppins-regular grey--text">{{
                              taskList.date
                            }}</span>
                          </div>
                          <v-chip class="poppins-regular" small color="grey lighten-4">
                            {{ taskList.subtitle?.substring(0, 7)
                            }}{{ taskList?.subtitle?.length > 8 ? '...' : '' }}
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
                      <v-btn
                        class="poppins-regular font-weight-medium mt-2"
                        small
                        text
                        @click="addTask(section)"
                      >
                        <v-icon color="green" small>mdi-plus</v-icon>Add Task
                      </v-btn>
                    </div>
                  </draggable>
                </v-card-text>
              </v-card>
            </div>
            <div class="my-2">
              <v-btn
                v-if="sectionGroups?.length"
                class="font-weight-medium"
                small
                text
                @click="createSectionDialog = true"
              >
                <v-icon color="green" small>mdi-plus</v-icon>Add Section
              </v-btn>
            </div>
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
          <v-btn
            class="poppins-regular font-weight-bold"
            small
            text
            @click="createSectionDialog = true"
          >
            <v-icon color="green" small>mdi-plus</v-icon>Add Section
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <!-- Dialog -->
    <!-- Dialogs for sections -->
    <!-- Create popup for task -->
    <v-dialog v-model="createSectionDialog" persistent max-width="290">
      <UpdateSectionPopup
        :content-props="'Create'"
        :valid-section-props="validSection"
        :section-title-props="sectionTitle"
        :name-rules-props="nameRules"
        @createList="createSection"
        @closeList="closeSectionDialog"
      />
    </v-dialog>
    <!-- Update popup for section -->
    <v-dialog v-model="updateSectionDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <UpdateSectionPopup
          :content-props="'Update'"
          :valid-section-props="validSection"
          :section-title-props="sectionTitle"
          :name-rules-props="nameRules"
          @createList="updateSection"
          @closeList="closeSectionDialog"
        />
      </v-form>
    </v-dialog>
    <!-- Delete popup for section -->
    <v-dialog v-model="deleteSectionDialog" persistent max-width="290">
      <DeletePopup
        :title="'Section'"
        @deleteList="deleteSection"
        @closeList="closeDeleteSectionDialog"
      />
    </v-dialog>
    <!-- Dialogs for Task -->
    <!-- Create popup for task -->
    <v-dialog v-model="createTaskDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <UpdateTaskPopup
          :content-props="'Create'"
          :valid-task-props="validTask"
          :task-props="task"
          :name-rules-props="nameRules"
          :people-props="people"
          @createList="createTask"
          @closeList="closeTaskDialog"
        />
      </v-form>
    </v-dialog>
    <!-- Update popup for task -->
    <v-dialog v-model="updateTaskDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <UpdateTaskPopup
          :content-props="'Update'"
          :valid-task-props="validTask"
          :task-props="task"
          :name-rules-props="nameRules"
          :people-props="people"
          @createList="updateTask"
          @closeList="closeTaskDialog"
        />
      </v-form>
    </v-dialog>
    <!-- Delete popup for task -->
    <v-dialog v-model="deleteTaskDialog" persistent max-width="290">
      <DeletePopup
        :title="'Task'"
        @deleteList="deleteTask"
        @closeList="closeDeleteTaskDialog"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
// Imported photos url from vuetify.com
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
    defaultSectionsLists: [
      {
        name: 'To do',
        list: [],
      },
      {
        name: 'In Progress',
        list: [],
      },
      {
        name: 'Done',
        list: [],
      },
    ],
    defaultSectionTaskLists: [
      {
        name: 'Kanban Integration',
        description:
          'A Kanban board is a visual tool used to manage and visualize work.',
        assignee: srcs[2],
        subtitle: 'Program',
        date: '2024-04-24',
      },
      {
        name: 'Kanban Integration',
        description: 'A Kanban board is a visual tool.',
        assignee: srcs[3],
        subtitle: 'Integration',
        date: '2024-04-25',
      },
      {
        name: 'Kanban Board Dialogs',
        description: 'A Kanban board is used to manage and visualize work.',
        assignee: srcs[5],
        subtitle: 'Design',
        date: '2024-04-26',
      },
    ],
  }),
  created() {
    this.getAllSections()
  },
  methods: {
    // Inserting Default Sections
    async defaultSections() {
      if (this.sectionGroups?.length === 0) {
        try {
          const payload = [...this.defaultSectionsLists]
          const response = await this.$axios.$post(
            '/sections/bulk-insert',
            payload
          )
          if (response.status === 200 || response.status === 201) {
            response?.data?.forEach((section) => {
              this.defaultSectionTasks(section._id)
            })
            this.getAllSections()
          }
        } catch (error) {
          this.createSectionDialog = false
        }
      }
    },
    // Inserting default section tasks
    async defaultSectionTasks(id) {
      try {
        const payload = [...this.defaultSectionTaskLists]
        const response = await this.$axios.$post(
          `/sections/${id}/bulk-insert`,
          payload
        )
        if (response.status === 200 || response.status === 201) {
          this.getAllSections()
        }
      } catch (error) {}
    },

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
            this.clearCreateData()
          }
        }
      } catch (error) {
        this.clearCreateData()
      }
    },
    // Clearing the exist data stored in field
    clearCreateData() {
      this.createSectionDialog = false
      this.sectionTitle = ''
    },
    // PUT API
    updateSectionList(item, section) {
      this.sectionId = section?._id
      if (item.title === 'Edit') {
        this.updateSectionDialog = true
        this.sectionTitle = section?.name
      } else {
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
            this.clearUpdateData()
          }
        }
      } catch (error) {
        this.clearUpdateData()
      }
    },
    // Clearing the exist data stored in field
    clearUpdateData() {
      this.updateSectionDialog = false
      this.sectionTitle = ''
      this.sectionId = ''
    },
    // DELETE API
    async deleteSection() {
      try {
        const response = await this.$axios.$delete(
          `/sections/${this.sectionId}`
        )
        if (response.status === 200) {
          this.getAllSections()
          this.clearDeleteData()
        }
      } catch (error) {
        this.clearDeleteData()
      }
    },
    // Clearing the exist data stored in field
    clearDeleteData() {
      this.updateSectionDialog = false
      this.deleteSectionDialog = false
      this.sectionTitle = ''
      this.sectionId = ''
    },
    // GET API
    async getAllSections() {
      try {
        const response = await this.$axios.$get('/sections')
        if (response.status === 200) {
          if (!response?.data?.length) {
            await this.defaultSections()
          }
          this.sectionGroups = [...response?.data]
        }
      } catch (error) {}
    },
    // Close Dialog
    closeSectionDialog() {
      this.createSectionDialog = false
      this.updateSectionDialog = false
      this.sectionTitle = ''
    },
    closeDeleteSectionDialog() {
      this.deleteSectionDialog = false
      this.sectionTitle = ''
      this.sectionId = ''
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
            this.clearData()
          }
        }
      } catch (error) {
        this.createTaskDialog = false
        this.clearData()
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
        this.clearData()
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
            this.clearUpdateTaskData()
            this.clearData()
          }
        }
      } catch (error) {
        this.clearUpdateTaskData()
        this.clearData()
      }
    },
    // Clearing the exist data stored in field
    clearUpdateTaskData() {
      this.updateTaskDialog = false
      this.sectionId = ''
    },
    // DELETE API
    async deleteTask() {
      try {
        const response = await this.$axios.$delete(
          `/sections/${this.sectionId}/task/${this.taskId}`
        )
        if (response.status === 200) {
          this.getAllSections()
          this.clearDeleteTaskData()
          this.clearData()
        }
      } catch (error) {
        this.clearDeleteTaskData()
        this.clearData()
      }
    },
    // Clearing the exist data stored in field
    clearDeleteTaskData() {
      this.deleteTaskDialog = false
      this.sectionId = ''
      this.taskId = ''
    },
    // Close Dialogs
    closeTaskDialog() {
      this.createTaskDialog = false
      this.updateTaskDialog = false
      this.clearData()
    },
    closeDeleteTaskDialog() {
      this.deleteTaskDialog = false
      this.clearData()
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
        } catch (error) {}
      } else if (event?.removed) {
        const task = await event?.removed?.element
        try {
          const response = await this.$axios.$delete(
            `/sections/${sectionId}/task/${task?._id}`
          )
          if (response.status === 200) {
            this.getAllSections()
          }
        } catch (error) {}
      }
    },
    // Clear data from popup
    clearData() {
      this.task = {
        name: '',
        description: '',
        assignee: '',
        subtitle: '',
        date: '',
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
  font-size: 11px;
  font-weight: 400;
  line-height: 18px;
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
.card-section {
  height: 90vh;
  min-height: 90vh;
  max-height: 90vh;
}
</style>
