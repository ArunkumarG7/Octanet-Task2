document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Function to create a new task item
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="edit">Edit</button>
            <button class="remove">Remove</button>
        `;

        // Checkbox event listener
        li.querySelector('input').addEventListener('change', (e) => {
            const completed = e.target.checked;
            li.classList.toggle('completed', completed);
            task.completed = completed;
        });

        // Edit button event listener
        li.querySelector('.edit').addEventListener('click', () => {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null) {
                task.text = newText;
                li.querySelector('span').textContent = newText;
            }
        });

        // Remove button event listener
        li.querySelector('.remove').addEventListener('click', () => {
            taskList.removeChild(li);
        });

        return li;
    };

    // Add Task button event listener
    addTaskButton.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text !== '') {
            const task = {
                id: Date.now(),
                text: text,
                completed: false
            };
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
            taskInput.value = '';
        }
    });
});
