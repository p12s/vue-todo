<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete 
      v-if="dialogs.delete" 
      @close="dialogs.delete = false"
      :task="task"
    />
    <dialog-edit 
      v-if="dialogs.edit" 
      @close="dialogs.edit = false"
      :task="task"
    />
  </div>
</template>

<script>
export default {
  name: 'task-menu',
  props: ['task'],
  data: () => ({
    dialogs: {
      delete: false,
      edit: false,
    },
    items: [
      { 
        icon: 'mdi-pencil', 
        title: 'Edit', 
        click() {
          this.dialogs.edit = true
        }
      },
      {
        icon: 'mdi-calendar', 
        title: 'Due date', 
        click() {
        }
      },
      { 
        icon: 'mdi-delete', 
        title: 'Delete', 
        click() {
          this.dialogs.delete = true
        }
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
    }
  },
  components: {
    'dialog-delete': require('@/components/Todo/Dialogs/Delete.vue').default,
    'dialog-edit': require('@/components/Todo/Dialogs/Edit.vue').default,
  }
}
</script>

<style>

</style>
