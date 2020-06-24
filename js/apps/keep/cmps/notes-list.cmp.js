import { notesService } from "../services/notes.service.js";
import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

export default {
  name: 'notes-list',
  props: ["notes"],
  template: `
        <ul class="notes-list clean-list">
            <li class="note-card" v-for="note in notes" :key="note.id" :style="note.style">
              <component :is="note.type" :info="note.info"></component>
              <div>
                <div @click="deleteNote(note.id)" class="note-card-delete">
                <i class="fas fa-trash"></i>
              </div> 
              </div> 
            </li>
        </ul>
    `,
  data() {
    return {
      hover: false,
      newNotes: null
    };
  },
  methods: {
    deleteNote(noteId) {
      // console.log('noteId:', noteId)
      notesService.deleteNote(noteId)
    }
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo
  }
};
