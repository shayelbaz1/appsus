import { notesService } from "../services/notes.service.js";

export default {
  name: 'add-img',
  template: `
    <section class="add-img">
    <!-- <input type="text" class="form-control empty" id="iconified" placeholder="&#xF002;"/> -->
    <!-- <input type="text" placeholder="\uf03e Enter image URL" style="font-family:tahoma,FontAwesome" /> -->

        <input type="text" placeHolder='\uf03e Enter image URL' v-model="imgUrl" @keyup.enter="addImg" style="font-family:tahoma,FontAwesome"/>
    </section>
    `,
  data() {
    return {
      imgUrl: null,
    };
  },
  methods: {
    addImg() {
      notesService.addImg(this.imgUrl)
      this.imgUrl = null
    }
  },
};
