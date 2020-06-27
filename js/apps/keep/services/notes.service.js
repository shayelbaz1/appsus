import { utils } from "../../../services/utils.service.js"; 
import {eventBusService} from '../../../main-services/event-bus.service.js'

var gDynamicNotes = [
  {
    id: utils.getRandomId(),
    type: "noteTxt",
    isPinned: true,
    isMarked: false,
    isEditMode: false,
    info: { txt: "Fullstack Me Baby!" },
    style: {
      backgroundColor: "#white"
    }
  },
  {
    id: utils.getRandomId(),
    type: "noteTxt",
    isPinned: true,
    isMarked: false,
    isEditMode: false,
    info: { txt: "Backend Me Baby!" },
    style: {
      backgroundColor: "#white"
    }
  },
  {
    id: utils.getRandomId(),
    type: "noteImg",
    isPinned: false,
    isMarked: false,
    isEditMode: false,
    info: {
      url: "https://html.com/wp-content/uploads/flamingo.jpg",
      title: "Flamingo"
    }, style: {
      backgroundColor: "#f4ff89"
    }
  },
  {
    id: utils.getRandomId(),
    type: "noteVideo",
    isPinned: false,
    isMarked: false,
    isEditMode: false,
    info: {
      // url: "https://www.youtube.com/embed/VugasBUoBdI",
      url: "https://www.youtube.com/embed/tgbNymZ7vqY",
      title: "Video Note"
    }, style: {
      backgroundColor: "#white"
    }
  },
  {
    id: utils.getRandomId(),
    type: "noteTodos",
    isPinned: false,
    isMarked: false,
    isEditMode: false,
    info: {
      label: "How was it:",
      todos: [{
        txt: "Do that",
        isDone: false
      }, {
          txt: "Do this",
          isDone: true
        }]
    },
    style: {
      backgroundColor: "#white"
    }
  }
];

var gNotes = createNotes();


export const notesService = {
  getNotes,
  addNote,
  deleteNote,
  addImg,
  addTodos,
  addVideo,
  pinNote,
  markNote,
  setColor,
  saveEdit,
  toggleEdit,
  cloneNote,
  sendNote
};
function sendNote(noteId) {
  const currNote = getNoteById(noteId)
  eventBusService.$emit('onSendNote', currNote)
}
function cloneNote(noteId) {
  const idx = getNoteIndexById(noteId)
  const oldNote = getNoteById(noteId)

  let newNote = { ...oldNote }

  newNote.id = utils.getRandomId()
  
  gNotes.splice(idx,0,newNote)
  utils.storeToStorage('notes',gNotes)
  
}

function getNoteIndexById(noteId) {
  return gNotes.findIndex(note => {
    return note.id === noteId
  })
}

function toggleEdit(noteId) {
  let note = getNoteById(noteId)
  note.isEditMode = !note.isEditMode
  utils.storeToStorage('notes',gNotes)
}

function saveEdit(noteId, noteData,type) {
  console.log('noteData:', noteData)
  let note = getNoteById(noteId)
  if (type === 'noteTxt') note.info.txt = noteData
  if (type === 'noteImg' || type === 'noteVideo') note.info.url = noteData
  if (type === 'noteTodos') note.info.todos = noteData
  else return
  utils.storeToStorage('notes',gNotes)
}
function getNoteById(noteId) {
  return gNotes.find(note => {
    return note.id === noteId
  })
}


function setColor(noteId,color) {
  let note = getNoteById(noteId)
  console.log('note before:', note.style.backgroundColor, color)
  note.style.backgroundColor = ''+color
  console.log('note after:', note.style.backgroundColor, color)
  // utils.storeToStorage('notes',gNotes)
}

function markNote(noteId) {
  let note = gNotes.find(note => {
    return note.id === noteId
  })
  note.isMarked = !note.isMarked
  utils.storeToStorage('notes',gNotes)
}

function pinNote(noteId) {
  let note = gNotes.find(note => {
    return note.id === noteId
  })
  note.isPinned = !note.isPinned
  utils.storeToStorage('notes',gNotes)
}
function addVideo(vidUrl) {
  console.log('vidUrl:', vidUrl)
  var newNote = {
    id: utils.getRandomId(),
    type: "noteVideo",
    isPinned: false,
    isMarked: false,
    isEditMode: false,
    info: {
      url: vidUrl,
      title: "Video Note"
    }, style: {
      backgroundColor: "#white"
    }
  }
  gNotes.unshift(newNote)
  utils.storeToStorage('notes',gNotes)
  
}
function addTodos(todos) {
  console.log('todos:', todos)
  var newNote ={
    id: utils.getRandomId(),
    type: "noteTodos",
    isPinned: false,
    isMarked: false,
    isEditMode: false,
    info: {
      label: "Todos List:",
      todos:  []
    },
    style: {
      backgroundColor: "#ffffff"
    }
  }
    
    var newTodos = todos.map(function (todo) {
      return {
          txt: todo.txt,
          isDone: false
    }
    })
  
  newNote.info.todos = newTodos
  
  gNotes.unshift(newNote)
  utils.storeToStorage('notes',gNotes)
}


function addImg(imgUrl,title='Beautiful Image',type='noteImg') {
  var newNote = 
  {
    id: utils.getRandomId(),
    type: type,
    isPinned: false,
    isMarked: false,
    isEditMode: false,
    info: {
      url: imgUrl,
      title: title
    },style: { backgroundColor: "#f4ff89" }
  }
  gNotes.unshift(newNote)
  utils.storeToStorage('notes',gNotes)
  
}
function deleteNote(noteId) {
  const idx = gNotes.findIndex(note => {
    return note.id === noteId
  })
  gNotes.splice(idx, 1)
  utils.storeToStorage('notes',gNotes)
  
}

function addNote(newTxt,type = 'noteTxt') {
  var newNote = 
  {
    id: utils.getRandomId(),
    type: type,
    isPinned: true,
    isMarked: false,
    isEditMode: false,
    info: {
      txt: newTxt
    },
    style: {
      backgroundColor: "#ffffff"
    }
  }
  gNotes.unshift(newNote)
  utils.storeToStorage('notes',gNotes)
}

function createNotes() {
  const notes = utils.loadFromStorage("notes");
  if (notes) return notes;
  else {
    utils.storeToStorage("notes", gDynamicNotes);
    return gDynamicNotes;
  }
}

function getNotes() {
  return Promise.resolve(gNotes)
}