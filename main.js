const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const inputField = document.querySelector(".standard-input");
const checkButtons = document.querySelectorAll(".check-btn");
const deleteButtons = document.querySelectorAll(".delete-btn");
const themeSelectors = document.querySelectorAll(".theme-selector");
const themes = ["standard-theme", "light-theme", "darker-theme"];
const container = document.querySelector(".container");
const todoInput = document.querySelectorAll(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoItems = document.querySelectorAll(".todo");


document.addEventListener("DOMContentLoaded", loadTodos);

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = inputField.value.trim();

    if (todoText !== "") {
        const todoItem = createTodoElement(todoText);
        todoList.appendChild(todoItem);
        saveTodoToLocal(todoText);
        inputField.value = "";
    } else {
        alert("Please enter a task.");
    }
});

function createTodoElement(text) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");

    // Xác định theme hiện tại
    let currentTheme = "standard"; // mặc định
    if (container.classList.contains("light")) {
        currentTheme = "light";
    } else if (container.classList.contains("darker")) {
        currentTheme = "darker";
    }

    // Thêm class theo theme
    todoItem.classList.add(`${currentTheme}-todo`);

    todoItem.innerHTML = `
                            <li class="todo-item">${text}</li>
                            <button class="check-btn ${currentTheme}-button">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="delete-btn ${currentTheme}-button">
                                <i class="fas fa-trash"></i>
                            </button>
                        `;
    return todoItem;
}


function saveTodoToLocal(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(function (todoText) {
        const todoItem = createTodoElement(todoText);
        todoList.appendChild(todoItem);
    });
    updateDeleteAllVisibility()
}

todoList.addEventListener("click", function (event) {
    const target = event.target;
    const todoItem = target.closest(".todo");
    if (!todoItem) return;

    if (target.classList.contains("fa-trash") || target.classList.contains("delete-btn")) {
        const todoText = todoItem.querySelector(".todo-item").textContent;

        // Thêm hiệu ứng rơi
        todoItem.classList.add("fall");

        setTimeout(() => {
            todoItem.remove();
            removeTodoFromLocal(todoText);
        }, 500);
    }

    if (target.classList.contains("fa-check") || target.classList.contains("check-btn")) {
        todoItem.classList.toggle("completed");
    }
    updateDeleteAllVisibility()
});

function removeTodoFromLocal(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter((todo) => todo !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

themeSelectors.forEach((selector) => {
    selector.addEventListener("click", () => {

        // Xóa class cũ
        container.classList.remove("standard", "light", "darker");
        todoBtn.classList.remove("standard-button", "light-button", "darker-button");

        todoInput.forEach((input) => {
            input.classList.remove("standard-input", "light-input", "darker-input");
        });

        // Lấy lại các button và todo mới nhất
        const checkButtons = document.querySelectorAll(".check-btn");
        const deleteButtons = document.querySelectorAll(".delete-btn");
        const todoItems = document.querySelectorAll(".todo");

        checkButtons.forEach((btn) => {
            btn.classList.remove("standard-button", "light-button", "darker-button");
        });

        deleteButtons.forEach((btn) => {
            btn.classList.remove("standard-button", "light-button", "darker-button");
        });

        todoItems.forEach((item) => {
            item.classList.remove("standard-todo", "light-todo", "darker-todo");
        });

        if (selector.classList.contains("standard-theme")) {
            container.classList.add("standard");
            todoBtn.classList.add("standard-button");
            todoInput.forEach((input) => input.classList.add("standard-input"));
            checkButtons.forEach((btn) => btn.classList.add("standard-button"));
            deleteButtons.forEach((btn) => btn.classList.add("standard-button"));
            todoItems.forEach((item) => item.classList.add("standard-todo"));

        } else if (selector.classList.contains("light-theme")) {
            container.classList.add("light");
            todoBtn.classList.add("light-button");
            todoInput.forEach((input) => input.classList.add("light-input"));
            checkButtons.forEach((btn) => btn.classList.add("light-button"));
            deleteButtons.forEach((btn) => btn.classList.add("light-button"));
            todoItems.forEach((item) => item.classList.add("light-todo"));

        } else if (selector.classList.contains("darker-theme")) {
            container.classList.add("darker");
            todoBtn.classList.add("darker-button");
            todoInput.forEach((input) => input.classList.add("darker-input"));
            checkButtons.forEach((btn) => btn.classList.add("darker-button"));
            deleteButtons.forEach((btn) => btn.classList.add("darker-button"));
            todoItems.forEach((item) => item.classList.add("darker-todo"));
        }
    });
});
document.getElementById("delete-all").addEventListener("click", () => {
    const completedTodos = document.querySelectorAll(".todo.completed");
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    completedTodos.forEach((todoItem) => {
        const todoText = todoItem.querySelector(".todo-item").textContent;

        todoItem.classList.add("fall");

        setTimeout(() => {
            todoItem.remove();
            todos = todos.filter((todo) => todo !== todoText);
            localStorage.setItem("todos", JSON.stringify(todos));
            updateDeleteAllVisibility();
        }, 500);
    });

});

function updateDeleteAllVisibility() {
    const wrapper = document.getElementById("delete-all-wrapper");
    const completedTasks = document.querySelectorAll(".todo.completed");
    wrapper.style.display = completedTasks.length > 1 ? "inline-block" : "none";
}


