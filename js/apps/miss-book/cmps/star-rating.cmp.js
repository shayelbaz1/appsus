
export default {
  template: `
  <div class="stars-container flex justify-center">
    <div v-for="starIdx in starsAmount">
      <i class="fa-star" @click="setStar(starIdx)" :class="starIdx <= selectedStar ? iconClass.marked : iconClass.unmarked"></i>
    </div>
  </div>
`,
  data() {
      return {
          selectedStar: 0,
          starsAmount: 5,
          iconClass: {
              marked: "fas",
              unmarked: "far",
          },
      };
  },
  methods: {
      setStar(star) {
          this.selectedStar = star;
          this.$emit("onStarSelection", star);
      },
  },
}