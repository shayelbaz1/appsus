import { notesService } from "../services/notes.service.js";

export default {
  name: 'add-todos',
  template: `
    <section class="add-todos">
        <input type="text" placeHolder="\uf249 Add a todo and Enter" v-model="todo" @keyup.enter="addTodo" style="font-family:tahoma,FontAwesome"/>

        <section v-if="isShow" class="note-todos">
          <ul>
            <li class="todo-card todo-line" v-for="todo in todos">
                {{todo.txt}}
                <hr/>
            </li>
            <button class="myBtn save-btn"  @click="addTodos">Save todos</button>
          </ul>
        </section>
        <!-- <section v-if="isShow" class="note-todos note-card">
          <ul>
            <div class="todo-title">Todo List:</div>
            <hr/>
            <li class="todo-card" v-for="todo in todos">
                {{todo.txt}}
                <hr/>
            </li>
            <button  @click="addTodos">Save todos</button>
          </ul>
        </section> -->

    </section>
    `,
  data() {
    return {
      todos: [],
      todo: null,
      isShow: false
    };
  },
  methods: {
    addTodos() {
      notesService.addTodos(this.todos)
      this.todos = []
      this.isShow = false
    },
    addTodo() {
      this.todos.push({ txt: this.todo, isDone: false })
      this.isShow = true
      this.todo = null
    }
  },
};
