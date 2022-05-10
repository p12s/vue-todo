import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

// docs: https://github.com/dannyconnell/localbase#disable-the-gorgeous-logs
let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'hello',
        done: false,
        dueDate: null
      }
    ],
    snackbar: {
      show: false,
      text: 'There is no message for you'
    },
    search: null,
    appTitle: process.env.VUE_APP_TITLE,
    sorting: false
  },
  mutations: {  // works with 'commit' key: this.$store.commit('deleteTask', id)
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },
    showSnackbar(state, text) {
      if (state.snackbar.show) {
        state.snackbar.show = false
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, 300)
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
        task.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setSearch(state, value) {
      state.search = value
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }, 
    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: { // works with 'dispatch' key: this.$store.dispatch('deleteTask', id)
    addTask({ state, commit }, newTaskTitle) {
      if (newTaskTitle.trim() === '') {
        return
      }
      let max = {
        id: 0
      }
      if (state.tasks.length > 0) {
        max = state.tasks.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        })
      }
      const newTask = {
        id: max.id + 1,
        title: newTaskTitle.trim(),
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Oh, gosh, another one!')
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Well done, delete another shit!')
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
        commit('showSnackbar', 'Yes, one less!')
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task updated')
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Task due date updated')
      })
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => { // get from localbase
        commit('setTasks', tasks) // set into vuex memory storage
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks) // set new sort tasks
      commit('setTasks', tasks)
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => 
        task.title.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())
      )
    }
  }
})
