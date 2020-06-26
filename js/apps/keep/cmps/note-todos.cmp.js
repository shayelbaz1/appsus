import { notesService } from "../services/notes.service.js";

export default {
    name: 'note-todos',
    props:['info','isEditMode','noteId'],
    template: `
      <section class="note-todos">
        <ul>
          <div class="todo-title">{{info.label}}</div>
          <hr/>
          <li class="todo-card" v-for="todo in todosInfo">
              <!-- {{todo.txt}} -->
              <input v-if="isEditMode" type="text" v-model="todo.txt" @keyup.enter="saveEdit" @keyup.escape="saveEdit"/>
              <div v-else @click="toggleEdit" class="todo-txt">{{todo.txt}}</div>
              <hr/>
          </li>
        </ul>
      </section>
      `,
    data() {
      return {
        todosInfo: this.info.todos,
      }
    },
    methods: {
      saveEdit() {
        notesService.saveEdit(this.noteId, this.todosInfo, 'noteTodos')
        this.toggleEdit()
      },
      toggleEdit() {
        notesService.toggleEdit(this.noteId)
      }
    },
  };
  