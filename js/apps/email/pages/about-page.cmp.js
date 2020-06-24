export default {
  template: `
    <section class="about-page">
        <h1>About Page</h1>
        <nav>
          <router-link to="team">Team</router-link>
          <router-link to="services">Services</router-link>
        </nav>
        <router-view/>
        <hr/>
        <h3>{{name}}</h3>
        <input type="text" ref="elInput" v-model="name"/>
        <div class="ball" :class="ballClass"></div>
        
        <section>
            <button v-on:click="show = !show">
              Toggle
            </button>
            <transition name="fade">
              <p v-if="show">{{name}}</p>
            </transition>
        </section>
          </section>    
    `,
  data() {
    return {
      show: false,
      name: 'shay'
    };
  },
  computed: {
    ballClass(){
      return {
        bubu: this.name==='shay',
        koko: this.name!='shay'
  }
    }
  },
  mounted() {
    // this.$refs
    console.log("this.$refs:", this.$refs);
    this.$refs.elInput.focus();
  },
  
};
