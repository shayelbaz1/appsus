import { emailService } from "../services/email.service.js";


export default {
  template: `
      <div class='flex justify-center'>
        <section class='details-container flex column'>
          <h2 class='subject-info'>{{email.subject}}</h2>
          <div class='details-info-container flex'>
            <span class='details-name'>{{email.sender}}</span><span class='senders-email'><{{email.senderEmail}}></span>
          </div>
          <p>{{email.body}}</p>
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
  }
};
