// Реєстрація Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../jsDocsTask/sw.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(err => {
            console.error('Service Worker registration failed:', err);
        });
    });
}


// Елементи DOM
const statusDisplay = document.getElementById('status');
const fetchDataBtn = document.getElementById('fetchDataBtn');
const dataDisplay = document.getElementById('dataDisplay');

// Відслідковування статусу онлайн/офлайн
window.addEventListener('online', () => {
    statusDisplay.textContent = 'Ви онлайн.';
    statusDisplay.style.backgroundColor = 'lightgreen';
    synchronizeData();
});

window.addEventListener('offline', () => {
    statusDisplay.textContent = 'Ви офлайн.';
    statusDisplay.style.backgroundColor = 'lightcoral';
    displayOfflineData();  // Показати дані з LocalStorage
});

// Функція для Fetch запиту та збереження даних у LocalStorage
fetchDataBtn.addEventListener('click', fetchData);

function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => {
            console.log('Дані отримані з API:', data);
            displayData(data);

            // Зберігання даних у LocalStorage
            localStorage.setItem('fetchedData', JSON.stringify(data));
        })
        .catch(err => {
            console.error('Помилка отримання даних:', err);
            dataDisplay.textContent = 'Не вдалося отримати дані. Можливо, ви офлайн.';
        });
}

// Показ даних на сторінці
function displayData(data) {
    dataDisplay.innerHTML = `<p><strong>Заголовок:</strong> ${data.title}</p>
                             <p><strong>Тіло:</strong> ${data.body}</p>`;
}

// Відображення даних із LocalStorage, коли офлайн
function displayOfflineData() {
    const savedData = JSON.parse(localStorage.getItem('fetchedData'));
    if (savedData) {
        displayData(savedData);  // Показати останні отримані дані
    } else {
        dataDisplay.innerHTML = '<p>Немає кешованих даних.</p>';
    }
}

// Функція синхронізації офлайн даних при поверненні інтернету
function synchronizeData() {
    const unsyncedData = JSON.parse(localStorage.getItem('unsyncedData')) || [];

    if (unsyncedData.length > 0) {
        console.log('Синхронізація офлайн даних...');
        unsyncedData.forEach(data => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => {
                console.log('Дані синхронізовані:', result);
                unsyncedData.splice(unsyncedData.indexOf(data), 1);  // Видалити синхронізовані дані
                localStorage.setItem('unsyncedData', JSON.stringify(unsyncedData));
            })
            .catch(err => {
                console.log('Не вдалося синхронізувати дані:', err);
            });
        });
    } else {
        console.log('Немає офлайн даних для синхронізації.');
    }
}
