// Initialize Feather Icons
feather.replace();

// Task Management Logic
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskTemplate = document.getElementById('task-template');
    const taskCounter = document.getElementById('task-counter');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Update task counter
    function updateTaskCounter() {
        const totalTasks = tasks.length;
        const incompleteTasks = tasks.filter(task => !task.completed).length;
        
        if (totalTasks === 0) {
            taskCounter.textContent = 'Tugas mu kosong king';
        } else if (incompleteTasks === 0) {
            taskCounter.textContent = 'Tugas mu sudah selesai king 🔥';
        } else {
            taskCounter.textContent = `Kamu punya ${incompleteTasks} tugas yang belum selesai king 🥀`;
        }
    }

    // Initial counter update
    updateTaskCounter();
    
    // Render tasks
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="text-center py-10 text-gray-400">
                    <i data-feather="inbox" class="mx-auto h-12 w-12"></i>
                    <h3 class="mt-2 text-sm font-medium text-gray-500">No tasks found</h3>
                    <p class="mt-1 text-sm text-gray-400">${filter === 'all' ? 'Add your first task to get started' : 'No matching tasks'}</p>
                </div>
            `;
            feather.replace();
            return;
        }
        
        filteredTasks.forEach((task, index) => {
            const taskElement = taskTemplate.content.cloneNode(true);
            
            // Set task data
            taskElement.querySelector('.task-title').textContent = task.title;
            taskElement.querySelector('.task-description').textContent = task.description || 'No description';
            
            // Format and set deadline
            const deadlineDate = new Date(task.deadline);
            const deadlineText = task.deadline ? 
                deadlineDate.toLocaleDateString() + ' ' + deadlineDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                'No deadline';
            taskElement.querySelector('.task-deadline span').textContent = deadlineText;
            
            // Set priority
            const priorityElement = taskElement.querySelector('.task-priority');
            const priorityText = taskElement.querySelector('.task-priority span');
            priorityText.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
            
            if (task.priority === 'chaos') {
                priorityElement.classList.add('bg-violet-100', 'text-violet-800');
            } else if (task.priority === 'high') {
                priorityElement.classList.add('bg-red-100', 'text-red-800');
            } else if (task.priority === 'medium') {
                priorityElement.classList.add('bg-yellow-100', 'text-yellow-800');
            } else {
                priorityElement.classList.add('bg-green-100', 'text-green-800');
            }
            
            // Set completed state
            if (task.completed) {
                const completeBtn = taskElement.querySelector('.task-complete');
                completeBtn.classList.add('bg-primary-100', 'border-primary-300');
                completeBtn.querySelector('i').classList.remove('text-transparent');
                completeBtn.querySelector('i').classList.add('text-primary-600');
                taskElement.querySelector('.task-item').classList.add('bg-gray-50');
                taskElement.querySelector('.task-title').classList.add('line-through', 'text-gray-400');
            }
            
            // Add event listeners
            taskElement.querySelector('.task-complete').addEventListener('click', () => toggleTaskComplete(index));
            taskElement.querySelector('.task-delete').addEventListener('click', () => deleteTask(index));
            
            taskList.appendChild(taskElement);
        });
        
        feather.replace();
    }
    
    // Add new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const deadline = document.getElementById('task-deadline').value;
        const priority = document.getElementById('task-priority').value;
        
        const newTask = {
            title,
            description,
            deadline,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks();
        updateTaskCounter();
        taskForm.reset();
    });
    
    // Toggle task completion
    function toggleTaskComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(document.querySelector('#filter-all.active') ? 'all' : 
                   document.querySelector('#filter-active.active') ? 'active' : 'completed');
        updateTaskCounter();
    }
    
    // Delete task
    function deleteTask(index) {
        const taskElement = document.querySelectorAll('.task-item')[index];
        taskElement.classList.add('opacity-0', 'scale-95');
        
        setTimeout(() => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(document.querySelector('#filter-all.active') ? 'all' : 
                       document.querySelector('#filter-active.active') ? 'active' : 'completed');
            updateTaskCounter();
        }, 200);
    }

    // Update task counter
    function updateTaskCounter() {
        const counter = document.getElementById('task-counter');
        const incompleteCount = tasks.filter(task => !task.completed).length;

        if (incompleteCount === 0) {
            counter.textContent = 'Tugas mu sudah selesai king 🔥';
        } else {
            counter.textContent = `Kamu punya ${incompleteCount} tugas yang belum selesai king 🥀`;
        }
    }

    // Filter tasks
    document.getElementById('filter-all').addEventListener('click', function() {
        document.getElementById('filter-all').classList.add('bg-primary-100', 'text-primary-700');
        document.getElementById('filter-active').classList.remove('bg-primary-100', 'text-primary-700');
        document.getElementById('filter-completed').classList.remove('bg-primary-100', 'text-primary-700');
        this.classList.add('active');
        document.getElementById('filter-active').classList.remove('active');
        document.getElementById('filter-completed').classList.remove('active');
        renderTasks('all');
    });
    
    document.getElementById('filter-active').addEventListener('click', function() {
        document.getElementById('filter-active').classList.add('bg-primary-100', 'text-primary-700');
        document.getElementById('filter-all').classList.remove('bg-primary-100', 'text-primary-700');
        document.getElementById('filter-completed').classList.remove('bg-primary-100', 'text-primary-700');
        this.classList.add('active');
        document.getElementById('filter-all').classList.remove('active');
        document.getElementById('filter-completed').classList.remove('active');
        renderTasks('active');
    });
    
    document.getElementById('filter-completed').addEventListener('click', function() {
        document.getElementById('filter-completed').classList.add('bg-primary-100', 'text-primary-700');
        document.getElementById('filter-all').classList.remove('bg-primary-100', 'text-primary-700');
        document.getElementById('filter-active').classList.remove('bg-primary-100', 'text-primary-700');
        this.classList.add('active');
        document.getElementById('filter-all').classList.remove('active');
        document.getElementById('filter-active').classList.remove('active');
        renderTasks('completed');
    });
    
    // Set initial filter
    document.getElementById('filter-all').classList.add('bg-primary-100', 'text-primary-700', 'active');
    renderTasks();
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('bg-gray-900');
        document.body.classList.toggle('text-white');
        
        const icon = document.querySelector('#theme-toggle i');
        if (document.body.classList.contains('bg-gray-900')) {
            icon.setAttribute('data-feather', 'sun');
        } else {
            icon.setAttribute('data-feather', 'moon');
        }
        feather.replace();
    });
});