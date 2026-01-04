// ui.js
// Arayüz ile ilgili her şey burada

const UI = {
  newNoteBtn: document.getElementById("newNoteBtn"),
  saveNoteBtn: document.getElementById("saveNoteBtn"),
  deleteNoteBtn: document.getElementById("deleteNoteBtn"),
  searchInput: document.getElementById("searchInput"),

  noteTitle: document.getElementById("noteTitle"),
  noteContent: document.getElementById("noteContent"),
  noteTags: document.getElementById("noteTags"),
  noteList: document.getElementById("noteList")
};

// Listeyi çiz
function renderNoteList(notes, onSelect) {
  UI.noteList.innerHTML = "";

  if (notes.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No notes";
    UI.noteList.appendChild(li);
    return;
  }

  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note.title || "Untitled note";
    li.addEventListener("click", () => onSelect(note.id));
    UI.noteList.appendChild(li);
  });
}

// Editörü doldur
function fillEditor(note) {
  UI.noteTitle.value = note.title || "";
  UI.noteContent.value = note.content || "";
  UI.noteTags.value = note.tags ? note.tags.join(", ") : "";
}

// Editörden veri al
function getEditorData() {
  return {
    title: UI.noteTitle.value.trim(),
    content: UI.noteContent.value.trim(),
    tags: UI.noteTags.value
      .split(",")
      .map(t => t.trim())
      .filter(Boolean)
  };
}

// Editörü temizle
function clearEditor() {
  UI.noteTitle.value = "";
  UI.noteContent.value = "";
  UI.noteTags.value = "";
}
