let state = {
    theme: 'light',
    language: 'en'
};

// Function to load state from LocalStorage
function loadState() {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
        state = JSON.parse(savedState);
        updateUI();
        updateDropdowns();
    }
}

// Function to save state to LocalStorage
function saveState() {
    try {
        localStorage.setItem('appState', JSON.stringify(state));
    } catch (e) {
        console.error("LocalStorage error: ", e);
    }
}

// Update the UI based on the current state
function updateUI() {
    document.getElementById('currentTheme').textContent = state.theme;
    document.getElementById('currentLanguage').textContent = state.language;

    // Apply theme to body
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${state.theme}-theme`);
}

// Listen for changes in LocalStorage from other tabs
window.addEventListener('storage', (event) => {
    console.log(event);
    
    if (event.key === 'appState') {
        state = JSON.parse(event.newValue);
        updateUI();
        updateDropdowns();
    }
});

// Update dropdowns to reflect the current state values
function updateDropdowns() {
    document.getElementById('themeSelect').value = state.theme;
    document.getElementById('languageSelect').value = state.language;
}

// Event listeners for dropdowns
document.getElementById('themeSelect').addEventListener('change', (e) => {
    state.theme = e.target.value;
    saveState();
    updateUI();
});

document.getElementById('languageSelect').addEventListener('change', (e) => {
    state.language = e.target.value;
    saveState();
    updateUI();
});

// Initialize the state and UI when the page loads
window.addEventListener('load', () => {
    loadState();
    updateUI();
    updateDropdowns();
});







