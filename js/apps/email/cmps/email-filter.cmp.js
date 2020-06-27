export default {
  template: `
    <section class="email-filter flex align-center space-evenly">
        <div class='inner-container flex align-center'>
          <div class='filter-container flex align-center'>
            <input type="text" placeHolder="Search Email" v-model="filterBy.subject" @input="filter"/>
            <select v-model='filterBy.selected' @change="filter">
              <option v-for='option in options' v-bind:value='option.value'>
              {{option.text}}
              </option>
            </select>
          </div>
          <div class='sort-container flex space-evenly align-center'>
            <span class="filter-btn" @click="setSortBy('title')" title="Sort asc by title">
            <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>
            </span>

            <span class="filter-btn" @click="setSortBy('date')" title="Sort asc by date">
            <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i>
            </span>
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
