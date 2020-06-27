export default {
  template: `
    <section class="home-page flex column align-center">
        <div class='home-page-header flex'>
           <h1>Join over a million User who Are already enjyoing Appsus services</h1>
        </div>

        <main class='main-content-container flex'>
          <div class='about-app-container flex column align-center'>
            <router-link to='/book-app'>
              <img src='../../img/books.png'>
            </router-link>
            <p>Learn about the history of the world and many more using our book services</p>
          </div>
          <div class='about-app-container flex column align-center'>
            <router-link to='/email/list'>
              <img src='../../img/google-mail.jpg'>
            </router-link>
            <p>Use out top of the line email service system which is packed with features</p>
          </div>
          <div class='about-app-container flex column align-center'>
            <router-link to='/notes'>
              <img src='../../img/keep.png'>
            </router-link>
            <p>Create todo lists and remember thing todo with our beautiful note system</p>
          </div>
        </main>
        
        <footer class='home-footer flex align-center'>
          <p>© All right reserved to Shai Elbaz & Shai Isenhower<p>
        </footer>
    </section>    
    `,
};
