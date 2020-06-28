import {emailService} from '../services/email.service.js'
import { eventBusService } from '../../../main-services/event-bus.service.js'

export default {
  name: 'compose',
  template: `
    <section class='compose-container flex column'>
      <h1 class='compose-header'>New Message</h1>
      <form class='compose-form flex column'>
        <label>Name:</label>
        <input type='text' placeholder='enter your name' v-model='msgData.sender'>
        <label>Subject:</label>
        <input type='text' placeholder='Subject' v-model='msgData.subject'>
        <label>From:</label>
        <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" type='email' placeholder='enter your email' v-model='msgData.senderEmail'>
        <label>To:</label>
        <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" type='email' placeholder='Send to' v-model='msgData.toEmail'>
        <label>Body:</label>
        <div class='textarea-container flex justify-center'>
          <textarea placeholder='Enter body text' v-model='msgData.body'>
          </textarea>
        </div>
        <div class='compose-button-container flex space-between'>
          <button @click='onSendMail' :disabled='!isValid'>Send Mail</button>
          <button @click='onSaveDraft' :disabled='!isValid'>Save As Draft</button>
        </div>
      </form>
    </section>
  `,
  data() {
    return {
        msgData: {
          sender: '',
          subject: '',
          senderEmail: '',
          toEmail: '',
          body: '',
          isRead: false,
          sentAt: Date.now(),
          isStared: false,
          isDraft: false,
          isSent: true,
          envelopeClass: 'fa fa-envelope',
          starClass: 'fa fa-star-o',
        }    
    }

  },
  methods: {
    onSendMail() {
      emailService.sendEmail(this.msgData)
      this.$router.push('/email/list')
    },
    onSaveDraft(){
      emailService.addMsgToDraft(this.msgData)
      this.$router.push('/email/list')
    },
    convertNoteTypeToSubj(type){
     console.log(type);
    }
  },
  created() {
    const note = this.$route.query
    const { emailId } = this.$route.params
    if (note.subject && note.txt) {
      this.msgData.body = note.txt
      this.msgData.subject = note.subject 
    } else if(emailId){
      let msgCopy = JSON.parse(JSON.stringify(emailService.getEmailById(emailId)))
      this.msgData = msgCopy
    }
  },
  computed: {
    isValid(){
      return (this.msgData.senderEmail && this.msgData.toEmail)
    }
  }
}
