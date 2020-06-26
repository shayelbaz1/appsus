import { emailService } from "../services/email.service.js";


import emailList from "../cmps/email-list.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import sideBar from "../cmps/side-bar.cmp.js"
import {eventBusService} from '../../../main-services/event-bus.service.js'
import noEmailsBanner from '../cmps/no-emails-banner.cmp.js'



export default {
  template: `
    <div class='email-app'>
      <email-filter @filter='setFilter' @sort='onSort'></email-filter>
      <div class='main-content flex space-between'>
        <side-bar></side-bar>
        <router-view></router-view>
        <no-emails-banner v-if='!isThereEmails' :listType='listType'></no-emails-banner>
      </div>
    </div>
    `,
  components: {
    emailFilter,
    emailList,
    sideBar,
    noEmailsBanner
  },
  data() {
    return {
      emails: [],
      filterBy: {
        subject: "",
        selected: 'unRead'
      },
      sortBy: ''
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
    isThereEmails() {
      return this.emails.length
    },
    listType(){
      const { listType } = this.$route.params
      return listType
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
      // send filtered data to email list
      // if filter eve fired
      eventBusService.$emit('filterdEmails', this.emailsToShow)
    },
    onSort(sortBy){
      console.log(sortBy);
      debugger
      emailService.sortByType(sortBy)
    }
  },
  async created() {
    // on create send all mails to email list
    this.emails = await emailService.getEmails()
    eventBusService.$emit('allEmails', this.emails)
  },
  //on url change
  watch: {
    async '$route.params.listType'(){
      const { listType } = this.$route.params
      let emails = await emailService.getEmailsByListType(listType);
      this.emails = emails
      eventBusService.$emit('routeChanged', this.emails)
    }
  } 
};
