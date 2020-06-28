import { notesService } from "../services/notes.service.js";
// import {eventBusService} from '../../../main-services/event-bus.service.js'


export default {
    name: 'note-txt',
    props:['info','isEditMode','noteId'],
    template: `
      <section class="note-txt">
        <textarea rows="8" cols="17" v-if="isEditMode" type="text-area" v-model="noteTxt" @keyup.escape="saveEdit"></textarea>
        <button v-if="isEditMode" @click="saveEdit">Save Edit</button>
        <div v-else @click="toggleEdit">
          {{noteTxt}}
          <br/>
          <br/>
        </div>
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
  