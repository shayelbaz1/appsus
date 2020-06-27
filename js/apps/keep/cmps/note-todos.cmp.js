import { notesService } from "../services/notes.service.js";

export default {
    name: 'note-todos',
    props:['info','isEditMode','noteId'],
    template: `
      <section class="note-todos">
        <ul>
          <div class="todo-title">{{info.label}}</div>
          <hr/>
          <li class="todo-card clean-list" v-for="(todo,idx) in todosInfo">
          <div class="todo-container flex space-between">
            <input id="chackbox" class="check-box" type='checkbox' @click='done(noteId,idx)' v-model="todo.isDone">
                <input v-if="isEditMode" type="text" v-model="todo.txt" @keyup.enter="saveEdit" @keyup.escape="saveEdit"/>
                <div v-else @click="toggleEdit" class="todo-txt" :class="{done: todo.isDone}">{{todo.txt}}</div>

                <i @click="deleteTodo(noteId,idx)"class="fas fa-trash delete"></i>
          </div>
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
    deleteTodo(noteId, idx) {
      notesService.deleteTodo(noteId,idx)
    },
    done(noteId,idx){
      notesService.setDone(noteId,idx)
    },
      saveEdit() {
        notesService.saveEdit(this.noteId, this.todosInfo, 'noteTodos')
        this.toggleEdit()
      },
      toggleEdit() {
        notesService.toggleEdit(this.noteId)
      }
    },
  };
  