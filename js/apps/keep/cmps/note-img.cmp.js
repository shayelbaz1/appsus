import { notesService } from "../services/notes.service.js";

export default {
    name: 'note-img',
    props:['info','isEditMode','noteId'],
    template: `
      <section class="note-img">
        <div @click="toggleEdit"><img :src="imgUrl" alt="info.title"/></div>
        <input v-show="isEditMode" ref="text" v-model="imgUrl"  type="text"  @keyup.enter="saveEdit"/>
      </section>
      `,
    data() {
      return {
        imgUrl: this.info.url,
      }
  },
  methods: {
    // setFocus() {
    //   if (this.isFocus) {
    //     this.isFocus = false
    //     this.$refs.text.blur()
    //   } 
    //   else {
    //     this.isFocus = true
    //     this.$refs.text.focus()
    //   }
    // },
    saveEdit() {
      notesService.saveEdit(this.noteId, this.imgUrl, 'noteImg')
      this.toggleEdit()
    },
    toggleEdit() {
      notesService.toggleEdit(this.noteId)
    }
  },
  };
  