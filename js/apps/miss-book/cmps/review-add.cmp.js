import { booksService } from "../services/books.service.js";
import { utils } from "../../../services/utils.service.js";
import { eventBus } from "../../../services/event-bus.service.js";
import starRating from "./star-rating.cmp.js";

import showMsg from "./user-msg.cmp.js";

export default {
  template: `
    <section class="review-add column-layout">

        <h1>Review Add</h1>
        <form @submit.prevent="saveReview" >
          Full Name:<input type="text" v-model.trim="review.fullName"/>
          
          <br/>
          Read At: <input type="date" v-model="review.readAt"/>
          <br/>
          <label class="flex"> Rating <star-rating @onStarSelection="setRate" /> </label>
          <br/>
          Review:
          <textarea cols="30" rows="2" v-model="review.reviewTxt"></textarea>
          <br/>
          <button @click="showMsg">Save</button>
        </form>
        <!-- <pre>
          {{review}}
        </pre> -->
    </section>    
    `,
  components: {
    starRating
  },
  data() {
    return {
      isMsgOn: false,
      review: {
        id: utils.getRandomId(),
        fullName: "Shay",
        rate: 1,
        readAt: "2020-06-06",
        reviewTxt: "Great!",
      },
    };
  },
  methods: {
    setRate(rate) {
      this.review.rate = rate
      
    },
    saveReview() {
      // console.log("this.$route:", this.$route);
      const bookId = this.$route.params.bookId;
      booksService.addReview(bookId, this.review);
    },
    showMsg() {
      // this.isMsgOn = true;

      // setTimeout(() => {
      //   this.isMsgOn = false;
      // }, 2000);

      const bookId = this.$route.params.bookId;
      booksService.getById(bookId).then((book) => {
        const bookTitle = book.title;
        eventBus.$emit("showMsg", {
          txt: `Book ${bookTitle} was successfully added`,
          link: `/book/${bookId}`,
          type: "success",
        });
      });
    },
  },
};
