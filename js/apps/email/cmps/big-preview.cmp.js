import { emailService } from '../services/email.service.js'
import {eventBusService} from '../../../main-services/event-bus.service.js'


export default {
  props:['email'],  
  template: `
    <div class='flex column align-center'>
        <span>Subject: {{email.subject}}</span>
        <span>Sender: {{email.sender}}</span>
        <div class='preview-icons flex '>
          <i @click='onDelMsg(email.id)' class="fa fa-trash" aria-hidden="true"></i>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          <router-link :to="'email/details/' + email.id"><i class="fa fa-window-maximize" aria-hidden="true"></i></router-link>
        </div>
        <p>{{email.body}}</p>
    </div>
  `,
  methods: {
    onDelMsg(emailId) {
      emailService.deleteMsgById(emailId)
      eventBusService.$emit('delOccured', true) 
    },
    // setSelectedBook(selectedBook) {
    //   this.selectedBook = selectedBook;
    // }
    // setCurrBook() {
    //   this.selectedBook = null;
    // },
  }
}