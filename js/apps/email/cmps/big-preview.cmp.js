import { emailService } from '../services/email.service.js'
import {eventBusService} from '../../../main-services/event-bus.service.js'


export default {
  props:['email'],  
  template: `
    <div class='flex column align-center'>
        <h3 class='big-subject-preview'>{{email.subject}}</h3>
        <div class='big-content-container flex'>
          <span>{{email.sender}}</span><span class='sender-email'><{{email.senderEmail}}></span>
        </div>
        <p>{{email.body}}</p>
        <div class='preview-icons flex align-center'>
          <i @click='onDelMsg(email.id)' class="fa fa-trash" aria-hidden="true" title='delete a message'></i>
          <router-link :to="'compose/' + email.id">
            <i class="fa fa-pencil" aria-hidden="true" title='Edit a Message'></i>
          </router-link>  
          <router-link :to="'/email/details/' + email.id">
            <i class="fa fa-window-maximize" aria-hidden="true" title='review full message'></i>
          </router-link>
          <i @click='saveEmailAsNote' class="fa fa-sticky-note" aria-hidden="true" title='save as note'></i>
        </div>
    </div>
  `,
  methods: {
    onDelMsg(emailId) {
      emailService.deleteMsgById(emailId)
      eventBusService.$emit('delOccured', true) 
    },
    saveEmailAsNote(){
      this.$router.replace(`/notes/?title=${this.email.subject}&txt=${this.email.body}`)
    }
  }
}