import { emailService } from '../services/email.service.js'
import bigPreview from './big-preview.cmp.js'
export default {
  props: ['email'],
  template: `
    <div>
      <li class="email-preview flex justify-center space-between" @click="isShowBigPreview = true">
          <i class="fa fa-star-o" style="font-size:25px" @click='onStarClicked(email.id)'></i>
          <span>Sender: {{email.sender}}</span>
          <span>Subject: {{email.subject}}</span>
          <span>{{formatedDate}}</span>
          <i class="fa fa-envelope" aria-hidden="true"></i>
      </li>
      <big-preview v-if='isShowBigPreview' :email='email'></big-preview>
    </div>
  `,
  components: {bigPreview},
  data() {
    return {
      starClass: {
        'fa fa-star': false,
        'fa fa-star-o': true,
      },
      isShowBigPreview: false,
    }
  },
  methods: {
    onStarClicked(emailId) {
      emailService.setMsgStarById(emailId)
      this.isStared = true
    },
    // setSelectedBook(selectedBook) {
    //   this.selectedBook = selectedBook;
    // }
    // setCurrBook() {
    //   this.selectedBook = null;
    // },
  },
  computed: {
    formatedDate() {
      var currentdate = new Date(this.email.sentAt)
      var datetime =
        'Last Sync: ' +
        currentdate.getDate() +
        '/' +
        (currentdate.getMonth() + 1) +
        '/' +
        currentdate.getFullYear() +
        ' @ ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes() +
        ':' +
        currentdate.getSeconds()
      return datetime
    },
  },
  // starClass: function () {
  //   return {
  //     'fa fa-star': this.email.isStared,
  //     'fa fa-star-o': !this.email.isStared,
  //   }
  // },
}
