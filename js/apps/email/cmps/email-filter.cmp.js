export default {
  template: `
    <section class="email-filter flex align-center space-evenly">
        <div class='flex'>
          <div class='filter-container flex'>
            <input type="text" placeHolder="Search Email" v-model="filterBy.subject" @input="filter"/>
            <select v-model='filterBy.selected' @change="filter">
              <option v-for='option in options' v-bind:value='option.value'>
              {{option.text}}
              </option>
            </select>
          </div>
          <div class='sort-container flex space-evenly align-center'>
            <h5>Sort:</h5>
            <span @click="setSortBy('title')">Title</span>
            <span @click="setSortBy('date')">Date</span>
          </div>
        </div>
    </section>
    `,
  data() {
    return {
      filterBy: {
        subject: "",
        selected: "All"
      },
      sortBy:'',
      options: [
        { text: 'All', value: 'All'},
        { text: 'Read', value: true},
        { text: 'unRead', value: false}
      ]
    };
  },
  methods: {
    setSortBy(sortBy){
      console.log(sortBy);
      this.sortBy = sortBy
      this.$emit("sort", this.sortBy);
    },
    filter() {
      this.$emit("filter", this.filterBy);
    }
  },
};
