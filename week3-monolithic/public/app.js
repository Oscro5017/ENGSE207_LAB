let allTasks = [];
let currentFilter = 'ALL';

const addTaskForm = document.getElementById('addTaskForm');
const statusFilter = document.getElementById('statusFilter');
const loadingOverlay = document.getElementById('loadingOverlay');

const todoTasks = document.getElementById('todoTasks');
const progressTasks = document.getElementById('progressTasks');
const doneTasks = document.getElementById('doneTasks');

const todoCount = document.getElementById('todoCount');
const progressCount = document.getElementById('progressCount');
const doneCount = document.getElementById('doneCount');

async function fetchTasks() {
    showLoading();
    try {
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        allTasks = data.tasks;
        renderTasks();
    } catch (err) {
        console.error(err);
        alert("Error loading tasks");
    } finally {
        hideLoading();
    }
}

async function createTask(taskData) {
    showLoading();
    try {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        });

        if (!res.ok) throw new Error("Failed to create");

        const data = await res.json();
        allTasks.unshift(data.task);
        renderTasks();
        addTaskForm.reset();
        alert("Task created!");
    } catch (err) {
        console.error(err);
        alert("Failed to create task");
    } finally {
        hideLoading();
    }
}

async function updateTaskStatus(taskId, newStatus) {
    showLoading();
    try {
        const res = await fetch(`/api/tasks/${taskId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        if (!res.ok) throw new Error("Failed to update status");

        const data = await res.json();

        // update local state
        const index = allTasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            allTasks[index].status = newStatus;
        }

        renderTasks();
    } catch (err) {
        console.error(err);
        alert("Error updating status");
    } finally {
        hideLoading();
    }
}

async function deleteTask(taskId) {
    if (!confirm("Delete this task?")) return;

    showLoading();
    try {
        const res = await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error("Failed to delete");

        allTasks = allTasks.filter(t => t.id !== taskId);
        renderTasks();

        alert("Task deleted");
    } catch (err) {
        console.error(err);
        alert("Error deleting task");
    } finally {
        hideLoading();
    }
}

function renderTasks() {
    todoTasks.innerHTML = '';
    progressTasks.innerHTML = '';
    doneTasks.innerHTML = '';

    let filtered = allTasks;
    if (currentFilter !== 'ALL') {
        filtered = allTasks.filter(t => t.status === currentFilter);
    }

    const todo = filtered.filter(t => t.status === "TODO");
    const progress = filtered.filter(t => t.status === "IN_PROGRESS");
    const done = filtered.filter(t => t.status === "DONE");

    todoCount.textContent = todo.length;
    progressCount.textContent = progress.length;
    doneCount.textContent = done.length;

    renderTaskList(todo, todoTasks, 'TODO');
    renderTaskList(progress, progressTasks, 'IN_PROGRESS');
    renderTaskList(done, doneTasks, 'DONE');
}

function renderTaskList(tasks, container, currentStatus) {
    if (tasks.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No tasks yet</p></div>';
        return;
    }

    tasks.forEach(task => {
        const card = createTaskCard(task, currentStatus);
        container.appendChild(card);
    });
}

function createTaskCard(task, currentStatus) {
    const card = document.createElement('div');
    card.className = 'task-card';

    const priorityClass = `priority-${task.priority.toLowerCase()}`;

    card.innerHTML = `
        <div class="task-header">
            <div class="task-title">${escapeHtml(task.title)}</div>
            <span class="priority-badge ${priorityClass}">${task.priority}</span>
        </div>

        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}

        <div class="task-meta">Created: ${formatDate(task.created_at)}</div>

        <div class="task-actions">
            ${createStatusButtons(task.id, currentStatus)}
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">🗑️ Delete</button>
        </div>
    `;

    return card;
}

function createStatusButtons(taskId, currentStatus) {
    const btn = [];

    if (currentStatus !== "TODO") {
        btn.push(`<button class="btn btn-warning btn-sm"
            onclick="updateTaskStatus(${taskId}, 'TODO')">← To Do</button>`);
    }

    if (currentStatus !== "IN_PROGRESS") {
        btn.push(`<button class="btn btn-info btn-sm"
            onclick="updateTaskStatus(${taskId}, 'IN_PROGRESS')">→ In Progress</button>`);
    }

    if (currentStatus !== "DONE") {
        btn.push(`<button class="btn btn-success btn-sm"
            onclick="updateTaskStatus(${taskId}, 'DONE')">✔ Done</button>`);
    }

    return btn.join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(input) {
    const d = new Date(input);
    return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function showLoading() {
    loadingOverlay.style.display = "flex";
}

function hideLoading() {
    loadingOverlay.style.display = "none";
}

addTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title) return alert("Please enter a title");

    createTask({ title, description: desc, priority });
});

statusFilter.addEventListener('change', e => {
    currentFilter = e.target.value;
    renderTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("Task Board App Loaded");
    fetchTasks();
});

window.updateTaskStatus = updateTaskStatus;
window.deleteTask = deleteTask;