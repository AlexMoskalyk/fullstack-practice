if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker registered with scope:');
        }).catch(err => {
            console.error(`Service Worker registration failed:${err}`, );
        });
    });
}


// DOM Elements
const statusDisplay = document.getElementById('status');
const fetchDataBtn = document.getElementById('fetchDataBtn');
const dataList = document.getElementById('dataList');

// Track online/offline status
window.addEventListener('online', () => {
    statusDisplay.textContent = 'You are online.';
    statusDisplay.style.backgroundColor = 'lightgreen';
});

window.addEventListener('offline', () => {
    statusDisplay.textContent = 'You are offline.';
    statusDisplay.style.backgroundColor = 'lightcoral';
});

// Fetch data from placeholder API
fetchDataBtn.addEventListener('click', fetchData);

function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched from API:', data);
            displayData(data);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            dataList.innerHTML = '<li>Failed to fetch data. You might be offline.</li>';
        });
}

// Display fetched data in the list
function displayData(data) {
    dataList.innerHTML = ''; // Clear previous data
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title}`;
        dataList.appendChild(listItem);
    });
}