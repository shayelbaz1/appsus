import homePage from "./apps/pages/home-page.cmp.js";
import aboutPage from "./apps/miss-book/pages/about-page.cmp.js";
import bookApp from "./apps/miss-book/pages/book-app.cmp.js";
import bookDetails from "./apps/miss-book/cmps/book-details.cmp.js";
import ourTeam from './apps/miss-book/cmps/our-team.cmp.js'
import addBook from './apps/miss-book/pages/add-book.cmp.js'
import bookMain from './apps/miss-book/cmps/book-main.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import notesApp from './apps/keep/pages/notes-app.cmp.js'
// import emailDetails from './apps/email/cmps/email-details.cmp.js'
import emailList from './apps/email/cmps/email-list.cmp.js'


const ourServices = {
  template: `
  <section class="our-services">
  <h1>Our Services</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab repellat natus quos id accusamus corporis ullam voluptatum possimus consequuntur. Ipsam, modi vitae. Quis at corporis fugiat dolorem reiciendis animi.</p>
  </section>
  `,
};

const myRoutes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/email",
    component: emailApp,
    children: [
      {
        path: "list",
        component: emailList,
      },
      // {
      //   path: "/details/:emailId",
      //   component: emailDetails,
      // }
    ]
  },
  {
    path: "/notes",
    component: notesApp,
  },

  
  {
    path: "/book-main",
    component: bookMain,
    children: [
      {
        path: "/book/:bookId",
        component: bookDetails,
      },
      {
        path: "/add-book",
        component: addBook,
      },
      {
        path: "/book-home",
        component: bookApp,
      },
      {
        path: "/book-app",
        component: bookApp,
      },
      {
        path: "/about",
        component: aboutPage,
        children: [
          {
            path: "/team",
            component: ourTeam,
          },
          {
            path: "/services",
            component: ourServices,
          },
        ],
      },
    ],
  },
];

export const myRouter = new VueRouter({ routes: myRoutes });
