import longText from "./long-text.cmp.js";
import { booksService } from "../services/books.service.js";
import reviewAdd from "./review-add.cmp.js";
import starRating from './star-rating.cmp.js'


export default {
  template: `
  <section>
      <div class="book-details column-layout" v-if="book">
        
        <router-link to="/book-app"><button @click="close">X</button></router-link>
        <router-link v-if="prevBookId" :to="'/book/'+prevBookId">Prev Book</router-link>
        <router-link v-if="nextBookId" :to="'/book/'+nextBookId">Next Book</router-link>
        <img :src="imgUrl" alt=""/>
        <p>{{book.pageCount}}</p>
        <p>{{bookReadingTime}}</p>
        <p>{{bookAge}}</p>
        <p :class="{red: isAbove150,green: isLess20}">{{book.listPrice.amount}}</p>
        <p v-if="isOnSale">on Sale!</p>
        <long-text :desc="book.description" :long="100"></long-text>

        <section class="reviews" v-if="book.reviews" >
          <ul>
            <li v-for="(review,idx) in book.reviews" >
              <button @click="deleteReview(book, idx)">X</button>
              <p>{{idx}}</p>
              <p>Full Name: {{review.fullName}}</p>
              <p>Rate: {{review.rate}}</p>
              <p>Read At:{{review.readAt}}</p>
              <p>Text: {{review.reviewTxt}}</p>
              <!-- <pre>{{review}}</pre> -->
            </li>
          </ul>
        </section>

      </div>

      <review-add></review-add>
  </section>
       
      `,
  components: {
    longText,
    reviewAdd,
  },
  data() {
    return {
      book: null,
      nextBookId: null,
      prevBookId: null,
    };
  },
  created() {
    // console.log(this.$route.params);
    this.loadCurrBook()
  },
  watch: {
    '$route.params.bookId'(newBookId,oldBookId){
      // console.log('newBookId:', newBookId)
      // console.log('oldBookId:', oldBookId)
        this.loadCurrBook();
    }
} ,
  computed: {
    imgUrl() {
      return this.book.thumbnail;
    },
    isOnSale() {
      const isOnSale = this.book.listPrice.isOnSale;
      return isOnSale;
    },
    isAbove150() {
      const price = this.book.listPrice.amount;
      if (price > 100) {
        return true;
      }
    },
    isLess20() {
      const price = this.book.listPrice.amount;
      if (price < 50) {
        return true;
      }
    },
    bookReadingTime() {
      const pageCount = this.book.pageCount;
      if (pageCount >= 500) {
        return "Long Reading";
      } else if (pageCount >= 200 && pageCount < 500) {
        return "Decent Reading";
      } else if (pageCount < 200) {
        return "Light Reading";
      }
    },
    bookAge() {
      const nowYear = new Date().getFullYear();
      const bookYear = this.book.publishedDate;
      if (nowYear - bookYear > 10) {
        return "Veteran Book";
      } else if (nowYear - bookYear === 1) {
        return "New Book";
      } else {
        return `book Year: ${bookYear}`;
      }
    },
  },
  methods: {
    loadCurrBook() {
      // console.log('newBookId:', newBookId)
      // console.log('oldBookId:', oldBookId)

    const { bookId } = this.$route.params;
    booksService.getById(bookId)
      .then((book) => {this.book = book
      
        booksService.getNextBookId(book.id)
          .then(nextId => {
            this.nextBookId = nextId
          })
        
        booksService.getPrevBookId(book.id)
          .then(prevId => {
            this.prevBookId = prevId
          })
      });
    },
    deleteReview(book, idx) {
      booksService.deleteReview(book, idx);
    },
    close() {
      this.$emit("close", null);
    },
  },
};
