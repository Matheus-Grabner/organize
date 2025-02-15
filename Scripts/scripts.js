// To-Do List
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');

// Inicializar SortableJS para as colunas
Sortable.create(todoList, {
  group: 'tasks',
  animation: 150,
});

Sortable.create(document.getElementById('doing-list'), {
  group: 'tasks',
  animation: 150,
});

Sortable.create(document.getElementById('done-list'), {
  group: 'tasks',
  animation: 150,
});

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    addTask(taskText, todoList);
    taskInput.value = '';
  }
});

function addTask(text, list) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <div class="task-header">
      <input type="text" value="${text}" class="task-title">
      <button onclick="removeTask(this)">Remover</button>
    </div>
    <textarea class="task-notes" placeholder="Adicionar anotações..."></textarea>
  `;
  list.appendChild(li);
}

function removeTask(button) {
  const li = button.closest('.task-item');
  li.remove();
}

// Weather Widget
const weatherWidget = document.getElementById('weather-widget');
const apiKey = 'acd8f94e1d12e611d684ecc6e1859dc8'; // Obtenha uma chave em https://openweathermap.org
const city = 'China';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`)
  .then(response => response.json())
  .then(data => {
    let weather = data.weather[0].description;
    const weatherFormated = weather.charAt(0).toUpperCase() + weather.slice(1);
    const temp = data.main.temp;
    weatherWidget.innerHTML = `
      <p>Cidade: ${city}</p>
      <p>Temperatura: ${temp}°C</p>
      <p>Condição: ${weatherFormated}</p>
    `;
  })
  .catch(() => {
    weatherWidget.innerHTML = '<p>Erro ao carregar dados do tempo.</p>';
  });

// Calendário Simples
const calendarWidget = document.getElementById('calendar-widget');
const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
calendarWidget.innerHTML = `<p>Hoje é ${date.toLocaleDateString('pt-BR', options)}</p>`;