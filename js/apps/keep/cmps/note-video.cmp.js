import { notesService } from "../services/notes.service.js";

export default {
  name: 'note-video',
  props:['info','isEditMode','noteId'],
    template: `
      <section class="note-video">
        <!-- <iframe :src="info.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
        <div @click="toggleEdit">
        <iframe :src="info.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <input v-show="isEditMode" ref="text" v-model="videoUrl"  type="text"  @keyup.enter="saveEdit"/>
      </section>
      `,
    data() {
      return {
        videoUrl: this.info.url,
      }
  },
  methods: {
    saveEdit() {
      notesService.saveEdit(this.noteId, this.videoUrl, 'noteVideo')
      this.toggleEdit()
    },
    toggleEdit() {
      notesService.toggleEdit(this.noteId)
    }
  },
  };
  