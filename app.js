let notes = [];
let activeNoteId = null;

// Utils
function generateId() {
  return Date.now().toString();
}

// Load notes on start
function init() {
  notes = notes = window.loadNotes();
  
  render();
}

function render() {
  const filteredNotes = filterNotes(UI.searchInput.value);
  renderNoteList(filteredNotes, selectNote);
}

// Note operations
function createNewNote() {
  const newNote = {
    id: generateId(),
    title: "",
    content: "",
    tags: [],
    created: Date.now()
  };

  notes.unshift(newNote);
  activeNoteId = newNote.id;
  window.saveNotes(notes);
  render();
  fillEditor(newNote);
}

function selectNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  activeNoteId = id;
  fillEditor(note);
}

function saveActiveNote() {
  if (!activeNoteId) return;

  const data = getEditorData();
  const note = notes.find(n => n.id === activeNoteId);
  if (!note) return;

  note.title = data.title;
  note.content = data.content;
  note.tags = data.tags;

  saveNotes(notes);
  render();
}

function deleteActiveNote() {
  if (!activeNoteId) return;

  notes = notes.filter(n => n.id !== activeNoteId);
  activeNoteId = null;

  saveNotes(notes);
  clearEditor();
  render();
}

// Search
function filterNotes(query) {
  if (!query) return notes;

  const q = query.toLowerCase();

  return notes.filter(note =>
    note.title.toLowerCase().includes(q) ||
    note.content.toLowerCase().includes(q) ||
    note.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

// Event bindings
UI.newNoteBtn.addEventListener("click", createNewNote);
UI.saveNoteBtn.addEventListener("click", saveActiveNote);
UI.deleteNoteBtn.addEventListener("click", deleteActiveNote);
UI.searchInput.addEventListener("input", render);

// Start app
init();

