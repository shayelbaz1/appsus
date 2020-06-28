import { booksService } from "../services/books.service.js";


import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookNav from "../cmps/book-nav.cmp.js";

export default {
  template: `

  <div>
    <!-- <book-nav></book-nav> -->
          <div class="book-app flex">
          
  
              <!-- <aside >
              <div class="logo flex">
                  <i class="fas fa-book-reader"></i>
                  <p>BOOKSTORE</p>
              </div>
              </aside> -->
  
              <main class="flex-column">
                  <book-filter @filter="setFilter"></book-filter>
                  <book-list :books="booksToShow"></book-list>
              </main>
             
          </div>
  </div>
    `,
  components: {
    bookFilter,
    bookList,
    bookNav
  },
  data() {
    return {
      books: [],
      filterBy: {
        title: "",
        fromPrice: 0,
        toPrice: 0,
      },
    };
  },
  computed: {
    booksToShow() {
      const filterBy = this.filterBy;
      if (!filterBy) return this.books;

      //   title:""
      var filteredBooks = this.books
        .filter((book) => {
          return book.title
            .toLowerCase()
            .includes(filterBy.title.toLowerCase());
        })
        .filter((book) => {
          return book.listPrice.amount >= filterBy.fromPrice;
        })
        .filter((book) => {
          return filterBy.toPrice
            ? book.listPrice.amount <= filterBy.toPrice
            : true;
        });

      return filteredBooks;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    // setSelectedBook(selectedBook) {
    //   this.selectedBook = selectedBook;
    // },
    // setCurrBook() {
    //   this.selectedBook = null;
    // },
  },
  created() {
    booksService.getBooks().then((books) => {
      this.books = books;
    });
  },
};
