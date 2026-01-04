console.log("storage.js çalıştı");

function loadNotes() {
  const data = localStorage.getItem("porsait_notes");
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes) {
  localStorage.setItem("porsait_notes", JSON.stringify(notes));
}
