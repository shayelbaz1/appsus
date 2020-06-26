import { emailService } from "../services/email.service.js";


export default {
  template: `
      <div class='flex justify-center'>
        <section class='details-container flex column'>
          <h2 class='subject-info'>Subject: {{email.subject}}</h2>
          <h3>  Sender: {{email.sender}}</h3>
          <p>Body: {{email.body}}</p>
        </section>  
      </div> 
  `,
  data() {
    return {
      email: null,
    };
  },
  created() {
    this.loadCurrEmail()
  },
  methods: {
    async loadCurrEmail() {
     const { emailId } = this.$route.params;
     let email = await emailService.getEmailById(emailId)
     this.email = email
    }
  },
};
