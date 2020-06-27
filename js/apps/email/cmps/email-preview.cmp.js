import { emailService } from '../services/email.service.js'
import bigPreview from './big-preview.cmp.js'
import { eventBusService } from '../../../main-services/event-bus.service.js'
export default {
  props: ['email'],
  template: `
    <div class='preview-container'>
      <li class="email-preview flex justify-center space-between" @click="onShowPreviewClick(email.id)">
          <i v-bind:class="this.currEmail.starClass" style="font-size:25px" @click.stop='onStarClicked(email.id)'></i>
          <div class='txt-preview flex'>
            <span>Sender: {{email.sender}}  </span>
            <span>Subject: {{email.subject}}</span>
          </div>
          <div class='date-preview flex'>
            <span>{{formatedDate}}</span>
            <i v-bind:class="this.currEmail.envelopeClass" aria-hidden="true"></i>
          </div>
      </li>
      <big-preview v-if='isShowBigPreview' :email='email'></big-preview>
    </div>
  `,
  components: {bigPreview},
  data() {
    return {
      currEmail: this.email,
      isShowBigPreview: false,
      isStarred: false
    }
  },
  methods: {
    onStarClicked(emailId) {
      //fa fa-star-o
      emailService.setMsgStarById(emailId)
      this.isStarred = !this.isStarred
      emailService.setMsgStarById(emailId, this.isStarred)
      emailService.setStarClass(emailId, this.isStarred)
    },
    onShowPreviewClick(emailId){
      this.isShowBigPreview = !this.isShowBigPreview
      if(this.currEmail.isRead) return
      emailService.openEnvelope(emailId)
      eventBusService.$emit('readEmail', true)
    }
  },
  computed: {
    formatedDate() {
      var currentdate = new Date(this.email.sentAt)
      var datetime =
        currentdate.getDate() +
        '/' +
        (currentdate.getMonth() + 1) +
        '/' +
        currentdate.getFullYear() +
        ' ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes() +
        ':' +
        currentdate.getSeconds()
      return datetime
    },
  },
}
