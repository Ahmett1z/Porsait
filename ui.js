const UI = {
  noteList: document.getElementById("noteList"),
  searchInput: document.getElementById("searchInput"),
  noteTitle: document.getElementById("noteTitle"),
  noteContent: document.getElementById("noteContent"),
  noteTags: document.getElementById("noteTags"),
  newNoteBtn: document.getElementById("newNoteBtn"),
  saveNoteBtn: document.getElementById("saveNoteBtn"),
  deleteNoteBtn: document.getElementById("deleteNoteBtn")
};

function clearEditor() {
  UI.noteTitle.value = "";
  UI.noteContent.value = "";
  UI.noteTags.value = "";
}

function renderNoteList(notes, onSelect) {
  UI.noteList.innerHTML = "";

  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note.title || "Untitled";
    li.addEventListener("click", () => onSelect(note.id));
    UI.noteList.appendChild(li);
  });
}

function fillEditor(note) {
  UI.noteTitle.value = note.title;
  UI.noteContent.value = note.content;
  UI.noteTags.value = note.tags.join(", ");
}

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
