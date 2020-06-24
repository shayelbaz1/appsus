import { emailService } from "../services/email.service.js";


import emailList from "../cmps/email-list.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import sideBar from "../cmps/side-bar.cmp.js"
import {eventBusService} from '../../../main-services/event-bus.service.js'


export default {
  template: `
    <div>
      <email-filter @filter='setFilter'></email-filter>
      <div class='main-content flex space-around'>
        <side-bar></side-bar>
        <router-view></router-view>
      </div>
    </div>
    `,
  components: {
    emailFilter,
    emailList,
    sideBar
  },
  data() {
    return {
      emails: [],
      filterBy: {
        subject: "",
        selected: 'unRead'
      },
      sortBy: 'Title'
    };
  },
  computed: {
    emailsToShow() {
      const filterBy = this.filterBy;
      if (filterBy.selected === 'All') return this.emails;

      var filteredEmails = this.emails.filter((email) => {
          return email.subject.toLowerCase().includes(filterBy.subject.toLowerCase())
          && email.isRead === filterBy.selected
      })
      
      return filteredEmails;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
      eventBusService.$emit('filterdEmails', this.emailsToShow)
    },
    // setSelectedBook(selectedBook) {
    //   this.selectedBook = selectedBook;
    // },
    // setCurrBook() {
    //   this.selectedBook = null;
    // },
  },
  async created() {
    let emails = await emailService.getEmails()
    console.log(emails);
    this.emails = emails;
  }
};
