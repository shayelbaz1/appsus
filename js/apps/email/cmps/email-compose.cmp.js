import {emailService} from '../services/email.service.js'
import { myRouter } from '../../../routes.js'

export default {
  template: `
    <section class='compose-container flex column'>
      <h1 class='compose-header'>New Message</h1>
      <form class='compose-form flex column'>
        <input type='text' placeholder='enter your name' v-model='msgData.sender'>
        <input type='text' placeholder='Subject' v-model='msgData.subject'>
        <input type='text' placeholder='enter your email' v-model='msgData.senderEmail'>
        <input type='text' placeholder='Send to' v-model='msgData.toEmail'>
        <textarea placeholder='body' v-model='msgData.body'>
        </textarea>
        <div class='compose-button-container flex space-between'>
          <button @click='onSendMail'>Send Mail</button>
          <button @click='onSaveDraft'>Save As Draft</button>
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
          isDraft: false
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
      this.$router.push('/email/draft')
    }
  },
  created: function () {
    const { emailId } = this.$route.params
    if(emailId) this.msgData = emailService.getEmailById(emailId)
  }
}
