
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskForm = document.getElementById('addTaskForm');
const showAllBtn = document.getElementById('showAll');
const showCompletedBtn = document.getElementById('showCompleted');
const showIncompleteBtn = document.getElementById('showIncomplete');

// Task data (stored in LocalStorage)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


renderTasks(tasks);

// Function to render tasks
function renderTasks(taskArray) {
    taskList.innerHTML = ''; 
    taskArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.title;
        
        if (task.completed) {
            li.classList.add('completed');
        }

        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => toggleComplete(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to add a new task
addTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle) {
        tasks.push({ title: taskTitle, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
        taskInput.value = '';
        renderTasks(tasks); 
    }
});

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    renderTasks(tasks);
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    renderTasks(tasks); 
}

// Filter tasks by status
showAllBtn.addEventListener('click', () => renderTasks(tasks));
showCompletedBtn.addEventListener('click', () => {
    const completedTasks = tasks.filter(task => task.completed);
    renderTasks(completedTasks);
});
showIncompleteBtn.addEventListener('click', () => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    renderTasks(incompleteTasks);
});
