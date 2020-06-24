import bookNav from './book-nav.cmp.js'
export default {
    template: `
    <section class="our-team">
    <!-- <book-nav></book-nav> -->
    <header class="flex align-center space-between">
        <router-link to="/book-app">
            <div class="logo flex align-center">
                    <i class="fas fa-book-reader"></i>
                    <p>BOOKSTORE</p>
              </div>
          </router-link>  
          <nav>
            <router-link to="book-home">Home | </router-link>
            <router-link to="about">About | </router-link>
            <router-link to="/book-app">Books |</router-link>
            <router-link to="/add-book">Purchase Books</router-link>
          </nav>
      </header>

    <router-view></router-view>
    </section>
    `,
  components: {
    bookNav
  }
  };