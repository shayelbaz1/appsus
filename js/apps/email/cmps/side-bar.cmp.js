import { emailService } from '../services/email.service.js'
import { eventBusService } from '../../../main-services/event-bus.service.js'

export default {
  template: `
    <section class='side-bar flex column align-center'>
       <router-link to='/email/list' class='side-links flex align-center'>
          <i class="fa fa-inbox" aria-hidden="true"></i>
          <h2>Inbox</h2>
       </router-link>
       <router-link to='starred' class='side-links flex align-center'>
          <i class="fa fa-star" style="font-size:25px"></i>
          <h2>Starred</h2>
       </router-link>
       <router-link to='sent' class='side-links flex align-center'>
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
          <h2>Sent</h2>
       </router-link>
       <router-link to='draft' class='side-links flex align-center'>
          <i class="fa fa-file" aria-hidden="true"></i>
          <h2>Drafts</h2>
       </router-link>
       <router-link to='deleted' class='side-links flex align-center'>
          <i class="fa fa-trash" aria-hidden="true"></i>
          <h2>Deleted</h2>
       </router-link>
       <p>You have {{numOfUnreadMsgs}} unread emails</p>
    </section>
  `,
  data(){
    return {numOfUnreadMsgs: emailService.getUnreadMails().length}
  },
  methods: {
   updateUnreadEmailsNum() {
      let numOfUnreadMails = emailService.getUnreadMails().length
      this.numOfUnreadMsgs = numOfUnreadMails
    },
  },
  created() {
    eventBusService.$on('readEmail', this.updateUnreadEmailsNum)
  },
}
