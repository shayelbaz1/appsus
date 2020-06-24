export default {
    name: 'note-todos',
    props:["info"],
    template: `
      <section class="note-todos">
        <ul>
          <div class="todo-title">{{info.label}}</div>
          <hr/>
          <li class="todo-card" v-for="todo in info.todos">
              {{todo.txt}}
              <hr/>
          </li>
        </ul>
      </section>
      `,
  };
  