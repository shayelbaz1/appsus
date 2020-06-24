import { utils } from "../../../services/utils.service.js"; 

var gDynamicNotes = [
  {
    id: utils.getRandomId(),
    type: "noteTxt",
    isPinned: true,
    info: { txt: "Fullstack Me Baby!" }
  },
  {
    id: utils.getRandomId(),
    type: "noteTxt",
    isPinned: true,
    info: { txt: "Backend Me Baby!" }
  },
  {
    id: utils.getRandomId(),
    type: "noteImg",
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
    info: {
      // url: "https://www.youtube.com/embed/VugasBUoBdI",
      url: "https://www.youtube.com/embed/tgbNymZ7vqY",
      title: "Dynamic"
    }, style: {
      backgroundColor: "#white"
    }
  },
  {
    id: utils.getRandomId(),
    type: "noteTodos",
    info: {
      label: "How was it:",
      todos: [{
        txt: "Do that",
        isDone: false
      }, {
          txt: "Do this",
          isDone: true
        }]
    }
  }
];

var gNotes = createNotes();


export const notesService = {
  getNotes,
  addNote,
  deleteNote,
  addImg,
  addTodos
};

function addTodos(todos) {
  console.log('todos:', todos)
  var newNote ={
    id: utils.getRandomId(),
    type: "noteTodos",
    info: {
      label: "Todos List:",
      todos:  []
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
    info: {
      txt: newTxt
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