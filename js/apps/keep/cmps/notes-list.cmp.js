import { notesService } from "../services/notes.service.js";

export default {
  name: 'notes-list',
  props: ["notes"],
  template: `
        <ul class="notes-list clean-list">
                <li class="note-card" v-for="note in notes" :key="note.id">
                  {{note.bodyText}}
                  <div><button @click="deleteNote(note.id)" class="note-card-delete"><i class="fas fa-trash"></i></button> </div> 
                </li>
        </ul>
    `,
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    deleteNote(noteId) {
      // console.log('noteId:', noteId)
      notesService.deleteNote(noteId)
    }
  }
};
