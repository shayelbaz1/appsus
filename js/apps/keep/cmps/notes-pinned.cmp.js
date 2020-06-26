import { notesService } from "../services/notes.service.js";
import noteTxt from "./note-txt.cmp.js";
import noteImg from "./note-img.cmp.js";
import noteVideo from "./note-video.cmp.js";
import noteTodos from "./note-todos.cmp.js";

export default {
  name: 'notes-list',
  props: ["notes"],
  template: `
        <ul class="notes-list clean-list">
            <li class="note-card" v-for="(note,idx) in notes" :key="note.id" :style="note.style">
              
              <!-- NOTE CARD -->
              <component :is="note.type" :info="note.info"></component>
              
              <!-- DELETE NOTE -->
              <div>
                <div @click="deleteNote(note.id)" class="note-card-delete">
                <i class="fas fa-trash"></i>
                </div> 

                <div @click="pinSelectedNote(note.id)" class="note-card-delete">
                <i class="fas fa-thumbtack"></i>
                </div> 

              <!-- BTN BOX -->
              <!-- <div  class="type-list-btns flex">
                  <div  v-for="icon in iconList">
                    <input hidden @click.stop="setCurrIcon(icon),activeIcon(icon,note.id)"  type="radio" :id="icon" name="noteType" :value="icon">
                      <label :title="icon" :for="icon" :class="{active:currIcon === icon}" >
                        <i :class="iconClass(icon)"></i>
                      </label>
                  </div>
                </div> -->
              </div> 

            </li>
        </ul>
    `,
  data() {
    return {
      iconList: ['thumbtack','check','palette','edit','clone','trash-alt'],
      currIcon: 'thumbtack',
      hover: false,
      newNotes: null,
      selectedNoteId: ""
    };
  },
  methods: {
    activeIcon(icon,noteId) {
      console.log('noteId:', noteId)
      console.log('icon:', icon)
      this.selectedNoteId = noteId
      if(icon==='thumbtack') this.pinSelectedNote(noteId)
      
    },
    pinSelectedNote(noteId) {
      notesService.pinNote(noteId)
      
    },
    iconClass(icon) {
      return 'fas fa-' + icon + ' fa-lg'
      
    },
    setCurrIcon(value){
      this.currIcon = value
    },
    deleteNote(noteId) {
      // console.log('noteId:', noteId)
      notesService.deleteNote(noteId)
    }
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo
  }
};
