import { notesService } from "../services/notes.service.js";
import notesList from "../cmps/notes-list.cmp.js";
import notesPinned from "../cmps/notes-pinned.cmp.js";
import notesFilter from "../cmps/notes-filter.cmp.js";
import addNote from "../cmps/add-note.cmp.js";
import addImg from "../cmps/add-img.cmp.js";
import addVideo from "../cmps/add-video.cmp.js";
import addTodos from "../cmps/add-todos.cmp.js";

export default {
  name: 'notes-app',
  template: `
        <section class="notes-app column-layout">
            <div class="flex add-notes-box ">
              <section class="notes-add flex space-between">

                <div class="inputs">
                  <notes-filter v-if="currIcon === 'search'" @filter="setFilter"></notes-filter>
                  <add-todos v-if="currIcon === 'list'"></add-todos>
                  <add-note v-if="currIcon === 'font'"></add-note>
                  <add-img v-if="currIcon === 'image'"></add-img>
                  <add-video v-if="currIcon === 'youtube'"></add-video>
                </div>

                <div  class="type-list-btns flex">
                  <div  v-for="icon in iconList">
                    <input hidden @click="setCurrIcon(icon)"  type="radio" :id="icon" name="noteType" :value="icon">
                      <label :title="icon" :for="icon" :class="{active:currIcon === icon}" >
                        <i :class="iconClass(icon)"></i>
                      </label>
                  </div>
                </div>

              </section>
            </div>

            <notes-pinned :notes="pinnedNotes"></notes-pinned>
            <notes-list :notes="notesToShow"></notes-list>
        </section>


    `,
  components: {
    notesFilter,
    notesList,
    notesPinned,
    addNote,
    addImg,
    addTodos,
    addVideo
  },
  data() {
    return {
      iconList:['search','font','image','youtube','list'],
      notes: [],
      currIcon: 'font',
      filterBy: {
        title: "",
      },
    };
  },
  computed: {
    pinnedNotes() {
      var pinnedNotes = this.notes
        .filter(note => {
        return note.isPinned === true
        })
      return pinnedNotes
    },
    notesToShow() {
      const filterBy = this.filterBy;
      if (!filterBy.title) {
        return this.notes
      };

      var filteredNotes = this.notes
        .filter((note) => {
          if (note.type === 'noteTxt') {
            return note.info.txt
            .toLowerCase()
            .includes(filterBy.title.toLowerCase());
          }
          if (note.type === 'noteTodos') {
            return note.info.label
            .toLowerCase()
            .includes(filterBy.title.toLowerCase());
          }
        })

      return filteredNotes;
    },
  },
  methods: {
    iconClass(icon) {
      if (icon === 'font'||icon==='list') return 'fas fa-' + icon + ' fa-lg'
      if (icon === 'image') return 'far fa-' + icon + ' fa-lg'
      if (icon === 'youtube') return 'fab fa-' + icon + ' fa-lg'
      if (icon === 'search') return 'fa fa-' + icon + ' fa-lg'
      
    },
    setCurrIcon(value){
      this.currIcon = value
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    }
  },
  created() {
    const emailData = this.$route.query
    if (emailData.txt && emailData.title) {
      notesService.addNote(emailData.txt)
      this.$router.replace('/notes')
    }
    


    notesService.getNotes()
      .then((notes) => {
      this.notes = notes;
    });
  },
};
