import { notesService } from "../services/notes.service.js";
// import {eventBusService} from '../../../main-services/event-bus.service.js'


export default {
    name: 'note-txt',
    props:['info','isEditMode','noteId'],
    template: `
      <section class="note-txt">
        <input v-if="isEditMode" type="text" v-model="noteTxt" @keyup.enter="saveEdit"/>
        <div v-else @click="toggleEdit">{{noteTxt}}</div>
      </section>
      `,
  data() {
    return {
      noteTxt: this.info.txt,
    }
  },
  methods: {
    saveEdit() {
      notesService.saveEdit(this.noteId, this.noteTxt, 'noteTxt')
      this.toggleEdit()
    },
    toggleEdit() {
      notesService.toggleEdit(this.noteId)
    }
  },

  };
  