import { myRouter } from "./routes.js";
import showMsg from "./apps/miss-book/cmps/user-msg.cmp.js";
import bookNav from "./apps/miss-book/cmps/book-nav.cmp.js";
import {eventBusService} from "./main-services/event-bus.service.js"


new Vue({
  el: "#App",
  router: myRouter,
  template: `
    <div>

    <!-- TODO: cmp -->
      <header class="flex align-center space-between">
        <router-link to="/">
            <div class="logo flex align-center">
                    <img src="./img/logo.png" alt=""/>
                    <p class="title">AppSus</p>
              </div>
          </router-link> 
          <nav class="main-nav flex">

            <router-link to="/email/inbox/list">
                <div class="app mail column-layout ">
                  <i class="fas fa-envelope fa-2x"></i>
                 <p> eMail</p>
                </div>
            </router-link>

            <router-link to="/notes">
            <div class="app notes column-layout ">
            <i class="fa fa-sticky-note fa-2x"></i>
            <p>notes</p>
            </div>
            </router-link>

            <router-link to="/book-app">
            <div class="app books column-layout ">
              <i class="fa fa-book fa-2x"></i>
              <p>Books</p>
              </div>
          </router-link>
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
