export default {
  template: `
    <section class="home-page flex column align-center">
        
        <div class="title-box">
          <h1>AppSus</h1>
          <p>All your favorite apps in one place</p>
        </div>

        <main class='apps-box'>
          <!-- BOOK APP -->
          <div class='app-box book'>
            <div class="img-box">
              <router-link to='book-app'>
                <img src='img/book500.png'>
              </router-link>
            </div>
            <div class="txt-box">
                <p>
                Purchase books from all over the world with out beautiful book app
                </p>
            </div>
          </div>
                    <!-- GMAIL -->
          <div class='app-box mail'>
            <div class="img-box">
              <router-link to='email/list'>
                <img src='img/gmail500.png'>
              </router-link>
            </div>
            <div class="txt-box">
                <p>
                Top new email service system which is packed with the best features
                </p>
            </div>
          </div>
          <!-- NOTES -->
          <div class='app-box notes'>
            <div class="img-box">
              <router-link to='notes'>
                <img src='img/keep500.png'>
              </router-link>
            </div>
            <div class="txt-box">
                <p>
                See our beautiful notes app for saving all kinf of notes
                </p>
            </div>
          </div>

        </main>

        <div class="hr-div"></div>

        <footer class='home-footer'>
          <p>© All right reserved to Shay Elbaz & Shai Isenhower</p>
        </footer>
    </section>    
    `,
};
