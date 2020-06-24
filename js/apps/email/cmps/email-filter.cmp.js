export default {
  template: `
    <section class="book-filter flex">
        <div class='compose-btn'>
          <img src='./imgs/compose.png'/>
          <span>Compose</span>
        </div>
        <input type="text" placeHolder="Search Email" v-model="filterBy.subject" @input="filter"/>
        <select v-model='filterBy.selected' @change="filter">
          <option v-for='option in options' v-bind:value='option.value'>
          {{option.text}}
          </option>
        </select>
        <div class='sort-container'>
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
