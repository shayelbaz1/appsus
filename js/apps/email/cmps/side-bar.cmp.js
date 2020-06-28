import { emailService } from '../services/email.service.js'
import { eventBusService } from '../../../main-services/event-bus.service.js'

export default {
  template: `
    <section :class='filterClass'>
       <div class='compose-btn flex'>
         <router-link to="/email/compose" class="compose-group flex align-center" >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                  <div class='flex'>
                    <span>Compose</span>
                  </div>
         </router-link>  
       </div>
       <div class="side-bar-btns">
          <router-link to='/email/list' class='side-links flex align-center'>
             <i class="fa fa-inbox" aria-hidden="true"></i>
             <h2>Inbox {{numOfUnreadMsgs}}</h2>
          </router-link>
          <router-link to='/email/starred' class='side-links flex align-center'>
             <i class="fa fa-star" style="font-size:25px"></i>
             <h2>Starred</h2>
          </router-link>
          <router-link to='/email/sent' class='side-links flex align-center'>
             <i class="fa fa-paper-plane" aria-hidden="true"></i>
             <h2>Sent</h2>
          </router-link>
          <router-link to='/email/draft' class='side-links flex align-center'>
             <i class="fa fa-file" aria-hidden="true"></i>
             <h2>Drafts</h2>
          </router-link>
          <router-link to='/email/deleted' class='side-links flex align-center'>
             <i class="fa fa-trash" aria-hidden="true"></i>
             <h2>Deleted</h2>
          </router-link>
       </div>
       <div class='close-menu'>
          <i @click='closeMenu' class="fas fa-times fa-2x"></i>
       </div>
    </section>
  `,
  data(){
    return {
       numOfUnreadMsgs: emailService.getUnreadMails().length,
       filterClass: 'side-bar flex column align-center'
    }
  },
  methods: {
    updateUnreadEmailsNum() {
      let numOfUnreadMails = emailService.getUnreadMails().length
      this.numOfUnreadMsgs = numOfUnreadMails
    },
    toggleOpenClass(msg){
      console.log(msg);
      this.filterClass = 'side-bar flex column align-center ' + msg
    },
    closeMenu(){
      this.filterClass = 'side-bar flex column align-center'
    }
  },
  created() {
    eventBusService.$on('readEmail', this.updateUnreadEmailsNum)
    eventBusService.$on("toggleMenu", (msg)=>{this.toggleOpenClass(msg)});
  },
}
