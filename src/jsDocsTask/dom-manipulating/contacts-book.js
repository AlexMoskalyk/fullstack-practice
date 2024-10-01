const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const contactsList = document.getElementById('contactsList');
const searchInput = document.getElementById('searchInput');
const addContactBtn = document.getElementById('addContactBtn');
const editContactBtn = document.getElementById('editContactBtn');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let currentContactIndex = null; 

renderContacts(contacts);

// Function to render contacts
function renderContacts(contactArray) {
    contactsList.innerHTML = ''; 
    contactArray.forEach((contact, index) => {
        const li = document.createElement('li');
        li.textContent = `${contact.name} - ${contact.phone}`;
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editContact(index));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteContact(index));

        li.append(editBtn);
        li.append(deleteBtn);
        contactsList.append(li);
    });
}

// Function to handle form submission for both Add and Edit
function handleFormSubmit() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    
    if (currentContactIndex === null) {
        // Add new contact
        contacts.push({ name, phone });
    } else {
        // Save edited contact
        contacts[currentContactIndex] = { name, phone };
        currentContactIndex = null;
        editContactBtn.classList.add('hidden');
        addContactBtn.classList.remove('hidden');
    }

    localStorage.setItem('contacts', JSON.stringify(contacts)); 
    nameInput.value = '';
    phoneInput.value = '';
    renderContacts(contacts); 
}

// Event listener for adding a new contact
addContactBtn.addEventListener('click',  ev =>{
    ev.preventDefault();
    handleFormSubmit();
});

// Event listener for saving changes to an existing contact
editContactBtn.addEventListener('click',  ev =>{
    ev.preventDefault();
    handleFormSubmit();
});

// Function to edit a contact
function editContact(index) {
    currentContactIndex = index;
    nameInput.value = contacts[index].name;
    phoneInput.value = contacts[index].phone;
    
    editContactBtn.classList.remove('hidden');
    addContactBtn.classList.add('hidden');
}

// Function to delete a contact
function deleteContact(index) {
    contacts.splice(index, 1); 
    localStorage.setItem('contacts', JSON.stringify(contacts)); 
    renderContacts(contacts); 
}

// Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
               contact.phone.includes(searchTerm);
    });
    renderContacts(filteredContacts);
});
