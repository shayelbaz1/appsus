export default {
  props: ["book"],
  template: `
    <li class="book-preview flex column-layout">
        <img :src="imgUrl" alt=""/>
        
        <div class="book-txt-box">
          <div class="book-title">{{titleToShow}}</div>
          <div class="book-price">{{book.listPrice.amount}} {{currencyCode}}</div>
        </div>
        <!-- <router-link :to="'/book/'+book.id"><Button>Details</Button></router-link> -->
    </li>
    `,
  computed: {
    titleToShow() {
      let title = this.book.title;
      let words = title.split(' ')
      title = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ')
      
      return title
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
