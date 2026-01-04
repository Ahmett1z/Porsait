// storage.js
// Module: Notların kaydedilmesi ve yüklenmesi

export function loadNotes() {
  const data = localStorage.getItem("porsait_notes");
  return data ? JSON.parse(data) : [];
}

export function saveNotes(notes) {
  localStorage.setItem("porsait_notes", JSON.stringify(notes));
}
