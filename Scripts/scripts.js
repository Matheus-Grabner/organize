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
      <input type="text" value="${text}" class="task-title" placeholder="Título da Tarefa">
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
const city = 'Blumenau';

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
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar-widget');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Exibe apenas o modo "mês"
    locale: 'pt-br', // Configura o idioma para português
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    fixedWeekCount: false, // Evita que semanas extras sejam exibidas
    contentHeight: 'auto', // Ajusta a altura automaticamente
    events: [
      {
        title: 'Reunião',
        start: '2025-02-15'
      },
      {
        title: 'Entrega de Projeto',
        start: '2023-10-20'
      }
    ],
    dateClick: function (info) {
      // alert('Data clicada: ' + info.dateStr);
      // Adicione lógica para quando uma data é clicada
    }
  });

  calendar.render();
});

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar-widget');
  const eventDialog = document.getElementById('event-dialog');
  const eventTitleInput = document.getElementById('event-title');
  const saveEventButton = document.getElementById('save-event');
  const cancelEventButton = document.getElementById('cancel-event');

  let selectedDate = null;

  // Inicializar o calendário
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    fixedWeekCount: false,
    contentHeight: 'auto',
    dateClick: function (info) {
      selectedDate = info.dateStr; // Salvar a data clicada
      eventDialog.style.display = 'flex'; // Abrir a caixa de diálogo
    },
    events: [] // Inicialmente sem eventos
  });

  calendar.render();

  // Salvar a marcação
  saveEventButton.addEventListener('click', function () {
    const title = eventTitleInput.value.trim();

    if (title) {
      // Adicionar o evento ao calendário
      calendar.addEvent({
        title: title,
        start: selectedDate,
        allDay: true
      });

      // Fechar a caixa de diálogo e limpar o campo
      eventDialog.style.display = 'none';
      eventTitleInput.value = '';
    } else {
      alert('Por favor, insira um nome para a marcação.');
    }
  });

  // Cancelar e fechar a caixa de diálogo
  cancelEventButton.addEventListener('click', function () {
    eventDialog.style.display = 'none';
    eventTitleInput.value = '';
  });
});