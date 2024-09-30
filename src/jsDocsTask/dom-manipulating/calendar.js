const calendarContainer = document.getElementById('calendar');
const selectedDateDisplay = document.getElementById('selectedDate');
const eventList = document.getElementById('events');
const addEventForm = document.getElementById('addEventForm');
const eventTitleInput = document.getElementById('eventTitle');

let selectedDate = null;
const eventsData = JSON.parse(localStorage.getItem('calendarEvents')) || {};

// Function to generate the calendar (for simplicity, let's create a 30-day month)
function generateCalendar() {
    for (let day = 1; day <= 30; day+=1) {
        const dateCell = document.createElement('div');
        dateCell.textContent = day;

       
        dateCell.addEventListener('click', () =>{
            selectDate(day);
        });

        calendarContainer.appendChild(dateCell);
    }
}

// Function to handle date selection
function selectDate(day) {
    selectedDate = day;
    selectedDateDisplay.textContent = day;

   
    document.querySelectorAll('.calendar-container div').forEach(cell => {
        cell.classList.remove('selected');
    });
    calendarContainer.children[day - 1].classList.add('selected');

    
    displayEvents();
}

// Function to display events for the selected date
function displayEvents() {
    eventList.innerHTML = ''; // Clear existing events
    const events = eventsData[selectedDate] || [];

    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = event;

        // Delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'x';
        deleteBtn.className = 'delete-event';
        deleteBtn.addEventListener('click', function() {
            deleteEvent(index);
        });

        li.appendChild(deleteBtn);
        eventList.appendChild(li);
    });
}

// Function to add a new event
addEventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!selectedDate) {
        alert('Please select a date first.');
        return;
    }

    const eventTitle = eventTitleInput.value;
    if (!eventsData[selectedDate]) {
        eventsData[selectedDate] = [];
    }

    eventsData[selectedDate].push(eventTitle);
    localStorage.setItem('calendarEvents', JSON.stringify(eventsData));

    eventTitleInput.value = ''; 
    displayEvents(); 
});

// Function to delete an event
function deleteEvent(index) {
    eventsData[selectedDate].splice(index, 1);
    if (eventsData[selectedDate].length === 0) {
        delete eventsData[selectedDate]; 
    }
    localStorage.setItem('calendarEvents', JSON.stringify(eventsData));
    displayEvents();
}

generateCalendar();
