import { eventBus } from "../../../services/event-bus.service.js";

export default {
  template: `
    <section class="user-msg" v-if="msg" :class="msgClass">
    <button @click="close">X</button>
        <p>{{msg.txt}}</p>
        <router-link :to="msg.link">Check is Out</router-link>
    </section>
    `,
  data() {
    return {
      msg: null,
      timeOut: null,
    };
  },
  computed: {
    msgClass() {
      if (!this.msg.type) return "";
      return this.msg.type;
    },
  },
  methods: {
    close() {
      this.msg = null;
      clearTimeout(this.timeOut);
    },
  },
  created() {
    eventBus.$on("showMsg", (msg) => {
      clearTimeout(this.timeOut);
      this.msg = msg;

      this.timeOut = setTimeout(() => {
        this.msg = null;
      }, 2000);
    });
  },
};
