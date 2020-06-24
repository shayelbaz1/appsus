import { myRouter } from "./routes.js";
import showMsg from "./apps/miss-book/cmps/user-msg.cmp.js";
import bookNav from "./apps/miss-book/cmps/book-nav.cmp.js";

new Vue({
  el: "#App",
  router: myRouter,
  template: `
    <div>

    <!-- TODO: Component -->
      <header class="flex align-center space-between">
        <router-link to="/">
            <div class="logo flex align-center">
                    <i class="fas fa-book-reader"></i>
                    <p>BOOKSTORE</p>
              </div>
          </router-link>  
          <nav>
            <router-link to="/email">eMail | </router-link>
            <router-link to="/notes">Notes |</router-link>
            <router-link to="/book-app">Books</router-link>
            <!-- <router-link to="/book-main">Book main |</router-link> -->
          </nav>
      </header>
  
      

      <show-msg></show-msg>
      <router-view/>
    </div>
    `,
  components: {
    showMsg,
    bookNav
  },
});
