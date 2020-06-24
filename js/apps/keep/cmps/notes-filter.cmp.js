export default {
  name: 'notes-filter',
  template: `
    <section class="notes-filter">
        <input type="text" placeHolder="Search note" v-model="filterBy.title" @input="filter"/>
    </section>
    `,
  data() {
    return {
      filterBy: {
        title: "",
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
