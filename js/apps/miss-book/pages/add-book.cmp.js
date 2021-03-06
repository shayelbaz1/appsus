import { booksService } from '../services/books.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import longText from '../cmps/long-text.cmp.js'

export default {
  template: `
  
    <section class="add-book">
      <div class="title-box flex column-layout justify-center">
          <div class="page-title">Add Book </div>
          <input v-model="searchBook" type="text" placeholder="Search a book"/>
      </div>

        <ul class="add-book-list clean-list flex wrap align-center space-around" v-if="googleBooks" >
          <li class="book-preview flex column-layout" v-for="book in googleBooks" :key="book.id">
              <img :src="imgUrl(book)" alt='No Book Picture'/>
              
              <div class="book-txt-box column-layout">
                <!-- <div class="book-title">{{book.volumeInfo.title}}</div> -->
                <!-- <div class="book-title">{{bookTitle(book.volumeInfo.title)}}</div> -->
                <long-text :desc="book.volumeInfo.title" :long="30"></long-text>
                <button class="add-btn" @click.stop="addBook(book)">Add To My Books</button>
              </div>
              
          </li>
        </ul>

    </section>    
    `,
  components:{
  longText
  },
  data() {
    return {
      googleBooks: null,
      searchBook: null,
    }
    
  },
  methods: {
    // bookTitle(title) {
    //   if (title.length >= 28) {
    //     return title.split("").slice(0, 28).join("") + "...";
    //   } else {
    //     return title;
    //   }
    // },
      addBook(book) {
        // console.log('book:', book)

        booksService.addBook(book)

        eventBus.$emit("showMsg", {
          txt: `Book ${book.volumeInfo.title} was successfully added`,
          link: `/book/${book.id}`,
          type: "success",
        });
      },
      imgUrl(book) {
        // console.log('book:', book)
        const imgLink = book.volumeInfo.imageLinks
        if (imgLink) return imgLink.thumbnail
        else return ""
      },
      loadBooks() {
        return booksService.getBooksFromGoogle()
          .then(books => {
            // console.log('books:', books)
            this.googleBooks = books
          })
      },
    },
    created() {
      const books = this.loadBooks()
    },
    watch: {
      searchBook(newSearchBook) {
        booksService.findBooks(newSearchBook)
          .then(books => {
            this.googleBooks = books
          }
          )
      }
    }
  };
