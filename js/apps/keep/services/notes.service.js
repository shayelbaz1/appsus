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
        doneAt: null
      }, {
          txt: "Do this",
          doneAt: 187111111
        }]
    }
  }
];

var gNotes = createNotes();


export const notesService = {
  getNotes,
  addNote,
  deleteNote,
  getBooks,
  getById,
  addReview,
  deleteReview,
  getNextBookId,
  getPrevBookId,
  getBooksFromGoogle,
  addBook,
  findBooks
};
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








// ----------------------------------
function addBook(googleBook) {
  console.log('googleBook:', googleBook)
  const convertedBook = {
     id: googleBook.id,
     title: googleBook.volumeInfo.title,
     subtitle: googleBook.volumeInfo.subtitle,
     authors: googleBook.volumeInfo.authors,
     publishedDate: googleBook.volumeInfo.publishedDate,
     description: googleBook.volumeInfo.description,
     pageCount: googleBook.volumeInfo.pageCount,
     categories: googleBook.volumeInfo.categories,
     thumbnail: '',
     language: googleBook.volumeInfo.language,
     listPrice: {
       amount: utils.getRandomInt(50, 150),
       currencyCode: 'ILS',
       isOnSale: false,
     },
     reviews: [],
 }
 convertedBook.listPrice.isOnSale = (googleBook.saleInfo.saleability === "FOR_SALE") 
 convertedBook.thumbnail = (googleBook.volumeInfo.imageLinks) ? googleBook.volumeInfo.imageLinks.thumbnail : '';
 gBooks.unshift(convertedBook);
//  utils.storeToStorage('books', gBooks);
}

function findBooks(newSearchBook) {
  if(!newSearchBook) return getBooksFromGoogle()
  console.log('newSearchBook:', newSearchBook)
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${newSearchBook}`)
  .then(books => books.data.items)
  
}
function getBooksFromGoogle() {
  const googleBooks = utils.loadFromStorage('googleBooks')
  if (googleBooks) return Promise.resolve(googleBooks);
  else return axios.get('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
      .then(books => {
          gGoogleBooks = books.data.items
          utils.storeToStorage('googleBooks', gGoogleBooks);
          return books.data.items;
      })
}

function getNextBookId(bookId) {
  var idx = gBooks.findIndex(book => book.id === bookId)
  if (idx === gBooks.length - 1) idx = 0
  else  idx+=1
  return Promise.resolve(gBooks[idx].id)
}

function getPrevBookId(bookId) {
  var idx = gBooks.findIndex(book => book.id === bookId)
  if (idx === 0) idx = gBooks.length - 1
  else  idx-=1
  return Promise.resolve(gBooks[idx].id)
}

function deleteReview(book, idx) {
  book.reviews.splice(idx, 1);
  utils.storeToStorage("books", gBooks);
}
function addReview(bookId, newReview) {
  getById(bookId).then((book) => {
    if (book.reviews) {
      book.reviews.unshift(newReview);
    } else {
      book.reviews = [newReview];
    }
    utils.storeToStorage("books", gBooks);
  });
}

// function saveCar(car) {
//   if (car.id) {
//     const idx = gCars.findIndex((currCar) => currCar.id === car.id);
//     gCars.splice(idx, 1, car);
//   } else {
//     car.id = Utils.getRandomId();
//     car.createdAt = Date.now();
//     gCars.unshift(car);
//   }
//   return Promise.resolve(car);
// }

function getBooks() {
  return Promise.resolve(gBooks);
}

function createBooks() {
  const books = utils.loadFromStorage("books");
  if (books) return books;
  else {
    utils.storeToStorage("books", gJsonBooks);
    return gJsonBooks;
  }
}

function getById(bookId) {
  const book = gBooks.find((book) => book.id === bookId);
  return Promise.resolve(book);
}
