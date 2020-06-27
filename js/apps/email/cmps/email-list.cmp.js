import emailPreview from "./email-preview.cmp.js";
import { emailService } from "../services/email.service.js";
import {eventBusService} from '../../../main-services/event-bus.service.js'




export default {
  name: 'emailList',
  template: `
            <ul class="email-list clean-list flex wrap align-center flex-start column">
              <email-preview v-for='email in emails' :email='email' :key='email.id'>
              </email-preview>
            </ul>
    `,
  data(){
    return {
      emails: [],
    }
  },  
  components: {
    emailPreview,
  },
  async created(){
    this.emails = await emailService.getEmails()
    // console.log('email list created!')
    eventBusService.$on('filterdEmails', (emails)=>{
      this.emails = emails
      console.log('got filterd emails:', emails)
    })
    eventBusService.$on('delOccured', async ()=>{
      let emails = await emailService.getEmails()
      this.emails = emails
      // console.log('emails:', emails)
    })
    eventBusService.$on('allEmails', async (emails)=>{
      this.emails = emails
      console.log('got all emails:', emails)
    })
    eventBusService.$on('routeChanged', (emails)=>{
      this.emails = emails
      console.log('got typed emails:', emails)
    })
  },
  computed: {
    isThereEmails() {
      return this.emails.length
    },
    isThereEmails() {
      return this.emails.length
    },
  },  
  //on url change
  watch: {
    async '$route.params.listType'(){
      const { listType } = this.$route.params
      console.log(listType);
      let emails = await emailService.getEmailsByListType(listType);
      this.emails = emails
      // eventBusService.$emit('routeChanged', this.emails)
    }
  } 
}
