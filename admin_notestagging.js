function signOut() {
  alert("Signing out...");
  window.location.href = "login.html";
}

let notes = [];

function addNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();
  const tag = document.getElementById("noteTag").value.trim();

  if (!title || !content || !tag) {
    alert("Please fill in all fields.");
    return;
  }

  const note = { title, content, tag };
  notes.push(note);

  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  document.getElementById("noteTag").value = "";

  renderNotes();
}

function renderNotes(filteredNotes = notes) {
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  if (filteredNotes.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No notes found.</p>";
    return;
  }

  filteredNotes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.className = "bg-white p-4 rounded shadow border";

    noteCard.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold text-lg">${note.title}</h3>
        <span class="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">${note.tag}</span>
      </div>
      <p class="text-sm text-gray-700">${note.content}</p>
    `;

    container.appendChild(noteCard);
  });
}

function filterNotes() {
  const filter = document.getElementById("filterTag").value.trim().toLowerCase();
  const filtered = notes.filter(note => note.tag.toLowerCase().includes(filter));
  renderNotes(filtered);
}
