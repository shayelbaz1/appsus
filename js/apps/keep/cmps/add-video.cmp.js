import { notesService } from "../services/notes.service.js";

export default {
  name: 'add-video',
  template: `
    <section class="add-video">

        <input type="text" placeHolder='\uf16a Enter video URL' v-model="vidUrl" @keyup.enter="addVideo" style="font-family:tahoma,FontAwesome"/>
    </section>
    `,
  data() {
    return {
      vidUrl: null,
    };
  },
  methods: {
    addVideo() {
      notesService.addVideo(this.vidUrl)
      this.vidUrl = null
    }
  },
};
