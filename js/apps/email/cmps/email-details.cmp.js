import { emailService } from "../services/email.service.js";
import emailFilter from "../cmps/email-filter.cmp.js"


export default {
  template: `
  <section class='flex column'>
     <email-filter></email-filter>
     <h2>Email Details</h2>
  </section>
       
      `,
  components: {
    emailFilter
  },
  data() {
    return {
      email: null,
    };
  },
  created() {
    this.loadCurrEmail()
  },
  // watch: {
  //   '$route.params.bookId'(newBookId,oldBookId){
  //     // console.log('newBookId:', newBookId)
  //     // console.log('oldBookId:', oldBookId)
  //       this.loadCurrBook();
  //   }
  // } ,
  computed: {
  },
  methods: {
    async loadCurrEmail() {
     const { emailId } = this.$route.params;
     let book = await emailService.getEmailById(emailId)
     this.book = book
    }
  },
};
