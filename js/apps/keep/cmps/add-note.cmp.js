import { notesService } from "../services/notes.service.js";

export default {
  name: 'add-note',
  template: `
    <section class="add-note">
        <input type="text" placeHolder="\uf249 What's on your mind..." v-model="txt" @keyup.enter="addNote" style="font-family:tahoma,FontAwesome"/>
    </section>
    `,
  data() {
    return {
      txt: null
    };
  },
  methods: {
    addNote() {
      notesService.addNote(this.txt)
      this.txt = null
    }
  },
};
