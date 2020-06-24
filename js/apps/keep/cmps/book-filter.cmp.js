export default {
  template: `
    <section class="email-filter">
        <input type="text" placeHolder="Search email" v-model="filterBy.title" @input="filter"/>
        <input type="number" placeHolder="From price" v-model.number="filterBy.fromPrice" @input="filter"/>
        <input type="number" placeHolder="To price" v-model.number="filterBy.toPrice" @input="filter"/>
    </section>
    `,
  data() {
    return {
      filterBy: {
        title: "",
        fromPrice: null,
        toPrice: null,
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
