export default {
  name: 'long-text',
  props: ["desc",'long'],
  template: `
    <div class="long-text">
      <div class="short-desc" v-if="isShowShort">{{descriptionToShow}}</div>

      <div class="long-desc" v-else>{{desc}}</div>

      <div v-if="isShowButton">
        <button class="read-btn" v-if="isShowShort" @click="toggleIsShort">read more</button>

        <button class="read-btn" v-else @click="toggleIsShort">read Less</button>
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
      if (desc.length >= this.long) {
        return true;
      } else {
        return false;
      }
    },
    descriptionToShow() {
      const desc = this.desc;
      if (desc.length >= this.long) {
        return desc.split("").slice(0, this.long).join("") + "...";
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
