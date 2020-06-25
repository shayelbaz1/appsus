export default {
  template: `
    <section class="book-filter flex align-center justify-center">
        <div class='compose-btn'>
          <router-link to="compose">
            <img src='../imgs/compose.png'/>
            <span>Compose</span>
          </router-link>
        </div>
        <div class='filter-container flex'>
          <input type="text" placeHolder="Search Email" v-model="filterBy.subject" @input="filter"/>
          <select v-model='filterBy.selected' @change="filter">
            <option v-for='option in options' v-bind:value='option.value'>
            {{option.text}}
            </option>
          </select>
        </div>
        <div class='sort-container flex align-center'>
          <h5>Sort:</h5>
          <span>Title</span>
          <span>Date</span>
        </div>
    </section>
    `,
  data() {
    return {
      filterBy: {
        subject: "",
        selected: "All"
      },
      options: [
        { text: 'All', value: 'All'},
        { text: 'Read', value: true},
        { text: 'unRead', value: false}
      ]
    };
  },
  methods: {
    filter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
