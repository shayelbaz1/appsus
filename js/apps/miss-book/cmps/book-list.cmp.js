import bookPreview from "./book-preview.cmp.js";

export default {
  props: ["books"],
  template: `
        <ul class="book-list clean-list flex wrap align-center space-around">
            <router-link v-for="book in books" :key="book.id" :to="'/book/'+book.id">
                <book-preview  :book="book"></book-preview>
            </router-link>
        </ul>
    `,
  components: {
    bookPreview,
  },
};
