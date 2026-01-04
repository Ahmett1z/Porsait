// ui.js
// Module: Arayüz ile ilgili her şey

export const UI = {
  noteList: document.getElementById("noteList"),
  searchInput: document.getElementById("searchInput"),
  noteTitle: document.getElementById("noteTitle"),
  noteContent: document.getElementById("noteContent"),
  noteTags: document.getElementById("noteTags"),
  newNoteBtn: document.getElementById("newNoteBtn"),
  saveNoteBtn: document.getElementById("saveNoteBtn"),
  deleteNoteBtn: document.getElementById("deleteNoteBtn"),
  exportBtn: document.getElementById("exportBtn"),
  importBtn: document.getElementById("importBtn"),
  importInput: document.getElementById("importInput")
};

export function clearEditor() {
  UI.noteTitle.value = "";
  UI.noteContent.value = "";
  UI.noteTags.value = "";
}

export function renderNoteList(notes, activeId, onSelect) {
  UI.noteList.innerHTML = "";

  if (notes.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No notes";
    UI.noteList.appendChild(li);
    return;
  }

  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note.title || "Untitled";
    if (note.id === activeId) li.classList.add("active");
    li.addEventListener("click", () => onSelect(note.id));
    UI.noteList.appendChild(li);
  });
}

export function fillEditor(note) {
  UI.noteTitle.value = note.title;
  UI.noteContent.value = note.content;
  UI.noteTags.value = note.tags.join(", ");
}

export function getEditorData() {
  return {
    title: UI.noteTitle.value.trim(),
    content: UI.noteContent.value.trim(),
    tags: UI.noteTags.value.split(",").map(t => t.trim()).filter(Boolean)
  };
}
