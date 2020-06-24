export default {
  name: 'notes-filter',
  template: `
    <section class="notes-filter">
        <input type="text" placeHolder="\uf002 Search note" v-model="filterBy.title" @input="filter" style="font-family:tahoma,FontAwesome"/>
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
