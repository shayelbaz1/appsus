import emailPreview from "./email-preview.cmp.js";
import { emailService } from "../services/email.service.js";
import {eventBusService} from '../../../main-services/event-bus.service.js'



export default {
//   props: ["filterdEmails"],
  template: `
        <ul class="email-list clean-list flex wrap align-center space-around column">
          <email-preview v-for='email in emails' :email='email' :key='email.id'>
          </email-preview>
        </ul>
    `,
  data(){
    return {
      emails: []
    }
  },  
  components: {
    emailPreview,
  },
  async created(){
    let emails = await emailService.getStaredMessages();
    this.emails = emails
    eventBusService.$on('filterdEmails', (emails)=>{
      console.log(emails);
      this.emails = emails
    })
    eventBusService.$on('delOccured', async (val)=>{
      console.log(val);
      let emails = await emailService.getEmails()
      this.emails = emails
    })
  }
};
