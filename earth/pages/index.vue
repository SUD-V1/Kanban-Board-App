<template>
  <v-container fluid>
    <v-row>
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
                  <v-menu
                    :ref="`taskMenu${sectionIndex}`"
                    :close-on-content-click="false"
                    :close-on-click="true"
                    :nudge-width="200"
                    offset-x
                    :min-width="350"
                    :max-width="350"
                  >
                    <template #activator="{ on, attrs }">
                      <v-icon class="mr-1" small v-bind="attrs" v-on="on">
                        mdi-plus
                      </v-icon>
                    </template>

                    <v-card>
                      <v-card-title class="pb-0">
                        <span class="subtitle-2">Create Task</span>
                      </v-card-title>
                      <v-card-text class="pr-2 mt-3 mb-0 pb-0">
                        <v-text-field
                          placeholder="Create a title"
                          hide-details
                          dense
                          outlined
                          class="mr-2 caption rounded-lg mb-2"
                        ></v-text-field>
                        <v-textarea
                          hide-details
                          dense
                          outlined
                          rows="3"
                          placeholder="Description"
                          class="mr-2 caption rounded-lg my-2"
                        ></v-textarea>
                        <v-file-input
                          accept="image/*"
                          placeholder="Select a photo"
                          outlined
                          dense
                          hide-details
                          class="mr-2 caption rounded-lg my-2"
                        ></v-file-input>
                      </v-card-text>

                      <v-card-actions class="grey lighten-4 my-0">
                        <v-spacer></v-spacer>

                        <v-btn text color="error" small> Cancel </v-btn>
                        <v-btn color="success" text small class="mr-3">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
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
                          @click="
                            updateSectionList(item, sectionIndex, section)
                          "
                        >
                          <v-list-item-content>
                            <v-list-item-title class="d-flex align-center">
                              <v-icon
                                class="mr-2"
                                small
                                :color="
                                  item.title === 'Delete' ? 'red' : 'green'
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
                    group="a"
                    @change="getData"
                  >
                    <div
                      v-for="(task, taskIndex) in section.list"
                      :key="task._id"
                      class="item mb-2"
                    >
                      <v-card class="rounded-xl" flat outlined>
                        <v-card-title class="pt-2 pb-2">
                          <span class="subtitle-2">{{ task.name }}</span>
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
                              <v-icon small color="white"> mdi-account </v-icon>
                            </v-avatar>
                            <span class="caption green--text">Today</span>
                          </div>
                          <v-chip class="caption" small color="grey lighten-3">
                            Programing
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
                        @click="addSection(section)"
                      >
                        <v-icon color="green" small>mdi-plus</v-icon>Add Task
                      </button>
                    </div>
                  </draggable>
                </v-card-text>
              </v-card>
            </div>
            <button
              class="caption font-weight-bold mt-2 ml-4"
              @click="createSectionDialog = true"
            >
              <v-icon color="green" small>mdi-plus</v-icon>Add Section
            </button>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="createSectionDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <v-card>
          <v-card-title class="pb-0">
            <span class="subtitle-2">Create Section</span>
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

            <v-btn text color="error" small @click="closeSectionDialog">
              Cancel
            </v-btn>
            <v-btn
              color="success"
              text
              small
              class="mr-3"
              :disabled="!validSection"
              @click="createSection"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="updateSectionDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <v-card>
          <v-card-title class="pb-0">
            <span class="subtitle-2">Update Section</span>
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

            <v-btn text color="error" small @click="closeSectionDialog">
              Cancel
            </v-btn>
            <v-btn
              color="success"
              text
              small
              class="mr-3"
              :disabled="!validSection"
              @click="updateSection"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="deleteSectionDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-0">
          <span class="subtitle-2">Delete Section</span>
        </v-card-title>
        <v-card-title>
          <span class="caption text-center"
            ><v-icon color="yellow darken-2" class="mr-2"
              >mdi-alert-circle-outline</v-icon
            >Are you sure you want to delete this
            <b class="black--text">Section?</b></span
          >
        </v-card-title>

        <v-card-actions class="grey lighten-4 my-0">
          <v-spacer></v-spacer>

          <v-btn text color="grey" small @click="closeDeleteSectionDialog">
            Cancel
          </v-btn>
          <v-btn color="error" text small class="mr-3" @click="deleteSection">
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createTaskDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <v-card>
          <v-card-title class="pb-0">
            <span class="subtitle-2">Create Task</span>
          </v-card-title>
          <v-card-text class="pr-2 mt-3 mb-0 pb-0">
            <v-text-field
              v-model="taskName"
              placeholder="Create a title"
              hide-details
              dense
              outlined
              class="mr-2 caption rounded-lg mb-2"
              :rules="nameRules"
            ></v-text-field>
            <v-textarea
              v-model="taskDescription"
              hide-details
              dense
              outlined
              rows="3"
              placeholder="Description"
              class="mr-2 caption rounded-lg my-2"
              :rules="nameRules"
            ></v-textarea>
            <!-- <v-file-input
                                v-model="taskImage"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Select a photo"
                                outlined
                                dense
                                hide-details
                                class="mr-2 caption rounded-lg my-2"
                                :rules="rules"
                              ></v-file-input> -->
          </v-card-text>

          <v-card-actions class="grey lighten-4 my-0">
            <v-spacer></v-spacer>

            <v-btn text color="error" small @click="closeTaskDialog">
              Cancel
            </v-btn>
            <v-btn
              color="success"
              text
              small
              class="mr-3"
              :disabled="!validTask"
              @click="createTask"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="updateTaskDialog" persistent max-width="290">
      <v-form ref="form" v-model="validSection" lazy-validation>
        <v-card>
          <v-card-title class="pb-0">
            <span class="subtitle-2">Create Task</span>
          </v-card-title>
          <v-card-text class="pr-2 mt-3 mb-0 pb-0">
            <v-text-field
              v-model="taskName"
              placeholder="Create a title"
              hide-details
              dense
              outlined
              class="mr-2 caption rounded-lg mb-2"
              :rules="nameRules"
            ></v-text-field>
            <v-textarea
              v-model="taskDescription"
              hide-details
              dense
              outlined
              rows="3"
              placeholder="Description"
              class="mr-2 caption rounded-lg my-2"
              :rules="nameRules"
            ></v-textarea>
            <!-- <v-file-input
                                v-model="taskImage"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Select a photo"
                                outlined
                                dense
                                hide-details
                                class="mr-2 caption rounded-lg my-2"
                                :rules="rules"
                              ></v-file-input> -->
          </v-card-text>

          <v-card-actions class="grey lighten-4 my-0">
            <v-spacer></v-spacer>

            <v-btn text color="error" small @click="closeTaskDialog">
              Cancel
            </v-btn>
            <v-btn
              color="success"
              text
              small
              class="mr-3"
              :disabled="!validTask"
              @click="updateTask"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="deleteTaskDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-0">
          <span class="subtitle-2">Delete Task</span>
        </v-card-title>
        <v-card-title>
          <span class="caption text-center"
            ><v-icon color="yellow darken-2" class="mr-2"
              >mdi-alert-circle-outline</v-icon
            >Are you sure you want to delete this
            <b class="black--text">Task?</b></span
          >
        </v-card-title>

        <v-card-actions class="grey lighten-4 my-0">
          <v-spacer></v-spacer>

          <v-btn text color="grey" small @click="closeDeleteTaskDialog">
            Cancel
          </v-btn>
          <v-btn color="error" text small class="mr-3" @click="deleteTask">
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
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
    addSectionMenu: false,
    createSectionDialog: false,
    updateSectionDialog: false,
    deleteSectionDialog: false,
    sectionGroups: [
      // {
      //   name: 'To do',
      //   list: [
      //     { name: 'A 1', id: 0 },
      //     { name: 'A 2', id: 1 },
      //     { name: 'A 3', id: 2 },
      //   ],
      // },
      // {
      //   name: 'In Progress',
      //   list: [
      //     { name: 'B 1', id: 0 },
      //     { name: 'B 2', id: 1 },
      //     { name: 'B 3', id: 2 },
      //   ],
      // },
      // {
      //   name: 'Done',
      //   list: [
      //     { name: 'C 1', id: 0 },
      //     { name: 'C 2', id: 1 },
      //     { name: 'C 3', id: 2 },
      //   ],
      // },
    ],
    validTask: true,
    taskName: '',
    taskDescription: '',
    taskImage: '',
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
  }),
  created() {
    this.getAllSections()
  },
  methods: {
    async createSection() {
      try {
        if (this.$refs.form.validate()) {
          const payload = {
            name: this.sectionTitle,
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
    updateSectionList(item, sectionIndex, section) {
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
    async updateSection() {
      try {
        if (this.$refs.form.validate()) {
          const payload = {
            name: this.sectionTitle,
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
    closeSectionDialog() {
      this.createSectionDialog = false
      this.updateSectionDialog = false
    },
    closeDeleteSectionDialog() {
      this.deleteSectionDialog = false
    },
    closeTaskMenu() {},
    addSection(section) {
      this.sectionId = section._id
      this.createTaskDialog = true
    },
    async createTask() {
      try {
        console.log(this.$refs)
        // if (
        //   this.$refs.formTask.validate() ||
        //   this.$refs.formTask[sectionIndex].validate() ||
        //   this.$refs.formTask[0].validate()
        // ) {
        const payload = {
          name: this.taskName,
          description: this.taskDescription,
          taskImage: this.taskImage,
        }
        const response = await this.$axios.$post(
          `/sections/${this.sectionId}/task`,
          payload
        )
        if (response.status === 200 || response.status === 201) {
          this.getAllSections()
          this.createTaskDialog = false
        }
        // }
      } catch (error) {
        this.createTaskDialog = false
        console.log(error)
      }
    },
    updateTaskList(item, section, task) {
      this.sectionId = section?._id
      this.taskId = task._id
      if (item.title === 'Edit') {
        this.updateTaskDialog = true
        this.taskName = task?.name
        this.taskDescription = task?.description
        this.taskImage = task?.image
      } else {
        this.updateTaskDialog = false
        this.deleteTaskDialog = true
        this.taskName = ''
        this.taskDescription = ''
        this.taskImage = ''
      }
    },
    async updateTask() {
      try {
        if (this.$refs.form.validate()) {
          const payload = {
            name: this.taskName,
            description: this.taskDescription,
            image: this.taskImage,
          }
          const response = await this.$axios.$put(
            `/sections/${this.sectionId}/task/${this.taskId}`,
            payload
          )
          if (response.status === 200 || response.status === 201) {
            this.getAllSections()
            this.updateTaskDialog = false
            this.sectionId = ''
            this.taskName = ''
            this.taskDescription = ''
            this.taskImage = ''
          }
        }
      } catch (error) {
        console.log(error)
        this.updateTaskDialog = false
        this.sectionId = ''
        this.taskName = ''
        this.taskDescription = ''
        this.taskImage = ''
      }
    },
    async deleteTask() {
      try {
        const response = await this.$axios.$delete(
          `/sections/${this.sectionId}/task/${this.taskId}`
        )
        if (response.status === 200) {
          this.getAllSections()
          this.updateTaskDialog = false
          this.deleteTaskDialog = false
          this.sectionId = ''
          this.taskName = ''
          this.taskDescription = ''
          this.taskImage = ''
        }
      } catch (error) {
        console.log(error)
        this.updateTaskDialog = false
        this.deleteTaskDialog = false
        this.sectionId = ''
        this.taskName = ''
        this.taskDescription = ''
        this.taskImage = ''
      }
    },
    closeTaskDialog() {
      console.log('hjh')
      this.createTaskDialog = false
      this.updateTaskDialog = false
    },
    closeDeleteTaskDialog() {
      this.deleteTaskDialog = false
    },
    getData(event, parentId){
      console.log(event, parentId)
    },
    // startDrag(value, old){
    //   console.log(value, old)
    // },
    // dragComplete(value, old){
    //   console.log(value, old)
    // },
    // checkMove(value){
    //   console.log(value, "MOVE")
    // }
  },
}
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 2px !important;
  height: 2px !important;
  margin: -10px -10px !important;
}

/* Track */
::-webkit-scrollbar-track {
  background: white !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: black !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: red !important;
}
div::-webkit-scrollbar {
  display: none;
}
.card-content {
  height: 40px;
  width: 100%;
  overflow-y: auto;
}
.cursor-pointer {
  cursor: pointer;
}
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
:deep(.v-dialog) {
  box-shadow: none !important;
  border-radius: 20px !important;
}
:deep(.v-icon--link::after) {
  background-color: transparent !important;
}
</style>
