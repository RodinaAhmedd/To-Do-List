let addBtn = document.getElementById("addBtn");
let textbox = document.querySelector(".textbox");
let notes = document.getElementById("notes");


window.onload = function () {
  let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(note => {
    createNote(note.text, note.completed);
  });
};

function saveNotes() {
  let notesArr = [];
  document.querySelectorAll("#notes li").forEach(li => {
    notesArr.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("notes", JSON.stringify(notesArr));
}

addBtn.addEventListener("click", function () {
  if (textbox.value.trim() === "") return;

  createNote(textbox.value, false);
  textbox.value = "";
  saveNotes();
});

function createNote(textValue, isCompleted) {
  let li = document.createElement("li");

  let completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";

  let text = document.createElement("span");
  text.textContent = textValue;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";

  if (isCompleted) {
    li.classList.add("completed");
  }

  completeBtn.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveNotes();
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveNotes();
  });

  li.append(completeBtn, text, deleteBtn);
  notes.appendChild(li);
}
