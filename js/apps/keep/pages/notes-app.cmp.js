import { notesService } from "../services/notes.service.js";
import notesList from "../cmps/notes-list.cmp.js";
import notesFilter from "../cmps/notes-filter.cmp.js";
import addNote from "../cmps/add-note.cmp.js";
import addImg from "../cmps/add-img.cmp.js";
import addTodos from "../cmps/add-todos.cmp.js";

export default {
  name: 'notes-app',
  template: `
        <section class="notes-app column-layout">
            <div class="flex">
              <notes-filter @filter="setFilter"></notes-filter>
              <add-note></add-note>
              <add-img></add-img>
              <add-todos></add-todos>
            </div>
            <notes-list :notes="notesToShow"></notes-list>
        </section>


    `,
  components: {
    notesFilter,
    notesList,
    addNote,
    addImg,
    addTodos
  },
  data() {
    return {
      notes: [],
      filterBy: {
        title: "",
      },
    };
  },
  computed: {
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
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    // setSelectedBook(selectedBook) {
    //   this.selectedBook = selectedBook;
    // },
    // setCurrBook() {
    //   this.selectedBook = null;
    // },
  },
  created() {
    notesService.getNotes().then((notes) => {
      console.log('notes:', notes)
      this.notes = notes;
    });
  },
};
