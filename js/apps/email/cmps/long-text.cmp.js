export default {
  props: ["desc"],
  template: `
    <div>
      <p v-if="isShowShort">{{descriptionToShow}}</p>

      <p v-else>{{desc}}</p>

      <div v-if="isShowButton">
        <button v-if="isShowShort" @click="toggleIsShort">read more</button>

        <button v-else @click="toggleIsShort">read Less</button>
      </div>
    </div>
    `,
  data() {
    return {
      isShowShort: true,
    };
  },
  computed: {
    isShowButton() {
      const desc = this.desc;
      if (desc.length >= 100) {
        return true;
      } else {
        return false;
      }
    },
    descriptionToShow() {
      const desc = this.desc;
      if (desc.length >= 100) {
        return desc.split("").slice(0, 100).join("") + "...";
      } else {
        return desc;
      }
    },
  },
  methods: {
    toggleIsShort() {
      this.isShowShort = !this.isShowShort;
    },
  },
};
