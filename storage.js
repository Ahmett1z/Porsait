// storage.js
// Notları tarayıcıya kaydeder ve geri yükler

function loadNotes() {
  const data = localStorage.getItem("porsait_notes");
  return data ? JSON.parse(data) : [];
}

function saveNotes(notes) {
  localStorage.setItem("porsait_notes", JSON.stringify(notes));
}
