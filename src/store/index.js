import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'Sleep, Neo',
        done: false,
        dueDate: '2022-05-18'
      },
      {
        id: 2,
        title: 'Give Morpheus',
        done: false,
        dueDate: '2022-05-19'
      },
      {
        id: 3,
        title: 'Get out of the car',
        done: false,
        dueDate: null
      }
    ],
    snackbar: {
      show: false,
      text: 'There is no message for you'
    },
    search: null
  },
  mutations: {  // works with 'commit' key: this.$store.commit('deleteTask', id)
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    addTask(state, newTaskTitle) {
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

      let newTask = {
        id: max.id + 1,
        title: newTaskTitle.trim(),
        done: false,
        dueDate: null
      }
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
    }
  },
  actions: { // works with 'dispatch' key: this.$store.dispatch('deleteTask', id)
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Oh, gosh, another one!')
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', 'Well done, delete another shit!')
    },
    doneTask({ commit }, id) {
      commit('doneTask', id)
      commit('showSnackbar', 'Yes, one less!')
    },
    updateTaskTitle({ commit }, payload) {
      commit('updateTaskTitle', payload)
      commit('showSnackbar', 'Task updated')
    },
    updateTaskDueDate({ commit }, payload) {
      commit('updateTaskDueDate', payload)
      commit('showSnackbar', 'Task due date updated')
    },
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
