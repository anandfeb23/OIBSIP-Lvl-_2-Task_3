const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");
const addTaskButton = document.getElementById("add_task_button");

function addTask() {
  if (inputBox.value === "") {
    alert("You must have to add a task");
  } else {
    let listItem = document.createElement("li");
    listItem.textContent = inputBox.value;

    let deleteIcon = document.createElement("icon");
    deleteIcon.classList.add("ri-delete-bin-line");
    or = "pointer";

    deleteIcon.addEventListener("click", function () {
      listContainer.removeChild(listItem);
      saveTasks();
    });

    listItem.appendChild(deleteIcon);
    listContainer.appendChild(listItem);
    inputBox.value = "";

    saveTasks();
  }
}

addTaskButton.addEventListener("click", addTask);

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveTasks();
    }
  },
  false
);

function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";

  let deleteIcons = listContainer.querySelectorAll("icon");
  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      icon.parentElement.remove();
      saveTasks();
    });
  });
}

showTasks();
