import { emailService } from '../services/email.service.js'
import {eventBusService} from '../../../main-services/event-bus.service.js'


export default {
  props:['email'],  
  template: `
    <div class='flex column align-center'>
        <span>Subject: {{email.subject}}</span>
        <span>Sender: {{email.sender}}</span>
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
        <p>{{email.body}}</p>
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