import { notesService } from "../services/notes.service.js";
import {eventBusService} from '../../../main-services/event-bus.service.js'
import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

export default {
  name: 'notes-list',
  props: ["notes"],
  template: `
        <ul class="notes-list clean-list">
            <li class="note-card" v-for="(note,idx) in notes" :key="note.id" :style="note.style" v-if="!note.isPinned" :class="{marked: note.isMarked}">
              
              <!-- NOTE CARD -->
              <component :is="note.type" :info="note.info" :isEditMode="note.isEditMode" :noteId="note.id"></component>
              
              <!-- DELETE NOTE -->
              <div>
                <div @click="deleteNote(note.id)" class="note-card-delete">
                <i class="fas fa-trash"></i>
                </div>
                <!-- PIN NOTE -->
                <div @click="pinSelectedNote(note.id)" class="note-card-delete">
                <i class="fas fa-thumbtack"></i>
                </div>
                <!-- MARK NOTE -->
                <div @click="markSelectedNote(note.id)" class="note-card-delete">
                <i class="fas fa-check"></i>
                </div> 
                <!-- COLOR NOTE -->
                <div @mouseover="isShowColors = true" @mouseleave="isShowColors = true" class="note-card-delete">
                <i class="fas fa-palette"></i>
                  <div v-if="isShowColors" class="color-options">
                    <span @click="setColor(note.id,'#ffffff')" style="background-color: #ffffff"></span>
                    <span @click="setColor(note.id,'#ff8888')" style="background-color: #ff8888"></span>
                    <span @click="setColor(note.id,'#ffcc88')" style="background-color: #ffcc88"></span>
                    <span @click="setColor(note.id,'#ffff88')" style="background-color: #ffff88"></span>
                    <span @click="setColor(note.id,'#ccff99')" style="background-color: #ccff99"></span>
                    <span @click="setColor(note.id,'#aaffee')" style="background-color: #aaffee"></span>
                    <span @click="setColor(note.id,'#ddbbff')" style="background-color: #ddbbff"></span>
                    <span @click="setColor(note.id,'#dddddd')" style="background-color: #dddddd"></span>
                  </div>
                </div> 
                <!-- EDIT NOTE -->
                <div @click="editNote(note.id)" class="note-card-delete">
                <i class="fas fa-edit"></i>
                </div> 

              <!-- BTN BOX -->
              <!-- <div  class="type-list-btns flex">
                  <div  v-for="icon in iconList">
                    <input hidden @click="setCurrIcon(icon),activeIcon(icon,note.id)"  type="radio" :id="icon" name="noteType" :value="icon">
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
      selectedNoteId: "",
      isShowColors: true,
      isEditMode: false
    };
  },
  methods: {
    editNote(noteId) {
      notesService.setEditMode(noteId)
      // this.isEditMode = !this.isEditMode
      // eventBusService.$emit('editMode',this.isEditMode)
      // console.log('this.isEditMode:', this.isEditMode)
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
