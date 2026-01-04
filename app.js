// app.js
import { loadNotes, saveNotes } from "./storage.js";
import { UI, clearEditor, renderNoteList, fillEditor, getEditorData } from "./ui.js";

let notes = [];
let activeNoteId = null;

// Utils
function generateId() {
  return Date.now().toString();
}

// Load notes on start
function init() {
  notes = loadNotes();
  render();
}

// Render
function render() {
  const query = UI.searchInput.value;
  const filtered = filterNotes(query);
  renderNoteList(filtered, activeNoteId, selectNote);
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
  saveNotes(notes);
  render();
  fillEditor(newNote);
}

function selectNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;
  activeNoteId = id;
  fillEditor(note);
  render();
}

function saveActiveNote() {
  if (!activeNoteId) return;
  const data = getEditorData();
  const note = notes.find(n => n.id === activeNoteId);
  if (!note) return;
  note.title = data.title;
  note.content = data.content;
  note.tags = data.tags;
  note.updated = Date.now();
  saveNotes(notes);
  render();
}

function deleteActiveNote() {
  if (!activeNoteId) return;
  if (!confirm("Are you sure you want to delete this note?")) return;
  notes = notes.filter(n => n.id !== activeNoteId);
  activeNoteId = null;
  saveNotes(notes);
  clearEditor();
  render();
}

// Search filter
function filterNotes(query) {
  if (!query) return notes;
  const q = query.toLowerCase();
  return notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q) ||
    n.tags.some(t => t.toLowerCase().includes(q))
  );
}

// Export / Import
function exportNotes() {
  const dataStr = JSON.stringify(notes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "porsait_notes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importNotes(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");
      notes = imported;
      saveNotes(notes);
      activeNoteId = null;
      clearEditor();
      render();
    } catch {
      alert("Failed to import notes");
    }
  };
  reader.readAsText(file);
}

// Keyboard shortcuts
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveActiveNote();
  }
  if (e.ctrlKey && e.key === "n") {
    e.preventDefault();
    createNewNote();
  }
  if (e.ctrlKey && e.key === "f") {
    e.preventDefault();
    UI.searchInput.focus();
  }
});

// Event bindings
UI.newNoteBtn.addEventListener("click", createNewNote);
UI.saveNoteBtn.addEventListener("click", saveActiveNote);
UI.deleteNoteBtn.addEventListener("click", deleteActiveNote);
UI.searchInput.addEventListener("input", render);
UI.exportBtn.addEventListener("click", exportNotes);
UI.importBtn.addEventListener("click", () => UI.importInput.click());
UI.importInput.addEventListener("change", importNotes);

// Start app
init();
