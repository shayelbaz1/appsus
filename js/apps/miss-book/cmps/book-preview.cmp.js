export default {
  props: ["book"],
  template: `
    <li class="book-preview flex column-layout justify-center space-between">
        <img :src="imgUrl" alt=""/>
        <br/>
        Title: {{titleToShow}}
        <br/>
        Price: {{book.listPrice.amount}} {{currencyCode}}
        <router-link :to="'/book/'+book.id"><Button>Details</Button></router-link>
    </li>
    `,
  computed: {
    titleToShow() {
      const title = this.book.title;
      return title.charAt(0).toUpperCase() + title.slice(1);
    },
    imgUrl() {
      return this.book.thumbnail;
    },
    currencyCode() {
      const currCode = this.book.listPrice.currencyCode;
      switch (currCode) {
        case "EUR":
          return "€";
        case "ILS":
          return "₪";
        case "USD":
          return "$";
        default:
          return currCode;
      }
    },
  },
};
