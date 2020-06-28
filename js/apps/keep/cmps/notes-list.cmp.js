import { notesService } from "../services/notes.service.js";
import {eventBusService} from '../../../main-services/event-bus.service.js'
import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

export default {
  name: 'notes-list',
  props: ['notes'],
  template: `
        <ul class="notes-list clean-list">
            <li  class="note-card" v-for="(note,idx) in notes" :key="note.id" :style="note.style" :class="{marked: note.isMarked}">
              
              <!-- NOTE CARD === CMP preview -->
              <component :is="note.type" :info="note.info" 
              :isEditMode="note.isEditMode" :noteId="note.id"></component>
              




              <!-- START BTNS BOX -->
                  <div class="note-btns-box flex space-evenly" @mouseleave="isShowColors = false">
                    <!-- PIN NOTE -->
                    <i @click="pinSelectedNote(note.id)" class="fas fa-thumbtack"></i>
                    <!-- MARK NOTE -->
                    <i @click="markSelectedNote(note.id)" class="fas fa-check"></i>
                    <!-- COLOR NOTE -->
                    <i @mouseover="isShowColors = true"   class="fas fa-palette"></i>
                      <div @mouseover="isShowColors = true" @mouseleave="isShowColors = false" v-if="isShowColors" class="color-options">
                        <span @click="setColor(note.id,'#ffffff')" style="background-color: #ffffff"></span>
                        <span @click="setColor(note.id,'#ff8888')" style="background-color: #ff8888"></span>
                        <span @click="setColor(note.id,'#ffcc88')" style="background-color: #ffcc88"></span>
                        <span @click="setColor(note.id,'#ffff88')" style="background-color: #ffff88"></span>
                        <span @click="setColor(note.id,'#ccff99')" style="background-color: #ccff99"></span>
                        <span @click="setColor(note.id,'#aaffee')" style="background-color: #aaffee"></span>
                        <span @click="setColor(note.id,'#ddbbff')" style="background-color: #ddbbff"></span>
                        <span @click="setColor(note.id,'#dddddd')" style="background-color: #dddddd"></span>
                        <span @click="setColor(note.id,'#ffb4d1')" style="background-color: #ffb4d1"></span>
                      </div>
                    <!-- EDIT NOTE -->
                    <i @click="toggleEdit(note.id)" class="fas fa-edit"></i>
                    <!-- CLONE CLONE -->
                    <i @click="cloneNote(note.id)" class="fas fa-clone"></i>
                    <!-- CLONE SEND -->
                    <i @click="sendNote(note.id)" class="fas fa-send"></i>
                    <!-- DELETE NOTE -->                  
                    <i @click="deleteNote(note.id)" class="fas fa-trash"></i>
                  </div> 
              <!-- END NOTE-BTNS-BOX -->
                
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
      selectedNoteId: "",
      isShowColors: false,
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    sendNote(noteId) {
      let note = notesService.getNoteById(noteId)
      const noteSubject = this.convertedNoteSubject(note.type)
      this.$router.replace(`email/compose/?subject=${noteSubject}&txt=${note.info.txt}`)
    },
    convertedNoteSubject(noteType) {
      if (noteType === 'noteTxt') return 'Text Note' 
      else return noteType
    },
    cloneNote(noteId){
      notesService.cloneNote(noteId)
    },
    toggleEdit(noteId) {
      notesService.toggleEdit(noteId)
    },
    setColor(noteId,color){
      notesService.setColor(noteId,color)
    },
    markSelectedNote(noteId) {
      notesService.markNote(noteId)
    },
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
