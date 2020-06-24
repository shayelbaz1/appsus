import { notesService } from "../services/notes.service.js";

export default {
  name: 'add-note',
  template: `
    <section class="add-note">
        <input type="text" placeHolder="What's on your mind..." v-model="txt" @keyup.enter="addNote"/>
    </section>
    `,
  data() {
    return {
      txt: null
    };
  },
  methods: {
    addNote() {
      console.log('txt:', this.txt)
      notesService.addNote(this.txt)
      this.txt = null
    }
  },
};
