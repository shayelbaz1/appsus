import { notesService } from "../services/notes.service.js";

export default {
  name: 'add-img',
  template: `
    <section class="add-img">
    <!-- <input type="text" class="form-control empty" id="iconified" placeholder="&#xF002;"/> -->
    <!-- <input type="text" placeholder="\uf03e Enter image URL" style="font-family:tahoma,FontAwesome" /> -->

        <div class="flex">
          <input type="text" placeHolder='\uf03e Enter image URL' v-model="imgUrl" @keyup.enter="addImg" style="font-family:tahoma,FontAwesome"/>
          <!-- <button @click="addFile"class="plus">+</button> -->
          <!-- <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"> -->
          
        </div>
    </section>
    `,
  data() {
    return {
      imgUrl: null,
    };
  },
  methods: {
    uploadImage(event) {
    console.log('event:', event.target.files[0])
    },
    addImg() {
      notesService.addImg(this.imgUrl)
      this.imgUrl = null
    }
  },
};
